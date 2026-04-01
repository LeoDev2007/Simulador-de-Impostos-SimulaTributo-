export type VehicleType = "car" | "motorcycle" | "truck" | "bus";

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

export const IPVA_RATES: Record<StateBR, Record<VehicleType, number>> = {
  AC: { car: 0.02, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  AL: { car: 0.025, motorcycle: 0.01, truck: 0.01, bus: 0.01 },
  AM: { car: 0.02, motorcycle: 0.015, truck: 0.01, bus: 0.01 },
  AP: { car: 0.02, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  BA: { car: 0.035, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  CE: { car: 0.03, motorcycle: 0.015, truck: 0.01, bus: 0.01 },
  DF: { car: 0.035, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  ES: { car: 0.02, motorcycle: 0.01, truck: 0.01, bus: 0.01 },
  GO: { car: 0.0375, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  MA: { car: 0.025, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  MG: { car: 0.04, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  MS: { car: 0.03, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  MT: { car: 0.03, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  PA: { car: 0.025, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  PB: { car: 0.025, motorcycle: 0.01, truck: 0.01, bus: 0.01 },
  PE: { car: 0.024, motorcycle: 0.01, truck: 0.01, bus: 0.01 },
  PI: { car: 0.025, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  PR: { car: 0.019, motorcycle: 0.019, truck: 0.01, bus: 0.01 },
  RJ: { car: 0.04, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  RN: { car: 0.03, motorcycle: 0.015, truck: 0.01, bus: 0.01 },
  RO: { car: 0.025, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  RR: { car: 0.025, motorcycle: 0.01, truck: 0.01, bus: 0.01 },
  RS: { car: 0.03, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  SC: { car: 0.02, motorcycle: 0.01, truck: 0.01, bus: 0.01 },
  SE: { car: 0.025, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  SP: { car: 0.04, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
  TO: { car: 0.02, motorcycle: 0.02, truck: 0.01, bus: 0.01 },
};

export type IPVAInput = {
  vehicleValue: number;
  originState: StateBR;
  vehicleType: VehicleType;
};

export type IPVAResult = {
  ipva: number;
  vehicleType: VehicleType;
  rate: number;
  vehicleValue: number;
  netValue: number;
};

export function calculateIPVA({
  vehicleValue,
  originState,
  vehicleType,
}: IPVAInput): IPVAResult {
  if (vehicleValue <= 0) {
    throw new Error("Vehicle value must be greater than zero");
  }

  const rate = IPVA_RATES[originState][vehicleType];
  const ipva = vehicleValue * rate;

  return {
    ipva,
    rate,
    vehicleType,
    vehicleValue,
    netValue: vehicleValue - ipva,
  };
}