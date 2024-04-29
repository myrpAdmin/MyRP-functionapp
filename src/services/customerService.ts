import CustomerRepository from "../repositories/customerRepo";
import { ICustomer } from "../types/customerType";

class CustomerService {
  private repo: CustomerRepository;
  constructor() {
    this.repo = new CustomerRepository();
  }

  public async getCustomer(id?: string) {
    return await this.repo.getCustomer(id);
  }
  public async saveCustomer(customer: ICustomer) {
    if (customer.id) {
      return await this.repo.updateCustomer(customer);
    } else {
      return await this.repo.saveCustomer(customer);
    }
  }
  public async deleteCustomer(id: Number) {
    return await this.repo.deleteCustomer(id);
  }
}

export default CustomerService;
