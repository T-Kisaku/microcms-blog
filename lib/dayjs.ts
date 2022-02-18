import dayjs from 'dayjs'

export const convertUTC = (utc: string) => dayjs(utc).format('D.MMM.YYYY')