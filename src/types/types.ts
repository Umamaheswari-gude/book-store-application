export type Book = {
  id: string;
  bookName: string;
  author: string;
  bookImage: string;
  price: number;
};

export type CartItem = Book & {
    quantity: number;
};

export type Users = {
  email: string;
  password: string;
}