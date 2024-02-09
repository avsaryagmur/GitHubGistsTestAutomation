
describe('List Gists  after Creating them by API', ()=> {
    let isGistFound = false;

    const githubAccessToken =  Cypress.env('githubAccessToken');
    const authorization = `Bearer ${githubAccessToken}`;

 it('Gist Should be Created and Listed when it is Public', ()=> {
        const randomNumber = Math.floor(Math.random() * 1001); 
        const secretFileNameText = 'API - New Secret Gist' + randomNumber;
        const descriptionAPIText = 'YagmurAPIGist' + randomNumber;
    
        const body = {
          description: descriptionAPIText,
          public: true,
          files: {
            [`${secretFileNameText}`]: {
              content: "This Gist Created by using API Automation",
            },
          },
        };
        const req = {
          method: "POST",
          url: "https://api.github.com/gists",
          headers: {
            authorization,
            'X-GitHub-Api-Version': '2022-11-28',
          },
          body: body,
        };
    
        cy.request(req).then((response) => {
          const createdGistId = response.body.id;
          const createdGistURL = response.body.url;
    
    
          expect(response.status).to.equal(201);
          cy.writeFile('cypress/fixtures/gistAPIResponse.json', { createdGistId , createdGistURL, secretFileNameText});     
      })
    
      cy.readFile('cypress/fixtures/gistAPIResponse.json').then(({ createdGistId , createdGistURL, publicFileNameText, descriptionAPIText}) => {
    
      cy.request({
        method: 'GET',
        url: `https://api.github.com/users/yagmurTest/gists`,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Authorization': authorization // Put your GitHub API access token
        },
        failOnStatusCode: false // Prevent the test from failing for unsuccessful scenarios.
      }).then(allGistResponse => {
          expect(allGistResponse.status).to.equal(200);
    
          allGistResponse.body.forEach((gist) => {
            if (gist.id === createdGistId) {
              isGistFound = true;
            }
          });
        })
        .then(() => {
          expect(isGistFound).to.be.true;
        });
       //   expect(allGistResponse.body.id).includes(createdGistId);
      });
    
    });


  it('Gist Should be Created and but not Listed when it is secret', ()=> {
    const randomNumber = Math.floor(Math.random() * 1001); 
    const secretFileNameText = 'API - New Secret Gist' + randomNumber;
    const descriptionAPIText = 'YagmurAPIGist' + randomNumber;

    const body = {
      description: descriptionAPIText,
      public: false,
      files: {
        [`${secretFileNameText}`]: {
          content: "This Gist Created by using API Automation",
        },
      },
    };
    const req = {
      method: "POST",
      url: "https://api.github.com/gists",
      headers: {
        authorization,
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: body,
    };

    cy.request(req).then((response) => {
      const createdGistId = response.body.id;
      const createdGistURL = response.body.url;


      expect(response.status).to.equal(201);
      cy.writeFile('cypress/fixtures/gistAPIResponse.json', { createdGistId , createdGistURL, secretFileNameText}); 

  })

  cy.readFile('cypress/fixtures/gistAPIResponse.json').then(({ createdGistId , createdGistURL, publicFileNameText, descriptionAPIText}) => {

  cy.request({
    method: 'GET',
    url: `https://api.github.com/users/yagmurTest/gists`,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Authorization': authorization // Put your GitHub API access token
    },
    failOnStatusCode: false // Prevent the test from failing for unsuccessful scenarios.
  }).then(allGistResponse => {
      expect(allGistResponse.status).to.equal(200);

      allGistResponse.body.forEach((gist) => {
        if (gist.id !== createdGistId) {
          isGistFound = true;
        }
      });
    })
    .then(() => {
      expect(isGistFound).to.be.true;
    });
   //   expect(allGistResponse.body.id).includes(createdGistId);
  });

});

})