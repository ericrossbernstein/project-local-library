const { findAuthorById } = require("./books.js");

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
}

function numberOfBorrows(account, books) {
  return books.reduce((sum, book) => {
    return (
      sum + book.borrows.filter((borrow) => borrow.id === account.id).length
    );
  }, 0);
}

function isCurrentlyBorrowedByAccount(book, account) {
  const currentBorrower = book.borrows[0];
  return currentBorrower.id === account.id && !currentBorrower.returned;
}

function getBooksPossessedByAccount(account, books, authors) {
  return books
    .filter((book) => isCurrentlyBorrowedByAccount(book, account))
    .map((book) => {
      return {
        ...book,
        // Also want to include author information for this book
        author: findAuthorById(authors, book.authorId),
      };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
