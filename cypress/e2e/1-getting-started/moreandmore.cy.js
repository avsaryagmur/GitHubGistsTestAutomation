describe("more yagmur - will update", ()=> {

  const githubAccessToken = Cypress.env("githubAccessToken");

  it.skip("List gists for anonymous user", () => {
    cy.request({
      url: "https://api.github.com/gists",
      method: "GET",
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.empty;
    });
  });


    it.skip('Documant - List gists for authenticated user', ()=> {
     // const authorization = `Bearer ${githubAccessToken}`;
      const options = {
        method: "GET",
        url: "https://api.github.com/gists",
        headers: {
          authorization,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      };
  
      cy.request(options).then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.not.be.empty;
      });
    })
  
  
  
  })
  

  