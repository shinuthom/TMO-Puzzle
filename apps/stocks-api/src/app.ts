/*
 Stock server external methods
*/
import { environment } from './environments/environment';
const axios = require('axios');
const baseURL = `${environment.apiURL}beta/stock/`;

export const callStockAPI = async (symbol: string, period: string) => {
  const url = `${baseURL}${symbol}/chart/${period}?token=${environment.apiKey}`;
  const response = await axios.get(url);
  return response.data;
};
