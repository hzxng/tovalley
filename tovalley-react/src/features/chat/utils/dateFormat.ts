import { DateTime } from 'luxon'

const dateFormat = (dateString: string) => {
  const luxonDateTime = DateTime.fromISO(dateString, {
    zone: 'Asia/Seoul',
  })
  const date = luxonDateTime.toJSDate()

  return date
}

export default dateFormat
