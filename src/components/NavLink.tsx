import { Link, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Url } from "../helpers/url";

interface NavLinkProps {
  text: string;
  href: string;
  type?: "link" | "logout";
}

export const NavLink: React.FC<NavLinkProps> = ({
  text,
  href,
  type = "link",
}) => {
  const router = useRouter();

  const logout = async () => {
    await Url.delete(Url.LOGOUT);
    router.reload();
  };
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={type === "link" ? href : undefined}
      onClick={type === "logout" ? logout : undefined}
    >
      {text}
    </Link>
  );
};
