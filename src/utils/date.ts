import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

export const getTodayTimezone = (offset: number) => {
  return dayjs().utcOffset(offset)
}

export const getJobSchedule = (offset: number) => {
  return dayjs().utcOffset(offset).set('hour', 9).set('minute', 0).set('second', 0).set('millisecond', 0).valueOf()
}

export const getMonthDate = (date: string) => {
  return dayjs(date).format('MM-DD')
}

export const formatDate = (date: string) => {
  return dayjs(date).format('MM-DD-YYYY')
}