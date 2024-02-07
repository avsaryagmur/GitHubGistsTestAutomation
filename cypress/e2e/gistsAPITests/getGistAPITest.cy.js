describe("Get Github Gist by using API",  ()=> {

    const githubAccessToken =  Cypress.env('githubAccessToken');
    const authorization = `Bearer ${githubAccessToken}`;
    it('Should Get Exist GistID successfully via POST Request', ()=> {
        cy.readFile('cypress/fixtures/gistAPIResponse.json').then(({ createdGistId , createdGistURL, publicFileNameText, descriptionAPIText}) => {


     const req={
        method: "GET",
        url: `https://api.github.com/gists/${createdGistId}`,
        headers: {
            authorization,
            'X-GitHub-Api-Version': '2022-11-28',
            'Accept': 'application/vnd.github+json',
        }
     }

     cy.request(req).then((response) => {
        expect(response.status).to.eq(200) ;
        expect(response.body.description).to.eq(descriptionAPIText); 
     })

    })
    })


    it('404 - Should Return Error for Random GistID via POST Request', ()=> {


     const req={
        method: "GET",
        url: `https://api.github.com/gists/1234`,
        headers: {
            authorization,
            'X-GitHub-Api-Version': '2022-11-28',
            'Accept': 'application/vnd.github+json',
        },
        failOnStatusCode: false,
     }

     cy.request(req).then((response) => {
        expect(response.status).to.eq(404) ;
     })

    })

    it('404 - Should Return Error When GistID is Empty via POST Request', ()=> {


      const req={
         method: "GET",
         url: `https://api.github.com/gists/`,
         headers: {
             authorization,
             'X-GitHub-Api-Version': '2022-11-28',
             'Accept': 'application/vnd.github+json',
         },
         failOnStatusCode: false,
      }
 
      cy.request(req).then((response) => {
         expect(response.status).to.eq(404) ;
      })
 
     })
})
