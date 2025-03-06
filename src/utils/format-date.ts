import moment from 'moment';

export function formatDate(inputDate: Date) {
  return moment(inputDate).format('yyyy MM DD');
}
