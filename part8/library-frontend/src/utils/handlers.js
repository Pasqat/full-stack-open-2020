export const genresList = (allBooks) => {

  // Generate the array of genres without duplicates
  let jointArray = []
  const booksArray = allBooks.map(book => book.genres)
  booksArray.forEach(array => {
    jointArray = [...jointArray, ...array]
  })
  const genresList = [...new Set([...jointArray])]

  return genresList
}
