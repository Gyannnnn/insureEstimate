import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateRentersPremium } from '../src/lib/calculators/rentersInsurance';
import { calculateBusinessPremium } from '../src/lib/calculators/businessInsurance';

test('renters model applies coverage and deductible factors', () => {
  const result = calculateRentersPremium({ stateBaseRate: 200, propertyValue: 20000, liabilityCoverage: 300000, deductible: 1000 });
  assert.equal(result.low, 171.07); assert.equal(result.high, 217.73); assert.equal(result.breakdown.length, 4);
});
test('business model adds employees and E&O only when selected', () => {
  const gl = calculateBusinessPremium({ professionRiskFactor: 1.0, revenueTier: '50-150k', employeeCount: 2, coverageType: 'GL' });
  const eo = calculateBusinessPremium({ professionRiskFactor: 1.0, revenueTier: '50-150k', employeeCount: 2, coverageType: 'GL+EO' });
  assert.equal(eo.low - gl.low, 153); assert.equal(eo.breakdown.length, 4);
});
