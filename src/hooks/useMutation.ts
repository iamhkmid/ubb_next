import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const initHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Authorization": typeof window === "undefined" ? null : sessionStorage?.getItem("token")
};

type TMutationProps = {
  url: string;
  method: "POST" | "PUT" | "DELETE" | "GET" | "PATCH";
  skip?: boolean;
  headers?: { [name: string]: string | boolean | null };
  body?: { [name: string]: string };
}

const useMutation = <TResponse>({ url, method, body: customBody = {}, headers: customHeaders = {}, skip }: TMutationProps) => {
  const [data, setData] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState(null);
  const [headers, setHeaders] = useState(customHeaders);
  const [body, setBody] = useState({});
  const [startMutation, setStartMutation] = useState(false);
  const [loading, setLoading] = useState(false);
  const Router = useRouter()

  const mutation = ({ body: refetchBody = body, headers: refetchHeaders = {} } = {}) => {
    setBody(refetchBody)
    setHeaders({ ...initHeaders, ...refetchHeaders })
    setStartMutation(true)
  };

  useEffect(() => {
    let unmount = false;
    const source = axios.CancelToken.source();

    const request = async () => {
      try {
        if (!unmount) setLoading(true);
        const res = await axios.request({
          url,
          method,
          headers: { ...initHeaders, ...headers },
          data: { ...customBody, ...body },
          cancelToken: source.token,
        });
        if (!unmount) setData(res.data);
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          sessionStorage.removeItem("token")
          Router.replace("/portal/login")
        }
        if (!unmount) setError(err);
      } finally {
        if (!unmount) {
          setLoading(false)
          setStartMutation(false)
        }
        if (!unmount && !isDirty) setIsDirty(true);
      }
    };
    if (!skip && startMutation) {
      setError(null);
      setData(null);
      request();
    };
    return () => {
      unmount = true;
      source.cancel(`cancel req ${url}`);
    };
  }, [skip, body, headers]);

  return { data: data as TResponse, error, loading, mutation };
};

export default useMutation