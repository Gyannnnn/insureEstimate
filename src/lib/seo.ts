// Meta descriptions for state and profession pages.
//
// A hand-written `seoDescription` in the content JSON always wins. When it is empty, the page
// gets a description built from its own data: its derived baseline cost and up to three of its
// risk factors. The shared wording is kept short so the page-specific part dominates.

export const META_DESCRIPTION_MAX = 160;

/** First candidate that fits within the limit; the last candidate is the shortest fallback. */
export function fitDescription(candidates: string[], max = META_DESCRIPTION_MAX): string {
  return candidates.find((c) => c.length <= max) ?? candidates[candidates.length - 1];
}

// Titles can contain "and" themselves, so list them with commas only.
function withRisks(lead: string, riskTitles: string[]): string[] {
  const titles = riskTitles.map((t) => t.trim()).filter(Boolean);
  const candidates = [3, 2, 1]
    .filter((n) => titles.length >= n)
    .map((n) => `${lead} Key risks: ${titles.slice(0, n).join(', ')}.`);
  return [...candidates, lead];
}

export function professionMetaDescription(opts: {
  name: string;
  glAnnual: number;
  glEoAnnual: number;
  riskTitles: string[];
}): string {
  const lead = `${opts.name} insurance runs about $${opts.glAnnual}/yr for General Liability ($${opts.glEoAnnual} with E&O).`;
  return fitDescription(withRisks(lead, opts.riskTitles));
}

export function stateMetaDescription(opts: {
  name: string;
  monthly: number;
  annual: number;
  riskTitles: string[];
}): string {
  const lead = `${opts.name} renters insurance runs about $${opts.monthly}/mo ($${opts.annual}/yr).`;
  return fitDescription(withRisks(lead, opts.riskTitles));
}
