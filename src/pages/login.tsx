import { Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";
import { useAuthContext } from "../context/auth";
import { Url } from "../helpers/url";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [isLoggedIn] = useAuthContext();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    isLoggedIn && router.push("/");
  };

  return (
    <Fragment>
      <Navbar />
      <Container alignItems={"normal"}>
        <Heading mb={10}>Login</Heading>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            const data = Url.post(Url.LOGIN, values);
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

export default Login;
