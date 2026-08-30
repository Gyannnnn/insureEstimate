import type { CollectionEntry } from 'astro:content';
import { getRentersStandardPremium } from './calculators/standardProfile';

export type StateEntry = CollectionEntry<'states'>;

export interface StateCardItem {
  name: string;
  slug: string;
  abbreviation: string;
  region: string;
  baseRate: number;
  annualCost: number;
  monthlyCost: number;
  href: string;
  image?: string;
}

// Explicit immediate neighbor mapping for key states to maximize spatial relevance
const NEIGHBOR_MAP: Record<string, string[]> = {
  massachusetts: ['connecticut', 'rhode-island', 'new-hampshire', 'vermont', 'maine', 'new-york'],
  california: ['oregon', 'nevada', 'arizona', 'washington', 'hawaii'],
  texas: ['oklahoma', 'louisiana', 'new-mexico', 'arkansas', 'colorado'],
  florida: ['georgia', 'alabama', 'south-carolina', 'north-carolina', 'tennessee'],
  'new-york': ['new-jersey', 'pennsylvania', 'connecticut', 'massachusetts', 'vermont'],
  illinois: ['indiana', 'wisconsin', 'iowa', 'missouri', 'kentucky', 'michigan'],
  pennsylvania: ['new-york', 'new-jersey', 'delaware', 'maryland', 'west-virginia', 'ohio'],
  georgia: ['florida', 'alabama', 'tennessee', 'north-carolina', 'south-carolina'],
  ohio: ['pennsylvania', 'west-virginia', 'kentucky', 'indiana', 'michigan'],
  'north-carolina': ['south-carolina', 'virginia', 'tennessee', 'georgia'],
  michigan: ['ohio', 'indiana', 'wisconsin', 'illinois'],
  virginia: ['maryland', 'west-virginia', 'north-carolina', 'kentucky', 'tennessee'],
  washington: ['oregon', 'idaho', 'california', 'montana'],
  arizona: ['california', 'nevada', 'utah', 'colorado', 'new-mexico'],
  colorado: ['wyoming', 'nebraska', 'kansas', 'oklahoma', 'new-mexico', 'utah'],
  tennessee: ['kentucky', 'virginia', 'north-carolina', 'georgia', 'alabama', 'mississippi', 'arkansas', 'missouri']
};

// Popular benchmark states searched frequently nationwide
const POPULAR_SLUGS = ['california', 'texas', 'florida', 'new-york', 'illinois', 'georgia', 'massachusetts', 'pennsylvania'];

/**
 * Deterministic seed from string to avoid layout shifts / hydration randomness
 */
function getDeterministicSeed(slug: string): number {
  return slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function formatStateItem(entry: StateData): StateCardItem {
  const std = getRentersStandardPremium(entry.data.baseRate);
  return {
    name: entry.data.name,
    slug: entry.data.slug,
    abbreviation: entry.data.abbreviation,
    region: entry.data.region,
    baseRate: entry.data.baseRate,
    annualCost: std.annual,
    monthlyCost: std.monthly,
    href: `/renters-insurance-calculator/${entry.data.slug}/`,
    image: entry.data.image
  };
}

export type StateData = StateEntry;

export function getRelatedStatesForPage(currentState: StateData, allStates: StateData[]) {
  const currentSlug = currentState.data.slug;
  const currentRegion = currentState.data.region;
  const currentBaseRate = currentState.data.baseRate;
  const seed = getDeterministicSeed(currentSlug);

  const otherStates = allStates.filter(s => s.data.slug !== currentSlug);

  // 1. Regional & Neighboring States
  const neighborSlugs = NEIGHBOR_MAP[currentSlug] || [];
  const neighborStates: StateData[] = [];
  
  // Add explicit neighbors first
  neighborSlugs.forEach(slug => {
    const match = otherStates.find(s => s.data.slug === slug);
    if (match) neighborStates.push(match);
  });

  // Fill up with same region states
  const sameRegionStates = otherStates.filter(
    s => s.data.region === currentRegion && !neighborStates.some(n => n.data.slug === s.data.slug)
  );

  // Deterministically rotate regional states
  const rotatedSameRegion: StateData[] = [];
  if (sameRegionStates.length > 0) {
    const startIdx = seed % sameRegionStates.length;
    for (let i = 0; i < sameRegionStates.length; i++) {
      rotatedSameRegion.push(sameRegionStates[(startIdx + i) % sameRegionStates.length]);
    }
  }

  const regionalCluster = [...neighborStates, ...rotatedSameRegion].slice(0, 6);

  // 2. Similar Premium Cost Tier States
  const sortedByRateDiff = [...otherStates]
    .filter(s => !regionalCluster.some(r => r.data.slug === s.data.slug))
    .sort((a, b) => Math.abs(a.data.baseRate - currentBaseRate) - Math.abs(b.data.baseRate - currentBaseRate));

  const similarRateCluster = sortedByRateDiff.slice(0, 6);

  // 3. Popular Benchmark States
  const popularCluster: StateData[] = [];
  POPULAR_SLUGS.forEach(slug => {
    if (slug !== currentSlug && !popularCluster.some(p => p.data.slug === slug)) {
      const match = allStates.find(s => s.data.slug === slug);
      if (match) popularCluster.push(match);
    }
  });

  // 4. All States grouped by Region for Directory Matrix
  const regionGroups: Record<string, StateCardItem[]> = {
    Northeast: [],
    South: [],
    Midwest: [],
    West: []
  };

  allStates.forEach(s => {
    const item = formatStateItem(s);
    const reg = s.data.region || 'Other';
    if (!regionGroups[reg]) {
      regionGroups[reg] = [];
    }
    regionGroups[reg].push(item);
  });

  // Sort each region alphabetically
  Object.keys(regionGroups).forEach(reg => {
    regionGroups[reg].sort((a, b) => a.name.localeCompare(b.name));
  });

  return {
    regionalStates: regionalCluster.map(formatStateItem),
    similarRateStates: similarRateCluster.map(formatStateItem),
    popularStates: popularCluster.slice(0, 6).map(formatStateItem),
    regionGroups
  };
}

/**
 * Replaces mentions of other US states in editorial paragraph text with internal backlinks
 */
export function linkStateNamesInText(text: string, allStates: StateData[], currentSlug: string): string {
  if (!text) return '';
  let processed = text;

  // Sort states by name length descending so multi-word states like "New York" match first
  const sortedStates = [...allStates]
    .filter(s => s.data.slug !== currentSlug)
    .sort((a, b) => b.data.name.length - a.data.name.length);

  sortedStates.forEach(state => {
    const name = state.data.name;
    const slug = state.data.slug;
    // Match whole word state name if not inside an HTML tag or existing anchor
    const regex = new RegExp(`\\b(${name})\\b(?![^<]*>|[^<>]*<\\/a>)`, 'g');
    processed = processed.replace(
      regex,
      `<a href="/renters-insurance-calculator/${slug}/" class="text-primary font-medium hover:text-secondary underline underline-offset-2 decoration-primary/40 hover:decoration-secondary transition-colors">$1</a>`
    );
  });

  return processed;
}

