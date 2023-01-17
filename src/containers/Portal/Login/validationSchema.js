import * as yup from "yup";

export const validationSchema = yup.object({
  username: yup.string(),
  password: yup.string(),
});
export const defaultValues = {
  username: undefined,
  password: undefined,
};