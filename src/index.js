import TC from 'typecheck-extended';

// date params are compatible with mm-dd-yyy and yyyy-mm-dd

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function Today() {
  return new Date();
}

export function DateParse(date, filter, format = 'number') {
  TC(date, 'string');
  TC(filter, 'enum', true, ['year', 'month', 'day']);
  TC(format, 'enum', false, ['number', 'text']);

  const parsedDate = new Date(date);
  switch (filter) {
    case 'year':
      if (format === 'number') {
        return parsedDate.getFullYear();
      }
      return 'Error: Year "text" formmating not supported. Please use "number"';
    case 'month':
      if (format === 'number') {
        return parsedDate.getMonth() + 1;
      }
      return months[parsedDate.getMonth()];
    case 'day':
      if (format === 'number') {
        return 'Error: Day "number" formmating not supported. Please use "number"';
      }
      return days[parsedDate.getDay()];
    default:
      return 'Error: Proccessing Date';
  }
}

export function TimeSpan(startDate, endDate, unitOverride) {
  TC(startDate, 'string', false);
  TC(endDate, 'string');
  TC(unitOverride, 'enum', false, ['yearsOnly', 'daysOnly']);

  let start = new Date();
  if (startDate !== 'now') {
    start = new Date(startDate);
  }

  let end = new Date();
  if (endDate !== 'now') {
    end = new Date(endDate);
  }
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSpan = (end - start) / msPerDay;
  const daysPerYear = 365.25;
  const years = Math.floor(daysSpan / daysPerYear);
  const fullDays = Math.floor(daysSpan % daysPerYear);
  return [years, fullDays];
}

export function CurrentAge(birthday) {
  TC(birthday, 'string');

  const birthdate = new Date(birthday);
  const today = new Date();
  let years = (today.getFullYear() - birthdate.getFullYear());
  if (
    today.getMonth() < birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())
  ) {
    years -= 1;
  }
  return years;
}
