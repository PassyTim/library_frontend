# Library Service app

App for library service. Allow to browse books and authors and take book from library. Admin also can delete and update books and authors.  


## Features

- A page displaying information about a particular book. If the book is available, the user can take it.
- Realized pagination, filtering by genre/author.
- A registration/authentication page.
- A page displaying the list of books. If all books with a given author and title have been borrowed from the library, display that the book is out of stock.
- A page where the user can view the books he has borrowed from the library.
- A page displaying information about a particular author.


# Run locally


Clone the project

```bash
  git clone https://github.com/PassyTim/library_frontend.git
```

Go to the project directory

```bash
  cd library_frontend
```

Make sure you have npm and node.js installed  ( [Install](https://nodejs.org/) )

```bash
  node -v
  npm -v
```

Install dependencies

```bash
  npm install
```
Run react App

```bash
  npm start
```
App will run on 3000 port
