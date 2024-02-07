describe("Create Github Gist by using API", ()=> {
 
const githubAccessToken =  Cypress.env('githubAccessToken');
const authorization = `Bearer ${githubAccessToken}`;

it("Should Create a Secret Gist Successfully via POST Request", () => {
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
      expect(response.body.files[[`${secretFileNameText}`]].filename).to.equal(`${secretFileNameText}`);
      cy.writeFile('cypress/fixtures/gistAPIResponse.json', { createdGistId , createdGistURL, secretFileNameText}); 

      cy.log(response.body);


     // deleteGistTest(createdGistId, authorization);
    });


})

it("Should Create a Public Gist Successfully via POST Request", () => {
  const randomNumber = Math.floor(Math.random() * 1001); 
  const publicFileNameText = 'API - New Public Gist' + randomNumber;
  const descriptionAPIText = 'YagmurAPIGist' + randomNumber;

  const body = {
    description: descriptionAPIText,
    public: true,
    files: {
      [`${publicFileNameText}`]: {
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
    expect(response.body.files[[`${publicFileNameText}`]].filename).to.equal(`${publicFileNameText}`);
    cy.writeFile('cypress/fixtures/gistAPIResponse.json', { createdGistId , createdGistURL, publicFileNameText, descriptionAPIText}); 

   //  deleteGistTest(createdGistId, authorization);
  });


})

it("Should Create a Readme.md Gist Successfully via POST Request", () => {

  const body = {
    description: "Readme.md API automation Test",
    public: true,
    files: {
      "README.md": {
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
    expect(response.body.files["README.md"].filename).to.equal("README.md");
  //  deleteGistTest(createdGistId, authorization);
  });


})

it("422 Validation failed - Should NOT Create a Gist Successfully with Empty Content via POST Request", () => {

  const body = {
    description: "API automation Test",
    public: true,
    files: {
      "Empty Content Check": {
        content: "",
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
  //  NOTE: This was considered a failure because the status code was not 2xx or 3xx. 
  //        If you do not want status codes to cause failures pass the option: failOnStatusCode: false

    failOnStatusCode: false,
    body: body,
  };

  cy.request(req).then((response) => {
 
    expect(response.status).to.equal(422);
  //  deleteGistTest(createdGistId, authorization);
  });


})

it("401 Unauthorized failed - Should NOT Create a Gist Successfully For non-authenticated user via POST Request", () => {

  const body = {
    description: "Readme.md API automation Test",
    public: true,
    files: {
      "README.md": {
        content: "This Gist Created by using API Automation",
      },
    },
  };
  const req = {
    method: "POST",
    url: "https://api.github.com/gists",
    headers: {
      'Authorization': 'Bearer 12345678', 
      'X-GitHub-Api-Version': '2022-11-28',
    },
    failOnStatusCode: false , 
    body: body,
  };

  cy.request(req).then((response) => {
    expect(response.status).to.equal(401);
  });


})

})


function deleteGistTest(gistId, token) {


  cy.request({
    method: 'DELETE',
    url: `https://api.github.com/gists/${gistId}`,
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': token, // GitHub API erişim token'ınızı buraya girin
      'X-GitHub-Api-Version': '2022-11-28'
    },
    failOnStatusCode: false // Başarısız durumlar için testin hata vermesini engelle
  }).then(response => {
    // Başarılı olup olmadığını kontrol et
    if (response.status === 204) {
      cy.log(`Gist with ID ${gistId} is deleted successfully.`);
    } else {
      cy.log(`Failed to delete Gist with ID ${gistId}. Status: ${response.status}`);
    }
  });

}




