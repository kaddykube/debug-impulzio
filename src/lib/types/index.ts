import z from "zod";

export const Member = z.object({
  text: z.string().optional(),
  isManagement: z.boolean(),
  birthDate: z.object({ year: z.number(), month: z.number() }),
  employeeContribution: z.number(),
  employerContribution: z.number(),
});

export const MemberEvaluationSchema = Member.extend({
  amountDeferredCompensation: z.number(),
  amountEmployerContribution: z.number(),
}); 

export const CalculationParamsSchema = z.object({
  members: z.array(Member),
  companyTaxRate: z.number(), // Steuersatz Unternehmen (%)
  commitmentInterest: z.number(), // Zusagezins Mitarbeiter (%)
  investmentInterest: z.number(), // Anlagezins Arbeitgeber (%)
});

export type CalculationParams = z.infer<typeof CalculationParamsSchema>;

export type Member = z.infer<typeof Member>;

export type MemberEvaluation = z.infer<typeof MemberEvaluationSchema>;
