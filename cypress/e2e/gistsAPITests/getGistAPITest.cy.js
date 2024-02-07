describe("Get Github Gist by using API",  { tags: '@getGistsAPI' }, ()=> {
    //npx cypress run --spec 'cypress/integration/getGistAPI.js'

    const githubAccessToken =  Cypress.env('githubAccessToken');
    const authorization = `Bearer ${githubAccessToken}`;
    it('Get Exist GistID successfully via POST Request', ()=> {
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
})
