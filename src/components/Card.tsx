import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { Badge, Box, Link } from "@chakra-ui/react";
import { useState } from "react";
import { Book } from "../../@types";

type CardProps = {
  book: Book;
  updateCart?: (bookId: number) => void;
};

export const Card: React.FC<CardProps> = ({ book, updateCart }) => {
  const [added, setAdded] = useState(false);

  return (
    <Box
      position={"relative"}
      zIndex={1}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Box p="6">
        {new Date(book.createdAt).getDate() - new Date().getDate() < 7 && (
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
          </Box>
        )}

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          <Link href={"#"}>{book.title}</Link>
        </Box>

        {added ? (
          <CheckIcon position={"absolute"} bottom={3} right={3} />
        ) : (
          <AddIcon
            position={"absolute"}
            bottom={3}
            right={3}
            onClick={() => {
              updateCart(book.id);
              setAdded(true);
              setTimeout(() => {
                setAdded(false);
              }, 2000);
            }}
            _hover={{ cursor: "pointer", color: "teal.500" }}
          />
        )}

        <Box>
          {book.price}
          <Box as="span" color="gray.600" fontSize="sm">
            EUR
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
