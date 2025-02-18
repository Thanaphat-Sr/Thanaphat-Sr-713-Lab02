// filepath: /C:/Users/ASUS/Thanaphat-Sr-713-Lab02/src/models/Book.ts
export interface Book {
    fileUrl: string;
    id: number;
    title: string;
    author: string;
    publishedDate: string;
    imageUrl?: string; // Add optional imageUrl property
}