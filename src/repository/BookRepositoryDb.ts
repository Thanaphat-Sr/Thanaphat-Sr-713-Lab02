import type { Book } from "../models/Book";
import connection from "../db";

export async function getBookByTitle(title: string): Promise<Book[]> {
  const [rows] = await connection.execute('SELECT * FROM books WHERE title LIKE ?', [`%${title}%`]);
  return rows as Book[];
}

export async function getAllBooks(): Promise<Book[]> {
  const [rows] = await connection.execute('SELECT * FROM books');
  return rows as Book[];
}

export async function getBookById(id: number): Promise<Book | undefined> {
  const [rows] = await connection.execute('SELECT * FROM books WHERE id = ?', [id]);
  const books = rows as Book[];
  return books.length > 0 ? books[0] : undefined;
}

export async function addOrUpdateBook(newBook: Book): Promise<{ message: string, book: Book }> {
  const { id, title, author, publishedDate } = newBook;
  if (id) {
    await connection.execute(
      'UPDATE books SET title = ?, author = ?, publishedDate = ? WHERE id = ?',
      [title, author, publishedDate, id]
    );
    return { message: "Book updated", book: newBook };
  } else {
    const [result] = await connection.execute(
      'INSERT INTO books (title, author, publishedDate) VALUES (?, ?, ?)',
      [title, author, publishedDate]
    );
    newBook.id = (result as any).insertId;
    return { message: "Book added", book: newBook };
  }
}