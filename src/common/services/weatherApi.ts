import axios from 'axios';

const api_key = '46a258efbcad4b3884e05806221106';
const base_url = `http://api.weatherapi.com/v1/`;

export const createURL = (path: string, city: string): string =>
  `${path}?key=${api_key}&q=${city}`;

export const weatherAPI = axios.create({
  baseURL: base_url,
  timeout: 1000,
});
