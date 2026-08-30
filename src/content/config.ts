import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const states = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/states' }),
  schema: z.object({
    slug: z.string(), name: z.string(), abbreviation: z.string(), region: z.string(),
    image: z.string(), imageAlt: z.string(), baseRate: z.number().nonnegative(), avgRent: z.number().nonnegative(),
    requirementsNote: z.string(), intro: z.string(), seoTitle: z.string(), seoDescription: z.string(),
    demographics: z.object({
      typicalPersonalProperty: z.number(),
      typicalLiability: z.number(),
      typicalDeductible: z.number(),
      demographicNote: z.string(),
    }).optional(),
    riskFactors: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    })).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    blogContent: z.object({
      whyThisRate: z.string(),
      howCalculated: z.string(),
      comparisonNote: z.string(),
    }).optional(),
  }),
});

const professions = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/professions' }),
  schema: z.object({
    slug: z.string(), name: z.string(), category: z.string(), image: z.string(), imageAlt: z.string(),
    riskFactor: z.number().nonnegative(), typicalEmployeeRange: z.string(), recommendedCoverage: z.array(z.string()),
    notes: z.string(), intro: z.string(), seoTitle: z.string(), seoDescription: z.string(),
    industryContext: z.object({
      typicalRevenueTier: z.string(),
      typicalEmployeeCount: z.string(),
      contextNote: z.string(),
    }).optional(),
    riskFactors: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    })).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    blogContent: z.object({
      whyThisRiskFactor: z.string(),
      howCalculated: z.string(),
      comparisonNote: z.string(),
    }).optional(),
  }),
});

export const collections = { states, professions };
