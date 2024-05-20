import { ICustomer } from "../types/customerType";
import MyDB from "./db";

class CustomerRepository {
  private db: MyDB;
  public constructor() {
    this.db = MyDB.getInstance();
  }

  public async getCustomer(id?: any) {
    let results;
    if (id) {
      let sql = `SELECT * FROM customer where id = ? and softDelete=false order by updatedOn desc`;
      results = await this.db.executeQuery<ICustomer[]>(sql, [id]);
    } else {
      let sql = `SELECT * FROM customer where softDelete=false order by updatedOn desc`;
      results = await this.db.executeQuery<ICustomer[]>(sql);
    }

    return results.length ? results : null;
  }

  public async saveCustomer(customer?: ICustomer) {
    let sql =
      "INSERT into customer (name, phone, email, address, createdBy, createdOn, updatedBy, updatedOn) values (?, ?, ?, ?, ?, ?, ?, ?)";

    const result = await this.db.executeQuery<any>(sql, [
      customer.name,
      customer.phone,
      customer.email,
      customer.address,
      1,
      new Date(),
      1,
      new Date(),
    ]);
    if (result && result.affectedRows > 0) {
      customer.id = result.insertId;
      return customer;
    } else {
      return null;
    }
  }
  public async updateCustomer(customer?: ICustomer) {
    customer.updatedBy = 1;
    customer.updatedOn = new Date();
    let sql =
      "Update customer set name=?, phone=?, email=?, address=?, updatedBy=?, updatedOn=? where id = ?";

    const result = await this.db.executeQuery<any>(sql, [
      customer.name,
      customer.phone,
      customer.email,
      customer.address,
      1,
      new Date(),
      customer.id,
    ]);
    return result.affectedRows > 0 ? customer : null;
  }
  public async deleteCustomer(id?: any) {
    let sql = `Update customer set softDelete=true, updatedBy=?, updatedOn=? where id = ?`;
    let result = await this.db.executeQuery<any>(sql, [1, new Date(), id]);
    return result.affectedRows > 0 ? id : null;
  }
}

export default CustomerRepository;
