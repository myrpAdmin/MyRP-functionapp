import CommonMasterRepo from "../repositories/commonMasterRepo";

class CommonMasterService {
  private repo: CommonMasterRepo;
  constructor() {
    this.repo = new CommonMasterRepo();
  }

  public async getMasterData(groupKey?: string) {
    return await this.repo.getMasterData(groupKey);
  }
}

export default CommonMasterService;
