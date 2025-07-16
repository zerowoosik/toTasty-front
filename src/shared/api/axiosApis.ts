import { headers } from 'next/headers';
import axiosInstance from './axiosInstance';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';

export async function getApi<T>(
  url: string,
  headers: object = {},
  apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL,
): Promise<T | null> {
  if (apiUrl === undefined) {
    throw new Error('API URL is not exist.');
  }

  const response: AxiosResponse<T> | null = await axiosInstance(apiUrl)
    .get<T>(url, { headers })
    .then((res) => res)
    .catch((error) => {
      throw new Error('GET RestAPI Error : ', error);
    });
  return response ? response.data : null;
}

export async function postApi<T>(
  url: string,
  param: object,
  headers: object = {},
  apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL,
): Promise<T | null> {
  if (apiUrl === undefined) {
    throw new Error('API URL is not exist.');
  }

  const response = await axiosInstance(apiUrl)
    .post<T>(url, param, { headers })
    .then((res) => res)
    .catch((error) => {
      throw new Error('POST RestAPI Error : ', error);
    });
  return response ? response.data : null;
}

export async function putApi<T>(
  url: string,
  param: object,
  headers: object = {},
  apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL,
): Promise<T | null> {
  if (apiUrl === undefined) {
    throw new Error('API URL is not exist.');
  }

  const response = await axiosInstance(apiUrl)
    .put<T>(url, param, { headers })
    .then((res) => res)
    .catch((error) => {
      throw new Error('PUT RestAPI Error : ', error);
    });
  return response ? response.data : null;
}

export async function patchApi<T>(
  url: string,
  param: object,
  headers: object = {},
  apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL,
): Promise<T | null> {
  if (apiUrl === undefined) {
    throw new Error('API URL is not exist.');
  }

  const response = await axiosInstance(apiUrl)
    .patch<T>(url, param, { headers })
    .then((res) => res)
    .catch((error) => {
      throw new Error('PATCH RestAPI Error : ', error);
    });
  return response ? response.data : null;
}

export async function deleteApi<T>(
  url: string,
  apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL,
): Promise<T | null> {
  if (apiUrl === undefined) {
    throw new Error('API URL is not exist.');
  }

  const response: AxiosResponse<T> | null = await axiosInstance(apiUrl)
    .delete<T>(url)
    .then((res) => res)
    .catch((error) => {
      throw new Error('DELETE RestAPI Error : ', error);
    });
  return response ? response.data : null;
}
