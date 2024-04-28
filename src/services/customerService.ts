import CustomerRepository from "../repositories/customerRepository";

class CustomerService {
    private repo: CustomerRepository;
    constructor() {
        this.repo = new CustomerRepository();
    }

    public async getCustomer(id?: number){
        return await this.repo.getCustomer(id);
    }
    
}

export default CustomerService;