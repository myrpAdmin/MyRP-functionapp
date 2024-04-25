import { Pool, createPool } from "mysql";

class MyDB {
    private static instance: MyDB | null = null;
    private static pool: Pool;
    private constructor(){
        MyDB.pool =  createPool({
            host: "myrp-sql.mysql.database.azure.com",
            user: "myrpsqladmin",
            password: "Ihave6pacs$",
            database: "myrp",
            ssl: {
                rejectUnauthorized: false
            }
        })
    }

    public static getInstance() {
        if (!MyDB.instance) {
            MyDB.instance = new MyDB();
        }
        return MyDB.instance;
    }

    public executeQuery<T>(sql: string, values?: any[]): Promise<T> {
        return new Promise((resolve, reject) => {
            MyDB.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }
                connection.query(sql, values, (error, results) => {
                    connection.release(); // Release the connection after executing the query
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results);
                });
            });
        });
    }
}

export default MyDB;