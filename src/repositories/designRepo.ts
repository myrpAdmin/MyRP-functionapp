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
      let sql = `SELECT * FROM design where designId = ? and softDelete=false`;
      results = await this.db.executeQuery<IDesign[]>(sql, [designId]);
    } else {
      let sql = `SELECT * FROM design where softDelete=false`;
      results = await this.db.executeQuery<IDesign[]>(sql);
    }

    return results.length ? results : null;
  }

  public async saveDesign(design?: IDesign) {
    let sql =
      "INSERT into design (itemType, grossWeight, netWeight, diamondPcs, diamondCarats, csPcs, csCarats, imageBaseUrl, finishedImage, sketchImage, cadImages, cadStoneMapId, createdBy, createdOn, updatedBy, updatedOn)" +
      "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const results = await this.db.executeQuery<IDesign[]>(sql, [
      design.itemType,
      design.grossWeight,
      design.netWeight,
      design.diamondPcs,
      design.diamondCarats,
      design.csPcs,
      design.csCarats,
      design.imageBaseUrl,
      design.finishedImage,
      design.sketchImage,
      design.cadImages,
      design.cadStoneMapId,
      design.createdBy,
      design.createdOn,
      design.updatedBy,
      design.updatedOn,
    ]);
    return results.length ? results : null;
  }
  public async updateDesign(design?: IDesign) {
    let sql =
      "Update design set itemType=?, grossWeight=?, netWeight=?, diamondPcs=?, " +
      "diamondCarats=?, csPcs=?, csCarats=?, imageBaseUrl=?, " +
      "finishedImage=?, sketchImage=?, cadImages=?, cadStoneMapId=?, " +
      "createdBy=?, createdOn=?, updatedBy=?, updatedOn=? where designId = ?";

    const results = await this.db.executeQuery<IDesign[]>(sql, [
      design.itemType,
      design.grossWeight,
      design.netWeight,
      design.diamondPcs,
      design.diamondCarats,
      design.csPcs,
      design.csCarats,
      design.imageBaseUrl,
      design.finishedImage,
      design.sketchImage,
      design.cadImages,
      design.cadStoneMapId,
      design.createdBy,
      design.createdOn,
      design.updatedBy,
      design.updatedOn,
      design.designId,
    ]);
    return results.length ? results : null;
  }
  public async deleteDesign(designId?: any) {
    let sql = `Update design set softDelete=true where designId = ?`;
    let results = await this.db.executeQuery<IDesign[]>(sql, [designId]);
    return results.length ? results : null;
  }
}

export default DesignRepository;
