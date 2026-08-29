import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const states = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/states' }),
  schema: z.object({
    slug: z.string(), name: z.string(), abbreviation: z.string(), region: z.string(),
    image: z.string(), imageAlt: z.string(), baseRate: z.number().nonnegative(), avgRent: z.number().nonnegative(),
    requirementsNote: z.string(), intro: z.string(), seoTitle: z.string(), seoDescription: z.string(),
  }),
});

const professions = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/professions' }),
  schema: z.object({
    slug: z.string(), name: z.string(), category: z.string(), image: z.string(), imageAlt: z.string(),
    riskFactor: z.number().nonnegative(), typicalEmployeeRange: z.string(), recommendedCoverage: z.array(z.string()),
    notes: z.string(), intro: z.string(), seoTitle: z.string(), seoDescription: z.string(),
  }),
});

export const collections = { states, professions };
