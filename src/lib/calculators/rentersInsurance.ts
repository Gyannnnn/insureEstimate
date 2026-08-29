import { RENTERS_FACTORS } from './factors';
import type { PremiumEstimate, RentersInput } from './types';
import { round2, validateRentersInput } from './validate';

export function calculateRentersPremium(input: RentersInput): PremiumEstimate {
  const v = validateRentersInput(input);
  const propertyFactor = RENTERS_FACTORS.propertyValue[v.propertyValue];
  const liabilityFactor = RENTERS_FACTORS.liability[v.liabilityCoverage];
  const deductibleFactor = RENTERS_FACTORS.deductible[v.deductible];

  const midpoint = v.stateBaseRate * propertyFactor * liabilityFactor * deductibleFactor;
  const range = midpoint * RENTERS_FACTORS.estimateRangePercent;

  return {
    low: round2(midpoint - range),
    high: round2(midpoint + range),
    monthlyLow: round2((midpoint - range) / 12),
    monthlyHigh: round2((midpoint + range) / 12),
    breakdown: [
      { label: "State base rate", value: v.stateBaseRate },
      { label: "Coverage amount adjustment", value: propertyFactor },
      { label: "Liability coverage adjustment", value: liabilityFactor },
      { label: "Deductible adjustment", value: deductibleFactor },
    ],
    disclaimer: "This is an estimate based on average state data, not a real quote. Actual premiums vary by insurer, credit factors, and property specifics.",
  };
}
