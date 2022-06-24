import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Cart } from "../../@types";
import { NavLink } from "./NavLink";

interface NavbarProps {
  cart?: Cart;
}

export const Navbar: React.FC<NavbarProps> = ({ cart }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const { data } = await axios.get("http://localhost:5000/users/me", {
      withCredentials: true,
    });

    if (data) {
      setIsLoggedIn(true);
    }
  };

  return (
    <Box position={"fixed"} top={0} width={"100%"} zIndex={2}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        px={5}
      >
        <Button as={"a"} variant={"link"} href={"/cart"} position={"relative"}>
          <Icon w={8} h={8} as={ShoppingCartIcon} position={"relative"} />
          {cart?.items.length > 0 && (
            <Badge
              colorScheme={"green"}
              variant={"solid"}
              position={"absolute"}
            >
              {cart.size}
            </Badge>
          )}
        </Button>
        <Flex>
          <NavLink text="Home" href="/" />
          {isLoggedIn ? (
            <Fragment>
              <NavLink text="Reservations" href="/reservations" />
              <NavLink text="Add" href="/add" />
              <NavLink text="Logout" href="/" type="logout" />
            </Fragment>
          ) : (
            <NavLink text="Login" href="/login" />
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
