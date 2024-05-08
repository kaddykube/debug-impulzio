//import { PUBLIC_API_URL } from '$env/static/public';
import type { CalculationParams, MemberEvaluation } from "$lib/types";
import type { Calculation, YEAR } from "$lib/types/debug";
import type { PageServerData } from "../../../routes/debug/$types";
export let data: PageServerData;

export interface ApiResponse {
  liqui: YEAR[];
  members: MemberEvaluation[];
}

const DEFAULT_MemberEvaluation: MemberEvaluation = {
  isManagement: false,
  birthDate: {
    year: 1980,
    month: 2,
  },
  employeeContribution: 100,
  employerContribution: 50,
  amountDeferredCompensation: 24000,
  amountEmployerContribution: 12000,
  text: "Mitarbeiter id",
};

const DEFAULT_GET_Calculation_14: Calculation = {
  liquidityEU: 10,
  liquidityUkasse: 12,
  liquidityImpPSVKosten: 11,
  bruttoAuszahlungMA: 100,
  liquidityInclAuszahlung: 100,
  liquidityAllKumVerzinst: 1020,
};

const DEFAULT_GET_Calculation_13: Calculation = {
  liquidityEU: 100,
  liquidityUkasse: 120,
  liquidityImpPSVKosten: 11,
  bruttoAuszahlungMA: 10900,
  liquidityInclAuszahlung: 180,
  liquidityAllKumVerzinst: 10,
};

const DEFAULT_PARAMS_YEAR_2014: YEAR = {
  year: 2014,
  calculation: DEFAULT_GET_Calculation_14,
  months: [
    { ...DEFAULT_GET_Calculation_14, month: "1" },
    { ...DEFAULT_GET_Calculation_14, month: "2" },
    { ...DEFAULT_GET_Calculation_14, month: "3" },
  ],
};

const DEFAULT_PARAMS_YEAR_2013: YEAR = {
  year: 2013,
  calculation: DEFAULT_GET_Calculation_13,
  months: [
    { ...DEFAULT_GET_Calculation_13, month: "1" },
    { ...DEFAULT_GET_Calculation_13, month: "2" },
    { ...DEFAULT_GET_Calculation_13, month: "3" },
  ],
};

export async function getCalculations(
  params: CalculationParams
): Promise<ApiResponse> {
  /*     const response = await fetch(PUBLIC_API_URL, {
        method: 'POST',
        body: JSON.stringify(params),
    }); */
  let DEFAULT_PARAMS: YEAR[] = [];
  DEFAULT_PARAMS.push(DEFAULT_PARAMS_YEAR_2014);
  DEFAULT_PARAMS.push(DEFAULT_PARAMS_YEAR_2013);

  let DEFAULT_M: MemberEvaluation[] = [];
  DEFAULT_M.push(DEFAULT_MemberEvaluation);
  DEFAULT_M.push(DEFAULT_MemberEvaluation);
  DEFAULT_M.push(DEFAULT_MemberEvaluation);

  const response = { liqui: DEFAULT_PARAMS, members: DEFAULT_M };

  return await response;
}
