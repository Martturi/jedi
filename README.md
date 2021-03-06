# CV_master
[![Build Status](https://travis-ci.org/Martturi/cv_master.svg?branch=master)](https://travis-ci.org/Martturi/cv_master)

CV management system

Master branch auto-deploys to <a href="http://cv-master.herokuapp.com">cv-master.herokuapp.com</a>

##  Heroku setup

This creates a new Heroku app, adds a database, initializes it, and pushes the app to the repo.
You need to have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed.


```Shell
heroku create
heroku addons:create heroku-postgresql:hobby-dev -a {app name}
heroku git:remote -a {app name}
cat SQL_table_creation.sql | heroku pg:psql -a {app name}
git push heroku
```
The last command prints the url for the deployment.


### Config variables for heroku deployment

  Needed for authentication, gotten from the [Google Dev Console](console.developers.google.com). The server looks for `AUTH_ID`, and does not use authentication if it doesn’t exist.
```
AUTH_ID:  
AUTH_SECRET:  
```

The URL for the application, where the app redirects after login.  
`CLIENT_URL: https://cv-master.herokuapp.com `

What email domains are allowed to login.  
`ALLOWED_LOGIN_DOMAINS: gmail.com,domain.com`

Optional. If disabled does not update the pdf from the repository. Defaults to 1 if not present.  
`UPDATE_PDF_FROM_FS: 0 `

## Updating the template

By default the template-styling for pdf-generation is loaded to the database on dyno startup, according to the files in `/server/pdf/`. You can opt to disable this and update templates to the database manually by setting an env flag `UPDATE_PDF_FROM_FS: 0`.

## Running the app locally

To run the app locally you need npm and node installed. You also need a PostgreSQL running with a user called `postges` configured with priviledges.

```Shell
git clone https://github.com/Martturi/cv_master.git
cd cv_master
npm install
./init_db.sh
npm run watch
```

### Config variables locally

The app uses a `.env` -file, which can be configured with optional environment variables.
Example:
```JSON
AUTH_ID=
AUTH_SECRET=
ALLOWED_LOGIN_DOMAINS=gmail.com,domain.fi
```


## Running tests

There are some API tests for the server. Make sure to have a database running when you run them.

```Shell
./init_db.sh
npm install
npm run test
```

## Interesting notes

PDF Generation is implemented with [html-pdf](https://www.npmjs.com/package/html-pdf). The PDF does not render custom fonts in the header and the footer, so generic fonts are used in them. The generated PDF also looks different depending on the OS it's generated on. Also e.g. [issue nr. 247](https://github.com/Martturi/cv_master/issues/247) is because of this library.

The application was never designed to be responsive, and is therefore not usable on small screens. 
