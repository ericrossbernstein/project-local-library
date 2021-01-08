const { findAuthorById } = require("./books.js");

function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  return books.filter((book) => !book.borrows[0].returned).length;
}

// A very generic helper function to count a specific key
// across a list of books. The "whatToCount" function takes
// a book argument and should return a number.
function countSomething(books, key, whatToCount) {
  return books.reduce((counts, book) => {
    if (!counts.hasOwnProperty(book[key])) {
      counts[book[key]] = 0;
    }
    counts[book[key]] += whatToCount(book);
    return counts;
  }, {});
}

// Transforms { "Key": 1 } to [{ "name": "Key", "count": 1 }]
// Limits to the top five highest counts by default.
function getFormattedCountList(counts, limit = 5) {
  const keysWithHighestCounts = Object.keys(counts)
    .sort((keyA, keyB) => (counts[keyA] < counts[keyB] ? 1 : -1))
    .slice(0, limit);

  return keysWithHighestCounts.map((name) => ({
    name,
    count: counts[name],
  }));
}

function getMostCommonGenres(books) {
  // First, count number of books per each genre
  const numberOfBooksPerGenre = countSomething(
    books,
    "genre",
    // This part's kind of weird. Since we just want to increment by one for each book, we have
    // an empty function that always returns 1.
    () => 1
  );
  return getFormattedCountList(numberOfBooksPerGenre);
}

function getMostPopularBooks(books) {
  const numberOfBorrowsPerBook = countSomething(
    books,
    "title",
    (book) => book.borrows.length
  );
  return getFormattedCountList(numberOfBorrowsPerBook);
}

function fullAuthorName(author) {
  const {
    name: { first, last },
  } = author;
  return `${first} ${last}`;
}

function getMostPopularAuthors(books, authors) {
  // First, sum the borrows per author across all books
  const borrowsPerAuthor = countSomething(
    books,
    "authorId",
    (book) => book.borrows.length
  );

  return getFormattedCountList(borrowsPerAuthor).map((item) => ({
    ...item,
    // Overwrite the name from the author id to the full author name.
    // Order matters here - it must be after the spread operator.
    name: fullAuthorName(findAuthorById(authors, item.name)),
  }));
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
