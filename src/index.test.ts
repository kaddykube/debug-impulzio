import { describe, it, expect } from 'vitest';
import { calcCompletePromise } from '$lib/server/liquidity/1 - managment-expenses';

describe('calculate complete promise', () => {
    it('it should calculate the correct result', () => {
        const age = 30;
        const employerContribution = 0;
        const employeeContribution = 100;
        const commitmentInterest = 0.02;

        const result = calcCompletePromise(employeeContribution, employerContribution, commitmentInterest, age);

        console.log(result);

        expect(Math.round(result)).toBe(64523);
    });
});
