import { BUSINESS_FACTORS } from './calculators/factors';

export const siteCopy = {
  disclaimer: 'This tool provides an educational estimate, not an insurance quote. Actual premiums, eligibility, and coverage vary by insurer and individual circumstances.',
  methodology: `Each estimate multiplies this profession's risk factor by your annual revenue tier, then adds a per-employee cost, a fixed policy administration baseline, and a flat professional liability (E&O) charge when that coverage is selected. The result is shown as a range of ±${Math.round(BUSINESS_FACTORS.estimateRangePercent * 100)}% around the midpoint to reflect pricing differences between carriers. Risk factors are modeled from publicly available commercial insurance benchmarks for each industry class, so treat the output as a planning estimate rather than a quote.`,
  cta: 'Compare insurance options',
};
