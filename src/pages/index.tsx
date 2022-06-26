import { GetStaticProps } from "next";
import { Fragment } from "react";
import { Book } from "../../@types";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import { Main } from "../components/Main";
import { Navbar } from "../components/Navbar";
import { useAuthContext } from "../context/auth";
import { Url } from "../helpers/url";

const Index = ({ books }: { books: Book[] }) => {
  const [isLoggedIn] = useAuthContext();

  return (
    <Fragment>
      <Navbar />
      <Container>
        <Hero />
        <Main>
          {books.map((item, index) => {
            return <Card book={item} key={index} showEditButton={isLoggedIn} />;
          })}
        </Main>
      </Container>
      <DarkModeSwitch />
    </Fragment>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const books = await Url.get(Url.BOOKS);
  return {
    props: {
      books,
    },
  };
};
