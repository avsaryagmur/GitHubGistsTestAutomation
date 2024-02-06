
export class CreateGists {
    constructor() {
      this.errorMessage = ".js-flash-alert";
      this.errorMessageText = "Contents can't be empty";
      this.description = '[name="gist[description]"]';
      this.contentName = '[name="gist[contents][][name]"]';
      this.editor = '#code-editor' ;
      this.githubUserName = "yagmurTest";
      this.selectCreatedGistType = '.select-menu-button';
      this.choosePublicType = '[aria-checked="false"]';


    }


    selectPublicGist(){
        cy.get(this.selectCreatedGistType).click();
        cy.get(this.choosePublicType).click();
       cy.contains("button", "Create public gist").click();
    }
  
  }

