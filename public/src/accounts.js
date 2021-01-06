function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => (accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1));
  return accounts;
}

function numberOfBorrows(account, books) {
  return books.reduce((sum, book) => {
    const result = book.borrows.reduce((borrowSum, borrow) => {
      if (borrow.id === account.id) borrowSum++;
      return borrowSum;
    }, 0);
    return sum += result;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const result = books.filter((book) => {
    let borrower = book.borrows[0];
    if ((borrower.id === account.id) && !borrower.returned) {
      return book;
    }
  });
  return result.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {...book, author};
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
