# Playwright Test Automation Demo

## Setting Up a Project
* Clone the repository
```git clone https://github.com/SemjonsSapkinsIKEA/Playwright_Demo ```

* Install dependencies

npm install
npm install playwright
npx playwright install
npm i --save-dev @playwright/test

## Overview
The following is an educational Playwright Project used to practice test automation. The focus of the testing is: https://www.saucedemo.com/v1/ which is a frequently used website to strengthen test automation knowledge. This README file seeks to explain the functionality and thought process behind each file found within the project. In addition to this, the technical prerequisites necessary for the project to work are also listed. 

## Prereqs.
* Node.js. (To install, visit: nodejs.org). 
    * To verify if Node.js is installed, run ```node -v``` and ```npm -v``` in the terminal.
* Npm
* Playwright
* Access credentials for website which is the focus of the test automation, can optionally be listed in credentials.json:
    * https://www.saucedemo.com/v1/ (Available for viewing on the website)

## Credentials.json 
The credentials.json file is not provided via the repository and must be created and filled manually if the project is run locally. This file stores credentials for the website (e.g. usernames, passwords and personal details for the purchase flow). Otherwise, the project can run utilzing a GitHub repository and GitHub secrets (which contain the credentials) in conjunction with Github actions. Values have been omitted to follow good safety practices. The credentials.json file should be created and filled with the following values/structure. 

{
    "standard_user": "",
    "locked_out_user": "",
    "problem_user" :"",
    "performance_glitch_user": "",
    "invalid_user": "",

    "firstName": "",
    "lastName": "",
    "postalCode": "",

    "standard_password": "",
    "invalid_password" : ""

}

## Sauce_demo.spec.js
Contains each individual test case that has been automated. Each test case contains the bare minimum functionality and consists mostly of calls to other functions which execute particular operations, much of which is self evident or explained in the code. For further functionality refer to WebpageNavigators. 

## WebpageNavigators
Utilizes defined webpage locators (defined in sauce_locators) to perform various actions necessary for testing. This involves everything from clicking on webpage locators, to logging in, verifying the presence of a locator on a page, as well as calculating various values. Each function contains comments to explain the functionality. Certain "magical numbers" are defined and explained using comments. 

## Sauce_locators
Contains a long list of functions that describe various locators for buttons, texts seen on the website, amongst others. Some of which are not used but are kept around to be used for testing in the future. 

## Links.json
Contains the URLs that are the subject of the Playwright tests. 

## Playwright.yml 
Configuration file utilized for setup, i.e. which components are needed for the project to run. This file is particularly used for GitHub Actions. It contains the environment variables that bind credential variables (such as passwords) to credenials stored as Github secrets. 

## Playwright.config.js
The playwright configuration file. Defines, amongst other things, which browsers the test cases shold be tested on, how many retries are permitted per test, how fast tests are executed, whether or not a video recording should be recorded during test execution, etc. For more information about what other playwright options are available, refer to the documentation:
    * https://playwright.dev/docs/test-configuration



