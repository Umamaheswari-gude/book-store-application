import { useEffect, useState } from "react";
import { Book } from "../types/types";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log("Fetching books from API:", process.env.REACT_APP_API_URL);
        const response = await fetch (`${process.env.REACT_APP_API_URL}`);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };
    fetchBooks();
  }, []);

  return books;
};

