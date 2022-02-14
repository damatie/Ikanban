import axios from 'axios';

// Base URL
const $API_HOST = process.env.NEXT_PUBLIC_APP_BASE_URL;

// Header
export const $Header = {
  Accept: 'application/json',
};

export const AxiosHost = axios.create({
  baseURL: $API_HOST,
  headers: $Header,
});