import * as yup from "yup";

export const validationSchema = yup.object({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});
export const defaultValues = {
  username: "",
  password: "",
};