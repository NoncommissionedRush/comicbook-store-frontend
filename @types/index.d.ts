export type CartItem = {
  book: Book;
  amount: number;
};

export type Cart = {
  items: CartItem[];
  size: number;
  total: number;
};

export type Book = {
  id: number;
  title: string;
  amount: number;
  price: number;
  createdAt: Date;
  tags: string[];
};
