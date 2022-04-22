import http from './httpService';
import { apiUrl } from '../config.json';

const get: () => Promise<Specialty[]> = async () => {
  const response = await http.get<Specialty[]>(apiUrl + '/specialties');

  return response.data;
};

export default { get };
