import { calculateINSS } from "./INSS"

export type IRInput = {
    salary: number,
    dependents?: number
}

export type IRResult = {
    ir: number,
    inss: number,
    netSalary: number,
    salary: number,
    dependents?: number
}

type IRBracket = {
  limit: number;
  rate: number;
  deduction: number;
}

const IR_BRACKETS: IRBracket[] = [
  { limit: 2428.80,  rate: 0.00,  deduction: 0.00   },
  { limit: 2826.65,  rate: 0.075, deduction: 182.16 },
  { limit: 3751.05,  rate: 0.15,  deduction: 394.16 },
  { limit: 4664.68,  rate: 0.225, deduction: 675.49 },
  { limit: Infinity, rate: 0.275, deduction: 908.73 },
];

const DEPENDENT_DEDUCTION = 189.59

export function calculateIR({ salary, dependents = 0 }: IRInput): IRResult {
    const inss = calculateINSS(salary)

    const base = salary - inss - dependents * DEPENDENT_DEDUCTION;

    if (base <= 0) {
        return {
            inss,
            ir: 0,
            netSalary: salary - inss,
            salary,
            dependents
        }
    }

    const bracket = IR_BRACKETS.find(b => base <= b.limit)!;

    const grossIR = base * bracket.rate - bracket.deduction

    const ir = grossIR > 0 ? grossIR : 0;

    return {
        inss,
        ir,
        netSalary: salary - inss - ir,
        salary,
        dependents
    }
}