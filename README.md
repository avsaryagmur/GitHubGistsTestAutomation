# GitHub Gists Cypress Test Automation
These tests simulate typical user interactions with both the Gist UI application and its API.

### How Can You Create a New Cypress Project?

1. Install homebrew (if you prefer):

` /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" `

2. Install node:

` brew install node `

3. Download Visual Studio Code

4. Create a new folder and Open it in Visual Studio Code

5. Open the terminal

6. Create package.json file:

`npm -i init`

7. Install Cypress:

`npm install cypress --save -dev`

8. Open Cypress:

`npx cypress open` or `node_modules/.bin/cypress open`

- Click E2E Testing selection when the Welcome to Cypress! page opened. 
- Click Continue in Configuration files page.
- Click Start E2E Testing in Chrome button in Choose a browser page.
- Click Scaffold example specs selection in Create your first spec page.
- Click Okay, I got it! button.






### Setup and Run

1. Open the terminal and change the current working directory to the location where you want to clone the repository.

2. Clone this repo to your device.

3. Install homebrew (if you prefer):

` /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" `

4. Install node:

` brew install node `

5. Install project dependencies:

`npm install`

6. Create a file named "cypress.env.json" and fill in your GitHub credentials such as "cypress.example.env.json"

7. Run all tests interactively:

`npx cypress open`


### The packages
`npm install --save-dev cypress-file-upload`

`npm install --save-dev @4tw/cypress-drag-drop`


## Helpful Extension
I am using SelectorsHub to find the UI elements.
