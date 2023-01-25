import React from "react";
import rnf from "react-number-format"

export type InputProps =
  {
    label?: string | null;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    width?: string;
    id?: string;
    autoComplete?: string
    error?: boolean;
    helperText?: string;
  }

export type TInputText = {
  type: "text";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export type TInputNumeric = {
  type: "numeric";
  onChange?: (e: rnf.NumberFormatValues | string) => void;
  value?: number | string | undefined;
}

export type TInputPattern = {
  type: "pattern";
  onChange?: (e: rnf.NumberFormatValues) => void;
  value?: number;
  format: string;
}
export type TInputPassword = {
  type: "password";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export type TInputTextArea = {
  type: "textArea";
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
}

export type TOptionCurrency = { value: string; label: string; thousandSeparator: string; decimalSeparator: string; }

export type TInputCurrency = {
  type: "currency";
  onChange?: (e: rnf.NumberFormatValues | undefined) => void;
  value?: number;
}

export type TInput = InputProps & (TInputText | TInputNumeric | TInputPattern | TInputCurrency | TInputPassword | TInputTextArea)