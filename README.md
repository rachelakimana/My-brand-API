![](<https://img.shields.io/badge/Coverage-67%25-5A7302.svg?prefix=![](https://img.shields.io/badge/Coverage-NaN%25-grey.svg?prefix=$coverage$))>)
![](<https://img.shields.io/badge/Statements-66%25-5A7302.svg?style=flat&logo=kotlin&logoColor=white&color=blue&prefix=![](https://img.shields.io/badge/Coverage-NaN%25-grey.svg?style=flat&logo=kotlin&logoColor=white&color=blue&prefix=$statements$))>)
![](<https://img.shields.io/badge/Branches-59%25-F2E96B.svg?style=social&logo=ktor&logoColor=black&color=red&prefix=![branches](https://img.shields.io/badge/Branches-59%25-F2E96B.svg?style=social&logo=ktor&logoColor=black&color=red&prefix=![](https://img.shields.io/badge/Coverage-NaN%25-grey.svg?style=social&logo=ktor&logoColor=black&color=red&prefix=$branches$))>)
![](<https://img.shields.io/badge/Functions-76%25-5A7302.svg?prefix=![functions](https://img.shields.io/badge/Functions-76%25-5A7302.svg?prefix=![](https://img.shields.io/badge/Coverage-NaN%25-grey.svg?prefix=$functions$))>)
![](<https://img.shields.io/badge/Lines-66%25-5A7302.svg?prefix=![](https://img.shields.io/badge/Coverage-NaN%25-grey.svg?prefix=$lines$))>)

# Project Summary

You are expected to create all the endpoints required to meet all the requirements listed under the required features section and ensure that you persist data with a database. You are required to use mongoose which will help you write to and read from your mongoDb database. The endpoints are to be secured with JWT.

NB: All Javascript MUST be written in ES6 or higher and should use Babel to transpile down to ES5 You are to create pull request for each feature in this module to elicit review and feedback. Classes/modules MUST respect the SRP (Single Responsibility Principle) and MUST use the ES6 methods of module imports and exports.

## Requirements

For development, you will only need Node.js and a node package manager, npm, installed in your environement.

#### Node installation on Ubuntu

You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install npm
      $ sudo apt install nodejs

## Tools

Platform: NodeJs
Framework: ExpressJs
ORM: Mongoose
Database: MongoDB

## Guidelines

On Trello, create a chore for setting up a database.
On Trello create user stories for setting up and testing API endpoints that do the following using database:
Validate Login and contact Forms.
View a list of their articles
View a list of all queries/questions
Store all queries/questions
Create a new article
Update an existing article
Delete an existing article
Update their profile information
On Trello, create a story(s) for the implementation of token-based authentication using JSON web token (JWT) and the security of all routes using JSON web token.
On Trello, create stories to capture any other tasks not captured above. The tasks could be a feature, bug or chore for this module.
On Trello, create user story to implement this optional feature:
Authenticate user using with social media platforms using passport
Allow only authenticated users in to comment on articles
NB: Executing the above optional feature after completing the required features means you have exceeded expectations.:

Write tests for the endpoints specified below.
Test all endpoints with Postman.
Use API Blueprint, Slate, Apiary or Swagger to document your API. Docs should be accessible via your application’s URL.
Ensure the app gets hosted on Heroku.
