import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <Field name={props.name}>
      {({ field }) => {
        return (
          <FormControl>
            <FormLabel>{props.label}</FormLabel>
            <Input {...field} {...props} />
          </FormControl>
        );
      }}
    </Field>
  );
};
