import { TikalM16AppPage } from './app.po';

describe('tikal-m16-app App', () => {
  let page: TikalM16AppPage;

  beforeEach(() => {
    page = new TikalM16AppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
