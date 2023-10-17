import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const _getHeader = (config?: AxiosRequestConfig | undefined) => {
  if (typeof window === "undefined")
    return {
      ...(config && config),
    };
  return {
    ...(config && config),
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  };
};

export const get = <T = any>(
  url: string,
  config?: AxiosRequestConfig | undefined,
): Promise<AxiosResponse<T>> => {
  const options = _getHeader(config);
  return axios.get(url, options);
};

export const post = <T = any>(
  url: string,
  data: any,
  options?: any,
): Promise<AxiosResponse<T>> => {
  const baseHeaders = _getHeader()["headers"];
  const extraHeaders = options?.["headers"] ?? {};
  const headers = { ...baseHeaders, ...extraHeaders };
  return axios.post(url, data, { ...options, headers });
};

export const deleteCall = <T = any>(url: string, data?: any) => {
  const options = _getHeader();
  return axios.delete<T>(url, { ...options, data });
};

export const patch = <T = any>(url: string, data: any) => {
  const options = _getHeader();
  return axios.patch<T>(url, data, options);
};
