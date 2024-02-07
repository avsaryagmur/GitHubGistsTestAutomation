import { CreateGists } from "../../pageObjects/CreateGistPage";

describe('Get a Gist using GitHub Gists',  { tags: '@getGistsUI' },() => {
//npx cypress run --spec 'cypress/integration/getGistsUI.js'

const createGistsPage = new CreateGists();

    it('Should Get the Created Gist' , ()=> {
        cy.readFile('cypress/fixtures/gistId.json').then(({ createdGistID, contentNameText, descriptionText }) => {
            cy.visit(`https://gist.github.com/yagmurTest/${createdGistID}`);

            cy.contains("a", contentNameText)
            .should("be.visible")
            .and("have.attr", "href")
            .and("includes", createGistsPage.githubUserName);

          });
    })

    it('should retrieve the created Gist --api', () => {
      // Gist kimliğini bir dosyadan oku
      cy.readFile('cypress/fixtures/gistId.json').then(({ createdGistID, contentNameText, descriptionText }) => {
        cy.request('GET', `https://api.github.com/gists/${createdGistID}`)
          .then((response) => {
            expect(response.status).to.eq(200) 
            expect(response.body.description).to.eq(descriptionText); 
          })
      });
    })
  })
  
