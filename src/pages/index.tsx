import { Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import { GetStaticProps } from "next";
import { Fragment, useEffect, useState } from "react";
import { Book, Cart } from "../../@types";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { Navbar } from "../components/Navbar";

const Index = ({ books }: { books: Book[] }) => {
  const [cart, setCart] = useState<Cart>({ items: [], size: 0, total: 0 });
  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    const { data }: { data: Cart } = await axios.get(
      "http://localhost:5000/cart",
      {
        withCredentials: true,
      }
    );
    setCart(data);
  }

  async function updateCart(bookId: number) {
    const { data } = await axios.post(
      "http://localhost:5000/cart",
      { bookId: bookId, amount: 1 },
      { withCredentials: true }
    );
    setCart(data);
  }
  return (
    <Fragment>
      <Navbar cart={cart} />
      <Container>
        <Hero />
        <Main>
          {books.map((item, index) => {
            return <Card book={item} key={index} updateCart={updateCart} />;
          })}
        </Main>
      </Container>
      <DarkModeSwitch />
    </Fragment>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:5000/books");
  const books = await res.json();
  return {
    props: {
      books,
    },
  };
};
