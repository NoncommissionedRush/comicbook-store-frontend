import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/router";
import React, { Fragment } from "react";
import { Container } from "../components/Container";
import { Hero } from "../components/Hero";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";
import { Url } from "../helpers/url";

interface addProps {}

export const Add: React.FC<addProps> = ({}) => {
  return (
    <Fragment>
      <Navbar />
      <Container alignItems={"normal"}>
        <Hero title="Add New" />
        <Formik
          initialValues={{ title: "", amount: 0, price: 0, tags: [] }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            const data = Url.post(Url.BOOKS, values);
            actions.setSubmitting(false);
            if (data) {
              router.push("/");
            }
          }}
        >
          {() => (
            <Form>
              <InputField name="title" label="Title" placeholder="Title" />
              <InputField
                name="amount"
                label="amount"
                placeholder="Amount"
                type="number"
              />
              <InputField
                name="price"
                label="price"
                placeholder="Price"
                type="number"
              />
              <Button
                alignSelf={"start"}
                mt={5}
                colorScheme={"teal"}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Fragment>
  );
};

export default Add;
