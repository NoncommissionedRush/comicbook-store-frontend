import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Cart } from "../../@types";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Main } from "../components/Main";
import { Navbar } from "../components/Navbar";

type CartProps = {};

const CartComponent: React.FC<CartProps> = ({}) => {
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

  async function submitCart() {
    const reservationItems = cart.items.map((i) => {
      return { bookId: i.book.id, amount: i.amount };
    });
    await axios.post(
      "http://localhost:5000/reservations",
      { items: reservationItems, note: "coming from the front end" },
      { withCredentials: true }
    );
    await axios.delete("http://localhost:5000/cart", { withCredentials: true });
    setCart({ items: [], size: 0, total: 0 });
  }

  return (
    <Fragment>
      <Navbar />
      <Container alignItems={"start"}>
        <Heading my={10}>Cart</Heading>
        <Main>
          {cart.items.length ? (
            cart.items.map((item, index) => {
              return (
                <Card book={item.book} key={index} showEditButton={false} />
              );
            })
          ) : (
            <p>Empty :(</p>
          )}
        </Main>
        <Flex>
          <Button
            mt={10}
            disabled={cart.items.length ? false : true}
            colorScheme="teal"
            size="lg"
            onClick={submitCart}
          >
            Checkout
          </Button>
          <Heading m={10}>Total: {cart.total} EUR</Heading>
        </Flex>
      </Container>
      <DarkModeSwitch />
    </Fragment>
  );
};

export default CartComponent;
