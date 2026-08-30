import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateRentersPremium } from './rentersInsurance';
import { calculateBusinessPremium } from './businessInsurance';
import { validateBusinessInput, round2 } from './validate';

describe('Calculator Engine & Validation Unit Tests', () => {
  describe('Rounding Utility', () => {
    it('rounds numbers cleanly to 2 decimal places', () => {
      assert.equal(round2(142.00000004), 142);
      assert.equal(round2(15.6789), 15.68);
    });
  });

  describe('Renters Premium Calculator', () => {
    it('calculates expected premium ranges for standard inputs', () => {
      const result = calculateRentersPremium({
        stateBaseRate: 180,
        propertyValue: 20000,
        liabilityCoverage: 300000,
        deductible: 1000,
      });

      assert.ok(result.low > 0);
      assert.ok(result.high > result.low);
      assert.ok(result.monthlyLow > 0);
      assert.ok(result.monthlyHigh > result.monthlyLow);
      assert.equal(result.breakdown.length, 4);
      assert.ok(result.disclaimer.includes('estimate'));
    });

    it('throws error for invalid stateBaseRate', () => {
      assert.throws(() => {
        calculateRentersPremium({
          stateBaseRate: -10,
          propertyValue: 20000,
          liabilityCoverage: 300000,
          deductible: 1000,
        });
      }, /Invalid stateBaseRate/);
    });

    it('throws error for invalid propertyValue option', () => {
      assert.throws(() => {
        calculateRentersPremium({
          stateBaseRate: 180,
          propertyValue: 99999 as any,
          liabilityCoverage: 300000,
          deductible: 1000,
        });
      }, /Invalid propertyValue/);
    });
  });

  describe('Business Premium Calculator', () => {
    it('calculates expected premium ranges for GL and GL+EO coverage', () => {
      const glResult = calculateBusinessPremium({
        professionRiskFactor: 1.2,
        revenueTier: '50-150k',
        employeeCount: 2,
        coverageType: 'GL',
      });

      const eoResult = calculateBusinessPremium({
        professionRiskFactor: 1.2,
        revenueTier: '50-150k',
        employeeCount: 2,
        coverageType: 'GL+EO',
      });

      assert.ok(eoResult.low > glResult.low);
      assert.equal(glResult.breakdown.length, 3);
      assert.equal(eoResult.breakdown.length, 4);
    });

    it('rounds non-integer employee counts to nearest integer and clamps bounds', () => {
      const case35 = validateBusinessInput({
        professionRiskFactor: 1.0,
        revenueTier: '50-150k',
        employeeCount: 3.5,
        coverageType: 'GL',
      });
      assert.equal(case35.employeeCount, 4);

      const case34 = validateBusinessInput({
        professionRiskFactor: 1.0,
        revenueTier: '50-150k',
        employeeCount: 3.4,
        coverageType: 'GL',
      });
      assert.equal(case34.employeeCount, 3);

      const neg5 = validateBusinessInput({
        professionRiskFactor: 1.0,
        revenueTier: '0-50k',
        employeeCount: -5,
        coverageType: 'GL',
      });
      assert.equal(neg5.employeeCount, 0);

      const large10000 = validateBusinessInput({
        professionRiskFactor: 1.0,
        revenueTier: '0-50k',
        employeeCount: 10000,
        coverageType: 'GL',
      });
      assert.equal(large10000.employeeCount, 500);

      // Verify 3.5 employee calculation output equals 4 employee calculation output
      const res35 = calculateBusinessPremium({
        professionRiskFactor: 1.0,
        revenueTier: '50-150k',
        employeeCount: 3.5,
        coverageType: 'GL',
      });
      const res4 = calculateBusinessPremium({
        professionRiskFactor: 1.0,
        revenueTier: '50-150k',
        employeeCount: 4,
        coverageType: 'GL',
      });
      assert.deepEqual(res35, res4);

      // Verify 3.4 employee calculation output equals 3 employee calculation output
      const res34 = calculateBusinessPremium({
        professionRiskFactor: 1.0,
        revenueTier: '50-150k',
        employeeCount: 3.4,
        coverageType: 'GL',
      });
      const res3 = calculateBusinessPremium({
        professionRiskFactor: 1.0,
        revenueTier: '50-150k',
        employeeCount: 3,
        coverageType: 'GL',
      });
      assert.deepEqual(res34, res3);
    });

    it('throws error for invalid revenueTier option', () => {
      assert.throws(() => {
        calculateBusinessPremium({
          professionRiskFactor: 1.0,
          revenueTier: 'invalid-tier' as any,
          employeeCount: 1,
          coverageType: 'GL',
        });
      }, /Invalid revenueTier/);
    });
  });
});
