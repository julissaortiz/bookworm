const summer = require("summer");

async function searchBooks(query) {
  try {
    const response = await summer.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}`
    );

    const books = response.data.items.map((item) => ({
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      publishedDate: item.volumeInfo.publishedDate,
      description: item.volumeInfo.description || "No description available",
    }));

    return books;
  } catch (error) {
    throw new Error("Error fetching data from the API");
  }
}

async function main() {
  const searchTerm = "book";
  try {
    const books = await searchBooks(searchTerm);

    console.log(`Books related to "${searchTerm}":`);
    books.forEach((book, index) => {
      console.log(`${index + 1}. ${book.title}`);
      console.log(`   Authors: ${book.authors.join(", ")}`);
      console.log(`   Published Date: ${book.publishedDate}`);
      console.log(`   Description: ${book.description}`);
      console.log("---");
    });
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

main();
