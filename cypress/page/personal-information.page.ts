
interface PersonalInformation {
  firstName: string;
  lastName: string;
  sex: string;
  experience: number;
  profession: string[];
  tools: string[];
  continent: string;
  commands: string[];
  file?: string;
  downloadFile?: boolean;
}

export class PersonalInformationPage{

  private firstNameField: string;
  private lastNameField: string;
  private submitButton: string;
  private pageTitleLabel: string;
  private continentDropdown: string;
  private seleniumCommands: string;

  constructor () {
    this.firstNameField = '[name="firstname"]';
    this.lastNameField =  '[name="lastname"]';
    this.submitButton = '#submit';
    this.pageTitleLabel = '#content  h1';
    this.continentDropdown = '#continents';
    this.seleniumCommands = '#selenium_commands';
  }

  private getSexOption(name:string): Cypress.Chainable {
    return cy.get(`[value="${name}"]`);
  }

  private experienceOption(years: number): Cypress.Chainable {
    return cy.get(`[value="${years}"]`);
  }

  private professionOption(prof: string): Cypress.Chainable {
    return cy.get(`[value="${prof}"]`);
  }

  private toolsOption(tool: string): Cypress.Chainable {
    return cy.get(`[value="${tool}"]`);
  }

  private continentsOption(continents: string): Cypress.Chainable {
    return cy.get(this.continentDropdown).select(continents);
  }
  private selectSeleniumCommands(comands: string): Cypress.Chainable {
    return cy.get(this.seleniumCommands).select(comands);
  }

  public getPageTitle(): Cypress.Chainable {
    return cy.get(this.pageTitleLabel);
  }

  public fillForm(form: PersonalInformation) {
    debugger;
    cy.get(this.firstNameField).type(form.firstName);
    cy.get(this.lastNameField).type(form.lastName);
    this.getSexOption(form.sex).click();
    this.experienceOption(form.experience).click();
    this.continentsOption(form.continent);

    for (const name of form.profession) {
      this.professionOption(name).click();
    }

    for (const name of form.tools) {
      this.toolsOption(name).click();
    }

    for (const commands of form.commands) {
      this.selectSeleniumCommands(commands);
    }
  }

  public submit(): Cypress.Chainable {
    return cy.get(this.submitButton).click();
  }

}
