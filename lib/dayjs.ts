import dayjs from 'dayjs'

export const convertUTC = (utc: string) => dayjs(utc).format('YYYY年MM月DD日')