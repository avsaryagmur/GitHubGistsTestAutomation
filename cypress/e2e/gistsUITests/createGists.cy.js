import { CreateGists } from "../../pageObjects/CreateGistPage";

let createdGistID;

describe('Create GitHub Gists Tests', () => {
    
   const createGistsPage = new CreateGists();

  
      beforeEach(() => {

      cy.visit('https://github.com/login');
  
      cy.get('#login_field').type(Cypress.env('username'));
      cy.get('#password').type(Cypress.env('password'));
  
      cy.get('[name="commit"]').click();
        cy.url().should('include', 'https://github.com/');
        cy.visit('https://gist.github.com');

        })

    it('Should NOT Create a Gist With Empty Content', () => {

        cy.contains("button", "Create secret gist").click();

        cy.get(createGistsPage.errorMessage).should("be.visible");
        cy.get(createGistsPage.errorMessage).contains(createGistsPage.errorMessageText);


    })
    
    it('Should Create a Secret Gist Successfully', () => {
        let currentURL;
        const randomNumber = Math.floor(Math.random() * 1001); 
        const contentNameText = 'New Secret Gist' + randomNumber;
        const descriptionText = 'YagmurGist' + randomNumber;

        cy.get(createGistsPage.description).type(descriptionText);
        cy.get(createGistsPage.contentName).type(contentNameText);
        cy.get(createGistsPage.editor).type('This Gist Created by Cypress Automation');
        cy.contains("button", "Create secret gist").click();


        cy.url().should("include", createGistsPage.githubUserName);

        cy.url().then(url => {
            currentURL = url
            createdGistID = currentURL.split('/')[4];
            cy.writeFile('cypress/fixtures/gistId.json', { createdGistID , contentNameText , descriptionText}); 
            cy.log("createdGistID: " + createdGistID);

        });

    // Check if Gist creation succeeded
        cy.contains("a", `New Secret Gist${randomNumber}`)
          .should("be.visible")
          .and("have.attr", "href")
          .and("includes", createGistsPage.githubUserName);

        cy.contains(
        'span[title="Only those with the link can see this gist."]',
        "Secret",
        ).should("be.visible");

      //  cy.get('.btn-danger').click();  

    }); 

    it('Should Create a Public Gist Successfully', () => {
        const randomNumber = Math.floor(Math.random() * 1001); 

        cy.get(createGistsPage.description).type('YagmurGist' + randomNumber);
        cy.get(createGistsPage.contentName).type('New Public Gist' + randomNumber);
        cy.get(createGistsPage.editor).type('This Gist Created by Cypress Automation');
        createGistsPage.selectPublicGist();

        cy.url().should("include", createGistsPage.githubUserName);


       // Check if Gist creation succeeded
        cy.contains("a", `New Public Gist${randomNumber}`)
          .should("be.visible")
          .and("have.attr", "href")
          .and("includes", createGistsPage.githubUserName);

      //  cy.get('.btn-danger').click();
  

    }); 

    it('Should Create a Gist By using Drag and Drop Successfully', ()=> {
        const randomNumber = Math.floor(Math.random() * 1001); 

        cy.get(createGistsPage.description).type('YagmurGist' + randomNumber);
        cy.get(createGistsPage.contentName).type('New Drag And Drop Gist' + randomNumber);
        cy.get(createGistsPage.editor).selectFile("cypress/fixtures/text.txt", {action: "drag-drop",});
        
        cy.get(".CodeMirror-sizer").contains('Drag and Drop Action');
        cy.contains("button", "Create secret gist").click();
        cy.url().should("include", createGistsPage.githubUserName);



    // Check if Gist creation succeeded
        cy.contains("a", `New Drag And Drop Gist${randomNumber}`)
          .should("be.visible")
          .and("have.attr", "href")
          .and("includes", createGistsPage.githubUserName);

        cy.contains(
        'span[title="Only those with the link can see this gist."]',
        "Secret",
        ).should("be.visible");

        // delete created gist
       // cy.get('.btn-danger').click();
    })

  });

