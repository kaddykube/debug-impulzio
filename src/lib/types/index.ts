import z from "zod";

export const MIN_AGE = 18;
export const RETIREMENT_AGE = 67;

export const LiquidityCalcParamsSchema = z.object({
  averageAge: z.number().min(MIN_AGE).max(RETIREMENT_AGE), // Durchschnittsalter
  employeeCount: z.number().int().min(1), // Mitarbeiteranzahl
  employeeContribution: z.number(), // Arbeitnehmerbeitrag
  employerContribution: z.number(), // Arbeitgeberbeitrag
  companyTaxRate: z.number(), // Steuersatz Unternehmen (%)
  commitmentInterest: z.number(), // Zusagezins Mitarbeiter (%)
  investmentInterest: z.number(), // Anlagezins Arbeitgeber (%)
});

export type LiquidityCalcParams = z.infer<typeof LiquidityCalcParamsSchema>;

export interface LiquidityYear {
  year: number;
  liquidity: number;
  capitalPayment: number;
}

export interface Statistics {
  /* Dashboard: */
  maxLiquidity: number;
  averageLiquidity: number;
  employeeContribution: number;
  /* Weitere Kennzahlen */
  commitmentDate: string;
  employeeCount: number;
  averageAge: number;
  commitmentInterest: number;
  companyTaxRate: number;
  breakEvenInterest: number;
  investmentInterest: number;
  supplyVolume: number;
  /* Liquiditätsentwicklung */
  after5: number;
  after10: number;
  after20: number;
  after30: number;
  after40: number;
  /* Liquidität/Anlagezins */
  withBreakEven: number;
  with2: number;
  with3: number;
  with4: number;
  with5: number;
}

export const Member = z.object({
  text: z.string().optional(),
  isManagement: z.boolean(),
  birthDate: z.object({ year: z.number(), month: z.number() }),
  employeeContribution: z.number(),
  employerContribution: z.number(),
});

export const CalculationParamsSchema = z.object({
  members: z.array(Member),
  companyTaxRate: z.number(), // Steuersatz Unternehmen (%)
  commitmentInterest: z.number(), // Zusagezins Mitarbeiter (%)
  investmentInterest: z.number(), // Anlagezins Arbeitgeber (%)
});

export type CalculationParams = z.infer<typeof CalculationParamsSchema>;

export type Member = z.infer<typeof Member>;
