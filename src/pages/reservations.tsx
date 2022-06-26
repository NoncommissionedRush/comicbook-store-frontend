import axios from "axios";
import { NextPage } from "next";
import { Fragment } from "react";
import { Reservation } from "../../@types";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import ReservationsTable from "../components/ReservationsTable";
import { Url } from "../helpers/url";

const Reservations: NextPage<{ reservations: Reservation[] }> = ({
  reservations,
}) => {
  return (
    <Fragment>
      <Navbar />
      <Container>
        <Hero title="Reservations" />
        <ReservationsTable reservations={reservations} />
      </Container>
      <DarkModeSwitch />
    </Fragment>
  );
};

Reservations.getInitialProps = async ({ req, res }) => {
  let reservations: Reservation[] = [];
  try {
    const { data } = await axios.get(Url.PENDING_RESERVATIONS, {
      headers: {
        cookie: req.headers.cookie,
      },
    });
    reservations = data;
  } catch (error) {
    if (res) {
      res.writeHead(307, { Location: "/login" });
      res.end();
    }
  }

  return {
    reservations,
  };
};

export default Reservations;
