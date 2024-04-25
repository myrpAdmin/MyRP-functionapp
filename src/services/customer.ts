import CustomerRepo from "../repositories/customer";

class CustomerSvc {
    private repo: CustomerRepo;
    constructor() {
        this.repo = new CustomerRepo();
    }

    public async getCustomers(){
        return await this.repo.getCustomers();
    }
    
}

export default CustomerSvc;