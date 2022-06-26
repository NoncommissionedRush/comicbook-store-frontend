import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  SimpleGrid,
  chakra,
  Button,
  ButtonGroup,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Reservation } from "../../@types";
import { Url } from "../helpers/url";

interface ReservationsTableRowProps {
  reservation: Reservation;
}

export const ReservationsTableRow: React.FC<ReservationsTableRowProps> = ({
  reservation,
}) => {
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");

  const processReservation = async () => {
    await Url.put(`${Url.RESERVATIONS}/${reservation.id}`);
    window.location.reload();
  };

  const deleteReservation = async () => {
    await Url.delete(`${Url.RESERVATIONS}/${reservation.id}`);
    window.location.reload();
  };

  return (
    <Flex
      direction={{
        base: "row",
        md: "column",
      }}
      bg={bg}
    >
      <SimpleGrid
        spacingY={3}
        columns={{
          base: 1,
          md: 4,
        }}
        w={{
          base: 120,
          md: "full",
        }}
        textTransform="uppercase"
        bg={bg2}
        color={"gray.500"}
        py={{
          base: 1,
          md: 4,
        }}
        px={{
          base: 2,
          md: 10,
        }}
        fontSize="md"
        fontWeight="hairline"
      >
        <span>ID</span>
        <span>Created</span>
        <span>Details</span>
        <chakra.span
          textAlign={{
            md: "right",
          }}
        >
          Actions
        </chakra.span>
      </SimpleGrid>
      <SimpleGrid
        spacingY={3}
        columns={{
          base: 1,
          md: 4,
        }}
        w="full"
        py={2}
        px={10}
        fontWeight="hairline"
      >
        <span>{reservation.id}</span>
        <chakra.span
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          Date Here
        </chakra.span>
        <Flex>
          <Button
            as={"a"}
            href={`/reservation/${reservation.id}`}
            size="sm"
            variant="solid"
            colorScheme="purple"
          >
            View Details
          </Button>
        </Flex>
        <Flex
          justify={{
            md: "end",
          }}
        >
          <ButtonGroup variant="solid" size="sm" spacing={3}>
            <IconButton
              colorScheme="green"
              icon={<CheckIcon />}
              aria-label="Process"
              onClick={processReservation}
            />
            <IconButton
              colorScheme="red"
              variant="outline"
              icon={<DeleteIcon />}
              aria-label="Delete"
              onClick={deleteReservation}
            />
          </ButtonGroup>
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};
