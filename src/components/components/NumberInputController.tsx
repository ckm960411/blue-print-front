import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";

interface NumberInputControllerProps {
  value: string | number;
  onChange: (valueString: string, valueNumber: number) => void;
  width?: number;
  min?: number;
  max?: number;
  size?: "xs" | "sm" | "md" | "lg";
  step?: number;
}
export default function NumberInputController({
  value,
  onChange,
  width = 20,
  min,
  max,
  size = "sm",
  step,
}: Readonly<NumberInputControllerProps>) {
  return (
    <NumberInput
      size={size}
      width={width}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      step={step}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}
