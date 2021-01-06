function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  return books.reduce((sum, book) => {
    if (!book.borrows[0].returned) sum++;
    return sum;
  }, 0);
}

// HELPER FUNCTION:

function sortAndTrimArray(array) {
  const result = array.sort((objectA, objectB) => objectA.count < objectB.count ? 1 : -1);
  return result.slice(0,5);
}

function getMostCommonGenres(books) {
  const result = books.reduce((sumArr, book) => {
    if (sumArr.some((genreObject) => genreObject.name === book.genre)) {
      const selected = sumArr.find((genreObject) => genreObject.name === book.genre);
      selected.count++;
    } else {
      const name = book.genre;
      const count = 1;
      sumArr.push({name, count});
    }
    return sumArr;
  }, []);
  return sortAndTrimArray(result);
}

function getMostPopularBooks(books) {
  const result = books.map((book) => {
    const name = book.title;
    const count = book.borrows.length;
    return {name, count};
  });
  return sortAndTrimArray(result);
}

function getMostPopularAuthors(books, authors) {
  const result = authors.map((author) => {
    const { name: { first, last } } = author;
    const name = `${first} ${last}`;
    const count = books.reduce((sum, book) => {
      if (book.authorId === author.id) sum += book.borrows.length;
      return sum;
    }, 0);
    return {name, count};
  });
  return sortAndTrimArray(result);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
