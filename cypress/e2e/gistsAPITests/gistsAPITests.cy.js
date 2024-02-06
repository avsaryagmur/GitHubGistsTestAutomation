



describe( () => {
    const githubAccessToken = "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";


    it("List gists for anonymous user", () => {
        cy.request({
          url: "https://api.github.com/gists",
          method: "GET",
        }).then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.not.be.empty;
        });
      });
      it("List gists for authenticated user", () => {
        const authorization = `bearer ${token}`;
        const options = {
          method: "GET",
          url: "https://api.github.com/gists",
          headers: {
            authorization,
          },
        };

        cy.request(options).then((res) => {
            expect(res.status).to.equal(201);
            expect(res.body.files["README.md"].filename).to.equal("README.md");
          });
        });

})