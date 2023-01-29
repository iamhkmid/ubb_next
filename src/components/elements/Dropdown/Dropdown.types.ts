import { ReactElement } from "react";

export type TOption = ({ label?: string; value: string; disabled?: boolean; } & { [index: string]: string; })

export type DropdownProps =
  {
    label?: string;
    value?: string;
    placeholder?: string;
    className?: string;
    options?: TOption[];
    disabled?: boolean;
    withSearch?: boolean;
    searchKeys?: string[];
    error?: boolean;
    helperText?: string;
    width?: string;
    maxHeight?: string;
    renderSelected?: (props: TOption) => ReactElement | string | number;
    renderOption?: (props: TOption) => ReactElement | string | number;
  } &
  ({
    type?: "SINGLE";
    onChange?: (props: string | number) => void;
  } |
  {
    type?: "MULTIPLE";
    onChange?: (props: (string | number)[]) => void;
  })

export type StringArray = {
  [index: string]: string;
}