import moment from 'moment-timezone';

const TZ_KST = 'Asia/Seoul';
const TZ_UTC = 'UTC';
const FRMT_DT = 'YYYY-MM-DD';
const FRMT_TIME = 'YYYY-MM-DD HH:mm:ss';

/**
 * @description UTC 문자열 날짜를 KST 문자열 날짜 포멧으로 변환
 * @param {string} utcDt
 * @returns {string} kstDt
 */
export const toKstDt = utcDt => moment.tz(utcDt, TZ_UTC).tz(TZ_KST).format(FRMT_DT);

export const test = {};
