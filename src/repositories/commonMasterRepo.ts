import MyDB from "./db";

class CommonMasterRepo {
  private db: MyDB;
  public constructor() {
    this.db = MyDB.getInstance();
  }

  public async getMasterData(groupKey?: any, dataKey?: any) {
    let key = "'" + groupKey.replaceAll(",", "','") + "'";
    let sql = `SELECT * FROM common_master where groupKey in (${key})`;
    let param = [];
    if (dataKey) {
      sql += " and dataKey = ? ";
      param.push(dataKey);
    }
    let results = await this.db.executeQuery<ICommonMaster[]>(sql, param);

    return results.length ? results : null;
  }
}

export default CommonMasterRepo;
