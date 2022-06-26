import { Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Reservation } from "../../@types";
import { ReservationsTableRow } from "./ReservationsTableRow";

interface ReservationsTableProps {
  reservations: Reservation[];
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservations,
}) => {
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Stack
        direction={{
          base: "column",
        }}
        w="full"
        bg={{
          md: bg,
        }}
        shadow="lg"
      >
        {reservations.map((reservation, tid) => {
          return <ReservationsTableRow reservation={reservation} key={tid} />;
        })}
      </Stack>
    </Flex>
  );
};

export default ReservationsTable;
