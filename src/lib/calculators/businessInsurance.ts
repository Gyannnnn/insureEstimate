import { BUSINESS_FACTORS } from './factors';
import type { BusinessInput, PremiumEstimate } from './types';
import { round2, validateBusinessInput } from './validate';

export function calculateBusinessPremium(input: BusinessInput): PremiumEstimate {
  const v = validateBusinessInput(input);
  const revenueFactor = BUSINESS_FACTORS.revenueTier[v.revenueTier];
  const employeeAddon = v.employeeCount * BUSINESS_FACTORS.perEmployeeAddon;
  const eoAddon = v.coverageType === 'GL+EO' ? BUSINESS_FACTORS.eoAddonFlat : 0;

  const baselineRiskContribution = round2(v.professionRiskFactor * revenueFactor * 100);
  const midpoint = baselineRiskContribution + employeeAddon + BUSINESS_FACTORS.flatAdminBaseline + eoAddon;
  const range = midpoint * BUSINESS_FACTORS.estimateRangePercent;

  return {
    low: round2(midpoint - range),
    high: round2(midpoint + range),
    monthlyLow: round2((midpoint - range) / 12),
    monthlyHigh: round2((midpoint + range) / 12),
    breakdown: [
      { label: `Risk factor (${v.professionRiskFactor}) × Revenue tier (${v.revenueTier})`, value: baselineRiskContribution },
      { label: `Employee count (${v.employeeCount} @ $${BUSINESS_FACTORS.perEmployeeAddon}/ea)`, value: employeeAddon },
      { label: "Policy administration baseline", value: BUSINESS_FACTORS.flatAdminBaseline },
      ...(eoAddon > 0 ? [{ label: "Professional liability (E&O)", value: eoAddon }] : []),
    ],
    disclaimer: "This is an estimate based on commercial benchmarks, not a binding policy quote. Actual premiums vary by claims history, specific state, and carrier underwriting.",
  };
}
