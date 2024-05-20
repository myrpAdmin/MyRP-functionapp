import { IDesign } from "../types/designType";
import MyDB from "./db";

class DesignRepository {
  private db: MyDB;
  public constructor() {
    this.db = MyDB.getInstance();
  }

  public async getDesign(designId?: any) {
    let results;
    if (designId) {
      let sql = `SELECT * FROM design where designId = ? and softDelete=false order by updatedOn desc`;
      results = await this.db.executeQuery<IDesign[]>(sql, [designId]);
    } else {
      let sql = `SELECT * FROM design where softDelete=false order by updatedOn desc`;
      results = await this.db.executeQuery<IDesign[]>(sql);
    }

    return results.length ? results : "";
  }

  public async saveDesign(design?: IDesign) {
    design.createdBy = 1;
    design.createdOn = new Date();
    design.updatedBy = 1;
    design.updatedOn = new Date();
    let sql =
      "INSERT into design (itemType, grossWeight, netWeight, diamondPcs, diamondCarats, csPcs, csCarats, designImages, cadImages, cadStoneMapId, createdBy, createdOn, updatedBy, updatedOn)" +
      "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const result = await this.db.executeQuery<any>(sql, [
      design.itemType,
      design.grossWeight,
      design.netWeight,
      design.diamondPcs,
      design.diamondCarats,
      design.csPcs,
      design.csCarats,
      design.designImages,
      design.cadImages,
      design.cadStoneMapId,
      design.createdBy,
      design.createdOn,
      design.updatedBy,
      design.updatedOn,
    ]);
    if (result && result.affectedRows > 0) {
      design.designId = result.insertId;
      return design;
    } else {
      return "";
    }
  }
  public async updateDesign(design?: IDesign) {
    design.updatedBy = 1;
    design.updatedOn = new Date();
    let sql =
      "Update design set itemType=?, grossWeight=?, netWeight=?, diamondPcs=?, " +
      "diamondCarats=?, csPcs=?, csCarats=?, " +
      "designImages=?, cadImages=?, cadStoneMapId=?, " +
      "updatedBy=?, updatedOn=? where designId = " +
      design.designId;

    const result = await this.db.executeQuery<any>(sql, [
      design.itemType,
      design.grossWeight,
      design.netWeight,
      design.diamondPcs,
      design.diamondCarats,
      design.csPcs,
      design.csCarats,
      design.designImages,
      design.cadImages,
      design.cadStoneMapId,
      design.createdBy,
      design.createdOn,
      design.updatedBy,
      design.updatedOn,
    ]);

    return result.affectedRows > 0 ? design : "";
  }
  public async deleteDesign(designId?: any) {
    let sql = `Update design set softDelete=true, updatedBy=?, updatedOn=? where designId = ?`;
    let result = await this.db.executeQuery<any>(sql, [
      1,
      new Date(),
      designId,
    ]);
    return result.affectedRows > 0 ? designId : "";
  }

  public async getStoneMapping(designId: any) {
    if (designId) {
      let sql = `SELECT * FROM cad_stone_mapping where designId = ? and softDelete=false order by sNo`;
      let results = await this.db.executeQuery<IStoneMapping[]>(sql, [
        designId,
      ]);
      return results.length ? results : "";
    }

    return "";
  }

  public async saveStoneMapping(
    designId?: string,
    stoneMappings?: [IStoneMapping]
  ) {
    this.deleteStoneMapping(designId, true);

    let insertSql = `INSERT INTO cad_stone_mapping (designId, sNo, stone, shape, size, sieve, quantity, cts, setting, remarks) VALUES ?`;

    let value = stoneMappings.map((stoneMapping, index) => {
      return [
        designId,
        stoneMapping.sNo,
        stoneMapping.stone,
        stoneMapping.shape,
        stoneMapping.size,
        stoneMapping.sieve,
        stoneMapping.quantity,
        stoneMapping.cts,
        stoneMapping.setting,
        stoneMapping.remarks,
      ];
    });
    let result = await this.db.executeQuery<any>(insertSql, [value]);
    return result;
  }
  public async deleteStoneMapping(designId: string, hardDelete?: boolean) {
    let deleteSql = `Update cad_stone_mapping set softDelete=true where designId = ${designId}`;
    if (hardDelete) {
      deleteSql = `Delete from cad_stone_mapping where designId = ${designId}`;
    }
    let result = await this.db.executeQuery<any>(deleteSql);
    return result.affectedRows > 0 ? designId : "";
  }
}

export default DesignRepository;
