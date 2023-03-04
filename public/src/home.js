function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedBooks = 0;
  books.forEach(book => {
    if (!book.borrows[0].returned) {borrowedBooks++};
  });
  return borrowedBooks;
}

// Helper function using .sort() and .slice() to help organize the genres array by number of book present
function _sortFirstFive(arr, stopper = 5) {
  const newArr = [...arr];
  return newArr.sort(({count: count1}, {count: count2}) => count2 - count1).slice(0, stopper);
}

function getMostCommonGenres(books) {
  return _sortFirstFive(books.reduce((genres, book) => {
        const matchingGenre = genres.find((genre) => genre.name === book.genre);
        !matchingGenre ? genres.push({name: book.genre, count: 1}) : matchingGenre.count++;
        return genres;
      }, [])
  );
}

// Helper Function to sort the arrays into the top 5
function sortTopFive(array) {
  let popularBooks = array.sort((countA, countB) => (countA.count < countB.count ? 1 : -1)).slice(0, 5);
  return popularBooks;
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  const borrows = books.reduce((acc, book) => {
    popularBooks.push({name: book.title, count: book.borrows.length})
  })
  return sortTopFive(popularBooks)
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = [];
  for (let author of authors) {
    const authorName = `${author.name.first} ${author.name.last}`;
    let count = 0;
    for (let book of books) {
      if (author.id === book.authorId) {
        count += book.borrows.length;
      }
    }
    const authorObject = {name: authorName, count: count};
    popularAuthors.push(authorObject);
  }

  return sortTopFive(popularAuthors);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
