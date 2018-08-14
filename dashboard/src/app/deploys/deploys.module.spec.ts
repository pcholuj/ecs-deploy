import { DeploysModule } from './deploys.module';

describe('DeploysModule', () => {
  let deploysModule: DeploysModule;

  beforeEach(() => {
    deploysModule = new DeploysModule();
  });

  it('should create an instance', () => {
    expect(deploysModule).toBeTruthy();
  });
});
