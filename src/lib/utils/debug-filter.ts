
import {writable} from 'svelte/store';
import type { Calculation} from "$lib/types/debug";

export const filterFields = writable(
  new Map<keyof Calculation, boolean>([
    ["liquidityEU", true],
    ["liquidityUkasse", true],
    ["liquidityImpPSVKosten", true],
    ["bruttoAuszahlungMA", true],
    ["liquidityInclAuszahlung", true],
    ["liquidityAllKumVerzinst", true],
  ])
);




