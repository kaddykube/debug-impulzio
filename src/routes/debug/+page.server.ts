import type { YEAR, Calculation } from '$lib/types/debug.ts';

//import { getCalculations } from '$lib/api';

/** request body */
/* const SET_Calculation_PARAMS = {
 employeeCount: 2
}; */

const DEFAULT_GET_Calculation_12: Calculation = {
    liquidityEU: 100,
    liquidityUkasse: 120,
    liquidityImpPSVKosten: 111,
    bruttoAuszahlungMA: 10000,
    liquidityInclAuszahlung: 10000,
    liquidityAllKumVerzinst: 1020,
};

const DEFAULT_GET_Calculation_13: Calculation = {
    liquidityEU: 100,
    liquidityUkasse: 120,
    liquidityImpPSVKosten: 11,
    bruttoAuszahlungMA: 10900,
    liquidityInclAuszahlung: 18800,
    liquidityAllKumVerzinst: 1090,
};

const DEFAULT_PARAMS_YEAR_2012: YEAR = {
    year: 2012,
    calculation: DEFAULT_GET_Calculation_12,
    months: [{...DEFAULT_GET_Calculation_12, month: '1'}, {...DEFAULT_GET_Calculation_12, month: '2'}, {...DEFAULT_GET_Calculation_12, month: '3'}]
};

const DEFAULT_PARAMS_YEAR_2013: YEAR = {
    year: 2013,
    calculation: DEFAULT_GET_Calculation_13,
    months: [{...DEFAULT_GET_Calculation_13, month: '1'}, {...DEFAULT_GET_Calculation_13, month: '2'}, {...DEFAULT_GET_Calculation_13, month: '3'}]
};

export async function load() {
    
    // send request body with type of LiquidityCalcParams
    // .json.parse() type from Calculation - DEFAULT_GET_Calculation_12
    // const calculations: await getCalculations(SET_Calculation_PARAMS);

    let DEFAULT_PARAMS: YEAR[] = [];
    DEFAULT_PARAMS.push(DEFAULT_PARAMS_YEAR_2012);
    DEFAULT_PARAMS.push(DEFAULT_PARAMS_YEAR_2013);
    return {
        liqui: DEFAULT_PARAMS,
        members: [],
    };
}
