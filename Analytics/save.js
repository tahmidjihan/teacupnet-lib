import fetchAPI from '../Functions/FetchAPI';
import fingerprint from './fingerprint';
import data from './data.controller';
import { initial } from '..';

export default function save() {
  setInterval(() => {
    fetchAPI('api/analytics', 'POST', {
      data: data.data,
      initial: initial,
      fingerprint: fingerprint(),
    });
  }, 5000);
}
