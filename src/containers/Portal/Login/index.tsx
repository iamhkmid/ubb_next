import React, { useEffect } from "react"
import styled from "styled-components"
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";
import Button from "../../../components/elements/Button"
import InputText from "../../../components/elements/Input/Input"
import { defaultValues, validationSchema } from "./validationSchema";
import crypto from "crypto"
import Router from "next/router"
import LoadingWrapper from "../../../components/Loading/LoadingWrapper";
import { Fade } from "@mui/material";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../graphql/auth.graphql";

const Login: React.FC = () => {
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY as string

  const encryptRSA = (text: string) => {
    const encrypted = crypto.publicEncrypt(
      {
        key: PUBLIC_KEY,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(text, "utf8")
    );
    return encrypted.toString("base64");
  }

  useEffect(() => {
    sessionStorage.removeItem("token")
  }, [])

  type TLoginMutaion = {
    login: {
      message: string;
      user: { fullName: string; role: string; username: string };
    }
  }


  const [login, { data, error, loading}] = useMutation<TLoginMutaion>(LOGIN, {
    errorPolicy: "all",
    fetchPolicy: 'network-only'
  })

  console.log({ data, error })

  // React.useEffect(() => {
  //   if (data?.login?.user) {
  //     sessionStorage.setItem("token", data?.token)
  //     Router.push("/portal")
  //   }
  // }, [data])

  const { handleSubmit, watch, control, formState, setValue } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues
  });

  const { isValid } = formState;

  const onSubmit = async (values: any) => {
    console.log({ pass: encryptRSA(values.password) })
    try {
      await login({
        variables: {
          username: values.username,
          password: encryptRSA(values.password)
        }
      });
    } catch (error) { }
  }

  return (
    <Fade in>
      <Main>
        <LoadingWrapper open={loading} />
        <div>
          <p className="title">LOGIN</p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrapper">
              <Controller
                name="username"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputText
                    type="text"
                    width="100%"
                    label="Username"
                    placeholder="Masukan username anda"
                    value={value}
                    autoComplete="off"
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputText
                    type="password"
                    width="100%"
                    label="Password"
                    placeholder="Masukan password anda"
                    value={value}
                    autoComplete="off"
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </div>
            <div className="button-wrapper">
              <Button label="Login" variant="contained" type="submit" disabled={!isValid} />
            </div>
          </Form>
        </div>
      </Main>
    </Fade>
  )
}

export default Login

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors?.primary?.dark};
  > div {
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    padding: 40px;
    padding-bottom: 30px;
    gap: 40px;
    background: white;
    >p.title {
      font-size: 30px;
      font-weight: 600;
      margin: 0;
      line-height: 1;
      color: ${({ theme }) => theme.colors?.text?.dark};
    }
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 10px;
  gap: 20px;
  > div.input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  > div.button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
`