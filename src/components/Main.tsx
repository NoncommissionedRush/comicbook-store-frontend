import { SimpleGrid, StackProps } from "@chakra-ui/react";

export const Main = (props: StackProps) => (
  <SimpleGrid columns={3} spacing={20} {...props} />
);
