import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/companies';
const companyUrl = (id: string) => `${apiEndpoint}/${id}`;

const get: () => Promise<Company[]> = async () => {
  const response = await http.get<Company[]>(apiEndpoint);
  return response.data;
};

const getBy: (id: string) => Promise<Company> = async id => {
  const response = await http.get<Company>(companyUrl(id));
  return response.data;
};

const save = (company: Company) => {
  if (company._id) {
    const body = { ...company };
    return http.put(companyUrl(company._id), body);
  }

  return http.post(apiEndpoint, company);
};

const remove = (id: string) => http.delete(companyUrl(id));

export default { get, save, remove, getBy };
