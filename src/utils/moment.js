import moment from 'moment';

moment.locale('zh-tw', {
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '幾秒',
    m: '1 分鐘',
    mm: '%d 分鐘',
    h: '1 小時',
    hh: '%d 小時',
    d: '1 天',
    dd: '%d 天',
    M: '1 個月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年',
  },
});

export default moment;
