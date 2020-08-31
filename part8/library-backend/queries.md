# Example queries you can use

## Query
```js
query tutti {
  allBooks {
    title
    published
    genres
    id
    author {
      name
    }
  }
}

query tuttuAut {
  allAuthors {
    name
    born
    bookCount
    id
  }
}

query contaAutori {
  authorCount
}

query conta {
  bookCount
}
```

## Mutations
```js
mutation add {
  addBook(
    title: "Almanacco"
    author: "Doc Brown"
    published: 1986
    genres: ["futurology"]
  ) {
    title
    published
    genres
    id
  }
}

mutation edit {
  editAuthor(name: "notexist", setBornTo: 2007) {
    name
    born
  }
}

mutation createUler {
  createUser(username: "pasqat", favoriteGenres: "hot") {
    username
    id
  }
}

mutation loginWrong {
  login(username: "nonEsisto", password: "secret") {
    value
  }
}

mutation login {
  login(username: "pasqat", password: "secret") {
    value
  }
}
```
