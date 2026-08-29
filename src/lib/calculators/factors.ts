export const RENTERS_FACTORS = {
  propertyValue: { 10000: 0.6, 20000: 1.0, 30000: 1.3, 50000: 1.8 } as Record<number, number>,
  liability: { 100000: 1.0, 300000: 1.08, 500000: 1.15 } as Record<number, number>,
  deductible: { 500: 1.0, 1000: 0.9, 2500: 0.78 } as Record<number, number>,
  estimateRangePercent: 0.12,
};

export const BUSINESS_FACTORS = {
  revenueTier: { "0-50k": 1.0, "50-150k": 1.25, "150-500k": 1.6, "500k+": 2.1 } as Record<string, number>,
  perEmployeeAddon: 45,
  flatAdminBaseline: 120,
  eoAddonFlat: 180,
  estimateRangePercent: 0.15,
};
