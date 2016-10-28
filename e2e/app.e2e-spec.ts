import { TimeApeAngularPage } from './app.po';

describe('time-ape-angular App', function() {
  let page: TimeApeAngularPage;

  beforeEach(() => {
    page = new TimeApeAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
