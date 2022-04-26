import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

// line 16 error catching explaination
// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({ label, size: _, ...props }) => {
  const [field, {error, }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};