function findAuthorById(authors, id) {
  return authors.find((author) => author.id == id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter((book) => !book.borrows[0].returned);
  const returnedBooks = books.filter((book) => book.borrows[0].returned);
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  // Only return first 10 borrowers per book
  const firstTenBorrowers = book.borrows.slice(0, 10);
  const result = firstTenBorrowers.map((borrower) => {
    const matchingAccount = accounts.find(
      (account) => account.id === borrower.id
    );
    return { ...borrower, ...matchingAccount };
  });
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
