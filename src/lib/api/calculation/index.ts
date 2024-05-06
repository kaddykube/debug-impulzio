import { PUBLIC_API_URL } from '$env/static/public';
//import type { Members, Calculation } from '$lib/types';
import type { LiquidityCalcParams } from '$lib/types';

export interface ApiResponse {
}

export async function getCalculations(params: LiquidityCalcParams): Promise<ApiResponse> {
    const response = await fetch(PUBLIC_API_URL, {
        method: 'POST',
        body: JSON.stringify(params),
    });

    return await response.json();
}