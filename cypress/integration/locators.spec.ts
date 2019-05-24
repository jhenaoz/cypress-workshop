import { PersonalInformationPage } from '../page';

describe('Given a page to practice automation', () => {
  before(() => {
    cy.visit('http://toolsqa.com/automation-practice-form/');
  });

  describe('when I am training locators', () => {
    const personalInformationPage = new PersonalInformationPage();

    before(() => {
      personalInformationPage.fillForm({
        firstName: 'Alejandro',
        lastName: 'Perdomo',
        sex: 'Male',
        experience: 7,
        profession: ['Automation Tester'],
        tools: ['Selenium Webdriver'],
        continent: 'South America',
        commands: [
          'Browser Commands',
          'Navigation Commands',
          'Switch Commands',
          'Wait Commands',
          'WebElement Commands']
      });
      personalInformationPage.submit();
    });
    it('should have a title', () => {
      personalInformationPage.getPageTitle()
      .should('have.text', 'Practice Automation Form');
    });
  });
});
