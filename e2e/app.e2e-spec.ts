import { PZFrontendPage } from './app.po';

describe('pz-frontend App', function() {
  let page: PZFrontendPage;

  beforeEach(() => {
    page = new PZFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
