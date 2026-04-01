export type TaxType = 'IR' | 'ICMS' | 'IPVA';

export type ResultWithDate<T, Type extends TaxType> = T & {
  dateOfItem: string;
  type: Type;
};