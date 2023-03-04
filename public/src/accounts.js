function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => 
  accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1)
}

// Helper Function for getTotalNumberOfBorrows
function borrowsById (book, {id}) {
  return book.borrows.filter(borrow => borrow.id === id);
}

function getTotalNumberOfBorrows(account, books) {
  let count = 0;
  books.forEach(book => {
    const borrowedById = borrowsById(book, account);
    count += borrowedById.length;
  });
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  //filter through each book in books
  return (
    books.filter(
        (book) => book.borrows[0].id === account.id && !book.borrows[0].returned
      ).map((book) => {
        book["author"] = authors.find((author) => author.id === book.authorId);
        return book;
      })
  );
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};