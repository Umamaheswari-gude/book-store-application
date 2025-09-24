export type Book = {
  description: string;
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
  firstName: string;
  lastName: string;
}