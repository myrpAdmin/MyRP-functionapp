
import { ICustomer } from "../myrpTypes";
import MyDB from "./db";

class CustomerRepository {
    private db: MyDB
    public constructor() {
        this.db = MyDB.getInstance()
    }

    public async getCustomer(id?: number) {
        let sql = "SELECT * FROM customer";
        if(id) sql += ` where id = ${id}`;
        
        const results = await this.db.executeQuery<ICustomer[]>(sql);
        return results.length ? results : null;
    }
}




export default CustomerRepository;