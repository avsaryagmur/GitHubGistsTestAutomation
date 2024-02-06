
describe('Get a Gist using GitHub Gists',  { tags: '@getGists' },() => {
//npx cypress run --spec 'cypress/integration/getGists.js'


    it('should retrieve the created Gist', () => {
      // Gist kimliğini bir dosyadan oku
      cy.readFile('cypress/fixtures/gistId.json').then(({ createdGistID, contentNameText, descriptionText }) => {
        cy.request('GET', `https://api.github.com/gists/${createdGistID}`)
          .then((response) => {
            expect(response.status).to.eq(200) 
            expect(response.body.description).to.eq(descriptionText); 
            expect(response.body.files['test.js'].content).to.eq(contentNameText); 
          })
      });
    })
  })
  
