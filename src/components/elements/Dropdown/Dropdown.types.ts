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
  } &
  ({
    type?: "SINGLE";
    onChange?: (props: string | number) => void;
    renderSelected?: (props: TOption) => ReactElement | string;
    renderOption?: (props: TOption) => ReactElement | string;
  } |
  {
    type?: "MULTIPLE";
    onChange?: (props: (string | number)[]) => void;
    renderSelected?: (props: string) => ReactElement | string;
    renderOption?: (props: TOption) => ReactElement | string;
  })

export type StringArray = {
  [index: string]: string;
}