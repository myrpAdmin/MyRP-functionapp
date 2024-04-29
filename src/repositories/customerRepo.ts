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
      let sql = `SELECT * FROM customer where id = ?`;
      results = await this.db.executeQuery<ICustomer[]>(sql, [id]);
    } else {
      let sql = `SELECT * FROM customer`;
      results = await this.db.executeQuery<ICustomer[]>(sql);
    }

    return results.length ? results : null;
  }

  public async saveCustomer(customer?: ICustomer) {
    let sql =
      "INSERT into customer (name, phone, email, address) values (?, ?, ?, ?)";

    const results = await this.db.executeQuery<ICustomer[]>(sql, [
      customer.name,
      customer.phone,
      customer.email,
      customer.address,
    ]);
    return results.length ? results : null;
  }
  public async updateCustomer(customer?: ICustomer) {
    let sql =
      "Update customer set name=?, phone=?, email=?, address=? where id = ?";

    const results = await this.db.executeQuery<ICustomer[]>(sql, [
      customer.name,
      customer.phone,
      customer.email,
      customer.address,
      customer.id,
    ]);
    return results.length ? results : null;
  }
  public async deleteCustomer(id?: any) {
    let sql = `DELETE FROM customer where id = ?`;
    let results = await this.db.executeQuery<ICustomer[]>(sql, [id]);
    return results.length ? results : null;
  }
}

export default CustomerRepository;
