
import MyDB from "./db";
interface ICustomer {
    id: number,
    name: string
}
class CustomerRepo {
    private db: MyDB
    public constructor() {
        this.db = MyDB.getInstance()
    }

    public async getCustomers() {
        const sql = "SELECT * FROM Customers";
        const results = await this.db.executeQuery<ICustomer[]>(sql);
        return results.length ? results : null;
    }
}




export default CustomerRepo;