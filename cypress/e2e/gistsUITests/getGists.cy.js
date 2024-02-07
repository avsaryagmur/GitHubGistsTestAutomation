import { CreateGists } from "../../pageObjects/CreateGistPage";

describe('Get a Gist using GitHub Gists', () => {
//npx cypress run --spec 'cypress/integration/getGistsUI.js'

const createGistsPage = new CreateGists();

    it('Should Get the Created Gist Successfully' , ()=> {
        cy.readFile('cypress/fixtures/gistId.json').then(({ createdGistID, contentNameText, descriptionText }) => {
            cy.visit(`https://gist.github.com/yagmurTest/${createdGistID}`);

            cy.contains("a", contentNameText)
            .should("be.visible")
            .and("have.attr", "href")
            .and("includes", createGistsPage.githubUserName);

          });
    })

    it('Should Handle 404 Error for Invalid Gist ID', () => {
      const invalidGistID = 'INVALID_GIST_ID'; 
  
      cy.visit(`https://gist.github.com/yagmurTest/${invalidGistID}`, { failOnStatusCode: false });
  
      cy.get('[alt="404 “This is not the web page you are looking for”"]').should("be.visible");
  
  });
  
  })
  
