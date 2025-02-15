export interface Book {
    id: number;
    title: string;
    author: string;
    publishedDate: string;
}

const books: Book[] = [
    {
        id: 1,
        title: "Book One",
        author: "Author One",
        publishedDate: "2021-01-01"
    },
    {
        id: 2,
        title: "Book Two",
        author: "Author Two",
        publishedDate: "2021-02-01"
    },
    {
        id: 3,
        title: "Book Three",
        author: "Author Three",
        publishedDate: "2021-03-01"
    }
];

export function getBookByTitle(title: string): Book[] {
    const filteredBooks = books.filter((book) => book.title.toLowerCase().startsWith(title.toLowerCase()));
    return filteredBooks;
}

export function getAllBooks(): Book[] {
    return books;
}

export function getBookById(id: number): Book | undefined {
    return books.find((book) => book.id === id);
}

export function addOrUpdateBook(newBook: Book): { message: string, book: Book } {
    const existingBookIndex = books.findIndex((book) => book.id === newBook.id);

    if (existingBookIndex !== -1) {
        // Update existing book
        books[existingBookIndex] = newBook;
        return { message: "Book updated", book: newBook };
    } else {
        // Add new book
        newBook.id = books.length + 1;
        books.push(newBook);
        return { message: "Book added", book: newBook };
    }
}