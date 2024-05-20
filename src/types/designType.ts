interface IDesign {
  designId: number;
  itemType: number;
  grossWeight: number;
  netWeight: number;
  diamondPcs: number;
  diamondCarats: number;
  csPcs: number;
  csCarats: number;
  designImages: string;
  cadImages: string;
  cadStoneMapId: number;
  createdBy: number;
  createdOn: Date;
  updatedBy: number;
  updatedOn: Date;
  softDelete: boolean;
}

export type { IDesign };
