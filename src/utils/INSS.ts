type INSSBracket = {
  limit: number;
  rate: number;
};

const INSS_BRACKETS: INSSBracket[] = [
  { limit: 1621.0, rate: 0.075 },
  { limit: 2902.84, rate: 0.09 },
  { limit: 4354.27, rate: 0.12 },
  { limit: 8475.55, rate: 0.14 },
];

export function calculateINSS(salary: number): number {
  let inss = 0;
  let calculationBase = 0;

  if (salary < 0) throw new Error("Salary cannot be negative");

  for (const bracket of INSS_BRACKETS) {
    const bracketValue = Math.min(salary, bracket.limit) - calculationBase;

    if (bracketValue <= 0) break;

    inss += bracketValue * bracket.rate;
    calculationBase = bracket.limit;
  }

  return parseFloat(inss.toFixed(2));

  // INSS is only calculated up to the ceiling of R$ 8,475.55
  // Salaries above the ceiling do not generate additional contribution
}

