const dateFormat = (day: Date, date?: Date) => {
  const formatMonth = `${day.getMonth() + 1}`.padStart(2, '0')
  const formatDate = `${date ? date.getDate() : day.getDate()}`.padStart(2, '0')

  return `${day.getFullYear()}-${formatMonth}-${formatDate}`
}

export default dateFormat
