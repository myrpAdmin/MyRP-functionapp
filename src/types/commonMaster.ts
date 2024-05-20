interface ICommonMaster {
  id: number;
  groupKey: string;
  dataKey: string;
  dataValue?: string | null;
  softDelete: boolean;
}
