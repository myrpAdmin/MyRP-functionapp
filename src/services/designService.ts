import DesignRepository from "../repositories/designRepo";
import { IDesign } from "../types/designType";

class DesignService {
  private repo: DesignRepository;
  constructor() {
    this.repo = new DesignRepository();
  }

  public async getDesign(designId?: string) {
    return await this.repo.getDesign(designId);
  }
  public async saveDesign(design: IDesign) {
    if (design.designId) {
      return await this.repo.updateDesign(design);
    } else {
      return await this.repo.saveDesign(design);
    }
  }
  public async deleteDesign(designId: Number) {
    return await this.repo.deleteDesign(designId);
  }
}

export default DesignService;
