describe("Delete The All My Created Github Gist by using API", { tags: '@deleteAllGistsAPI' }, ()=> {
 
    const githubAccessToken =  Cypress.env('githubAccessToken');
    const authorization = `Bearer ${githubAccessToken}`;
    
    it('Should delete all Gists', () => {

      //List all created gists by me
      cy.request({
        method: "GET",
        url: "https://api.github.com/gists",
        headers: {
          authorization,
          'X-GitHub-Api-Version': '2022-11-28',
          'Accept': 'application/vnd.github+json',
    
        }
      }).then(response => {
        // Took gists list from response
        const gists = response.body;
    
        // Her bir gist için DELETE isteği gönder
        gists.forEach(gist => {
          cy.request({
            method: 'DELETE',
            url: `https://api.github.com/gists/${gist.id}`,
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'X-GitHub-Api-Version': '2022-11-28',
              'Authorization': authorization // GitHub API erişim token'ınızı buraya girin
            },
            failOnStatusCode: false // Başarısız durumlar için testin hata vermesini engelle
          }).then(deleteResponse => {
            if (deleteResponse.status === 204) {
              cy.log(`Gist with ID ${gist.id} is deleted successfully.`);
            } else {
              cy.log(`Failed to delete Gist with ID ${gist.id}. Status: ${deleteResponse.status}`);
            }
          });
        });
      });


    });
    
    
    
    })
    
    

    
    
    
    
    