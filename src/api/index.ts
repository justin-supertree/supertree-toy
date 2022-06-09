import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import errorCodeList from 'data/responseStatus.json';

import { ResponseError } from './error';

const baseURL = process.env.NEXT_PUBLIC_API_HOST;

export const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('PDMP_AUTH_TOKEN');
  const network = sessionStorage.getItem('PDMP_NETWORK');
  const nextConfig: AxiosRequestConfig = config;

  if (token) {
    nextConfig.headers = {
      ...nextConfig.headers,
      token,
    };
  }

  if (network && !nextConfig.headers?.network) {
    nextConfig.headers = {
      ...nextConfig.headers,
      network,
    };
  }

  return nextConfig;
});

api.interceptors.response.use(
  (response) => {
    return setAxiosResponseInterceptorResponse(response);
  },
  (error) => {
    setAxiosResponseInterceptorError(
      error.response.status as number,
      error.message as string,
    );
  },
);

export const setAxiosResponseInterceptorError = (
  status: number,
  message: string,
) => {
  const responseError = new ResponseError();
  const errorCode = errorCodeList.find((item) => item.status === status);

  if (errorCode) {
    responseError.status = errorCode.status;
    responseError.message = errorCode.message;
  } else {
    responseError.status = status;
    responseError.message = message;
  }

  throw responseError;
};

const setAxiosResponseInterceptorResponse = (response: AxiosResponse) => {
  const { status, data } = response;

  const errorCode = errorCodeList.find((item) => item.status === status);
  const message = errorCode ? errorCode.message : 'unknown error';

  return {
    status: response.status,
    message,
    data: data?.data || null,
  };
};

export default api;
