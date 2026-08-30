export type PropertyValue = 10000 | 20000 | 30000 | 50000;
export type LiabilityCoverage = 100000 | 300000 | 500000;
export type Deductible = 500 | 1000 | 2500;

export type RevenueTier = "0-50k" | "50-150k" | "150-500k" | "500k+";
export type CoverageType = "GL" | "GL+EO";

export interface RentersInput {
  stateBaseRate: number;
  propertyValue: PropertyValue;
  liabilityCoverage: LiabilityCoverage;
  deductible: Deductible;
}

export interface BusinessInput {
  professionRiskFactor: number;
  revenueTier: RevenueTier;
  employeeCount: number;
  coverageType: CoverageType;
}

export interface PremiumEstimate {
  low: number;
  high: number;
  monthlyLow: number;
  monthlyHigh: number;
  breakdown: { label: string; value: number }[];
  disclaimer: string;
}

