import { Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";

interface loginProps {}

const login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  return (
    <Fragment>
      <Navbar />
      <Container alignItems={"normal"}>
        <Heading mb={10}>Login</Heading>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            const { data } = await axios.post(
              "http://localhost:5000/users/auth/login",
              values,
              {
                withCredentials: true,
              }
            );
            actions.setSubmitting(false);
            if (data) {
              router.push("/");
            }
          }}
        >
          {() => (
            <Form>
              <InputField
                name="username"
                label="Username"
                placeholder="Username"
              />
              <InputField
                name="password"
                label="password"
                placeholder="Password"
                type="password"
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

export default login;
