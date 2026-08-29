export interface RentersInput {
  stateBaseRate: number;
  propertyValue: 10000 | 20000 | 30000 | 50000;
  liabilityCoverage: 100000 | 300000 | 500000;
  deductible: 500 | 1000 | 2500;
}

export interface BusinessInput {
  professionRiskFactor: number;
  revenueTier: "0-50k" | "50-150k" | "150-500k" | "500k+";
  employeeCount: number;
  coverageType: "GL" | "GL+EO";
}

export interface PremiumEstimate {
  low: number;
  high: number;
  monthlyLow: number;
  monthlyHigh: number;
  breakdown: { label: string; value: number }[];
  disclaimer: string;
}
