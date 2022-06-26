import { Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Reservation } from "../../../@types";
import { Container } from "../../components/Container";
import { Navbar } from "../../components/Navbar";
import { Url } from "../../helpers/url";

const Reservation: NextPage<{ reservation?: Reservation }> = ({
  reservation,
}) => {
  const router = useRouter();

  const processReservation = async () => {
    await Url.put(`${Url.RESERVATIONS}/${reservation.id}`);
    router.push(`/reservations`);
  };

  const deleteReservation = async () => {
    await Url.delete(`${Url.RESERVATIONS}/${reservation.id}`);
    router.push(`/reservations`);
  };

  return (
    <Fragment>
      <Navbar />
      <Container>
        <h1>Reservation {reservation.id}</h1>
        <p>Note: {reservation.note}</p>
        <ul>
          {reservation.items.map((item, index) => (
            <li key={index}>
              Book ID: {item.bookId}, Amount: {item.amount}
            </li>
          ))}
        </ul>

        <Flex mt={10}>
          <Button bgColor={"teal"} mr={2} onClick={processReservation}>
            Process
          </Button>
          <Button bgColor={"red.500"} onClick={deleteReservation}>
            Delete
          </Button>
        </Flex>
      </Container>
    </Fragment>
  );
};

Reservation.getInitialProps = async ({ query, req, res }) => {
  let reservation: Reservation;
  try {
    const { data } = await axios.get(`${Url.RESERVATIONS}/${query.id}`, {
      headers: {
        cookie: req.headers.cookie,
      },
    });
    reservation = data;
  } catch (error) {
    res.writeHead(307, { Location: "/login" });
    res.end();
  }
  return {
    reservation,
  };
};

export default Reservation;
