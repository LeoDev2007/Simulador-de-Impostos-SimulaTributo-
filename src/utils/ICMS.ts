export type StateBR =
  | "AC"
  | "AL"
  | "AM"
  | "AP"
  | "BA"
  | "CE"
  | "DF"
  | "ES"
  | "GO"
  | "MA"
  | "MG"
  | "MS"
  | "MT"
  | "PA"
  | "PB"
  | "PE"
  | "PI"
  | "PR"
  | "RJ"
  | "RN"
  | "RO"
  | "RR"
  | "RS"
  | "SC"
  | "SE"
  | "SP"
  | "TO";

export const ICMS_INTERNAL_RATES: Record<StateBR, number> = {
  AC: 0.17,
  AL: 0.19,
  AM: 0.2,
  AP: 0.18,
  BA: 0.205,
  CE: 0.2,
  DF: 0.2,
  ES: 0.17,
  GO: 0.19,
  MA: 0.225,
  MG: 0.18,
  MS: 0.17,
  MT: 0.17,
  PA: 0.19,
  PB: 0.2,
  PE: 0.205,
  PI: 0.23,
  PR: 0.195,
  RJ: 0.22,
  RN: 0.2,
  RO: 0.175,
  RR: 0.17,
  RS: 0.175,
  SC: 0.17,
  SE: 0.19,
  SP: 0.18,
  TO: 0.2,
};

const SOUTH_SOUTHEAST_EXCEPT_ES: StateBR[] = ["MG", "RJ", "SP", "PR", "RS", "SC"];

const NORTH_NORTHEAST_MIDWEST: StateBR[] = [
  "AC",
  "AL",
  "AM",
  "AP",
  "BA",
  "CE",
  "DF",
  "GO",
  "MA",
  "MT",
  "MS",
  "PA",
  "PB",
  "PE",
  "PI",
  "RN",
  "RO",
  "RR",
  "SE",
  "TO",
];

export function getInterstateRate(origin: StateBR, destination: StateBR): number {
  const originSouthSoutheast = SOUTH_SOUTHEAST_EXCEPT_ES.includes(origin);
  const destinationNorthNortheastMidwest = NORTH_NORTHEAST_MIDWEST.includes(destination);

  if (originSouthSoutheast && destinationNorthNortheastMidwest) {
    return 0.07;
  }

  return 0.12;
}

export type ICMSInput = {
  merchandiseValue: number;
  originState: StateBR;
  destinationState?: StateBR;
};

export type ICMSResult = {
  icms: number;
  rate: number;
  ratePercent: number;
  valueWithoutICMS: number;
  merchandiseValue: number;
  operation: "internal" | "interstate";
};

export function calculateICMS({
  merchandiseValue,
  originState,
  destinationState,
}: ICMSInput): ICMSResult {
  if (merchandiseValue <= 0) {
    throw new Error("Merchandise value must be greater than zero");
  }

  const isInterstate = Boolean(destinationState);

  const rate = isInterstate
    ? getInterstateRate(originState, destinationState!)
    : ICMS_INTERNAL_RATES[originState];

  const icms = merchandiseValue * rate;

  return {
    icms,
    rate,
    ratePercent: rate * 100,
    valueWithoutICMS: merchandiseValue - icms,
    merchandiseValue,
    operation: isInterstate ? "interstate" : "internal",
  };
}