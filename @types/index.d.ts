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

export type ReservationItem = {
  bookId: number;
  amount: number;
};

export type Reservation = {
  id: string;
  status: string;
  note: string;
  items: ReservationItem[];
};
