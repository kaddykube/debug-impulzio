
// TODO zod object anstelle interface 
// response.body kommt von fetch api -> schema 
import z from 'zod';

export const LiquidityCalcParamsSchema = z.object({
    employeeCount: z.number().int().min(1), // Mitarbeiteranzahl
});

export type LiquidityCalcParams = z.infer<typeof LiquidityCalcParamsSchema>;


export interface YEAR  {
    year: number;
    calculation: Calculation;
    [key: string]: any,
}

export interface Calculation {
    liquidityEU: number;
    liquidityUkasse: number;
    liquidityImpPSVKosten: number;
    bruttoAuszahlungMA: number;
    liquidityInclAuszahlung: number;
    liquidityAllKumVerzinst: number;


    [key: string]: any,
}
