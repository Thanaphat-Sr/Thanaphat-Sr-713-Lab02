import type { Book } from "../models/Book";
import * as repo from "../repository/BookRepositoryDb";

export function getBookByTitle(title: string): Promise<Book[]> {
  return repo.getBookByTitle(title);
}

export function getAllBooks(): Promise<Book[]> {
  return repo.getAllBooks();
}

export function getBookById(id: number): Promise<Book | undefined> {
  return repo.getBookById(id);
}

export function addOrUpdateBook(newBook: Book, file: Express.Multer.File | undefined): Promise<{ message: string, book: Book }> {
  return repo.addOrUpdateBook(newBook);
}
