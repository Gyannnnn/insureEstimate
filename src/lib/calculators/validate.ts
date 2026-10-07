import type { BusinessInput, RentersInput } from './types';
import { RENTERS_FACTORS, BUSINESS_FACTORS } from './factors';

export function round2(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

export function validateRentersInput(input: RentersInput): RentersInput {
  if (typeof input.stateBaseRate !== 'number' || isNaN(input.stateBaseRate) || input.stateBaseRate <= 0) {
    throw new Error(`Invalid stateBaseRate: ${input.stateBaseRate}. Must be a positive number.`);
  }

  const propertyAnchors = Object.keys(RENTERS_FACTORS.propertyValue).map(Number);
  const minProperty = Math.min(...propertyAnchors);
  const maxProperty = Math.max(...propertyAnchors);
  const propertyValue = Number(input.propertyValue);
  if (!Number.isFinite(propertyValue) || propertyValue < minProperty || propertyValue > maxProperty) {
    throw new Error(`Invalid propertyValue: ${input.propertyValue}. Must be between ${minProperty} and ${maxProperty}.`);
  }

  if (!Object.prototype.hasOwnProperty.call(RENTERS_FACTORS.liability, input.liabilityCoverage)) {
    throw new Error(`Invalid liabilityCoverage: ${input.liabilityCoverage}. Valid options: 100000, 300000, 500000.`);
  }

  if (!Object.prototype.hasOwnProperty.call(RENTERS_FACTORS.deductible, input.deductible)) {
    throw new Error(`Invalid deductible: ${input.deductible}. Valid options: 500, 1000, 2500.`);
  }

  return {
    stateBaseRate: input.stateBaseRate,
    propertyValue,
    liabilityCoverage: Number(input.liabilityCoverage) as RentersInput['liabilityCoverage'],
    deductible: Number(input.deductible) as RentersInput['deductible'],
  };
}

export function validateBusinessInput(input: BusinessInput): BusinessInput {
  if (typeof input.professionRiskFactor !== 'number' || isNaN(input.professionRiskFactor) || input.professionRiskFactor <= 0) {
    throw new Error(`Invalid professionRiskFactor: ${input.professionRiskFactor}. Must be a positive number.`);
  }

  if (!Object.prototype.hasOwnProperty.call(BUSINESS_FACTORS.revenueTier, input.revenueTier)) {
    throw new Error(`Invalid revenueTier: "${input.revenueTier}". Valid options: "0-50k", "50-150k", "150-500k", "500k+".`);
  }

  if (input.coverageType !== 'GL' && input.coverageType !== 'GL+EO') {
    throw new Error(`Invalid coverageType: "${input.coverageType}". Valid options: "GL", "GL+EO".`);
  }

  const rawEmployees = typeof input.employeeCount === 'number' && !isNaN(input.employeeCount) ? input.employeeCount : 0;
  const clampedEmployeeCount = Math.max(0, Math.min(500, Math.round(rawEmployees)));

  return {
    professionRiskFactor: input.professionRiskFactor,
    revenueTier: input.revenueTier,
    employeeCount: clampedEmployeeCount,
    coverageType: input.coverageType,
  };
}
