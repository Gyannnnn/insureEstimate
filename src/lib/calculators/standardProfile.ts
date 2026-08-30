import { calculateRentersPremium } from './rentersInsurance';
import { calculateBusinessPremium } from './businessInsurance';

export const STANDARD_RENTERS_PROFILE = {
  propertyValue: 20000,
  liabilityCoverage: 100000,
  deductible: 500,
} as const;

export const STANDARD_BUSINESS_PROFILE = {
  revenueTier: "0-50k",
  employeeCount: 1,
  coverageType: "GL",
} as const;

export function getRentersStandardPremium(stateBaseRate: number) {
  const est = calculateRentersPremium({
    stateBaseRate,
    ...STANDARD_RENTERS_PROFILE,
  });
  const annual = Math.round((est.low + est.high) / 2);
  const monthly = Math.round(annual / 12);
  return {
    annual,
    monthly,
    low: est.low,
    high: est.high,
    monthlyLow: est.monthlyLow,
    monthlyHigh: est.monthlyHigh,
    estimate: est,
  };
}

export function getBusinessStandardPremium(professionRiskFactor: number) {
  const est = calculateBusinessPremium({
    professionRiskFactor,
    ...STANDARD_BUSINESS_PROFILE,
  });
  const annual = Math.round((est.low + est.high) / 2);
  const monthly = Math.round(annual / 12);
  return {
    annual,
    monthly,
    low: est.low,
    high: est.high,
    monthlyLow: est.monthlyLow,
    monthlyHigh: est.monthlyHigh,
    estimate: est,
  };
}

export function calculateNationalRentersAverage(baseRates: number[]): number {
  if (!baseRates || baseRates.length === 0) return 212;
  const avgBaseRate = baseRates.reduce((sum, r) => sum + r, 0) / baseRates.length;
  return getRentersStandardPremium(avgBaseRate).annual;
}

export function calculateNationalBusinessAverage(riskFactors: number[]): number {
  if (!riskFactors || riskFactors.length === 0) return 650;
  const avgRiskFactor = riskFactors.reduce((sum, r) => sum + r, 0) / riskFactors.length;
  return getBusinessStandardPremium(avgRiskFactor).annual;
}
