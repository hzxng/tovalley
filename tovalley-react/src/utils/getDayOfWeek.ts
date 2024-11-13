export const getDayOfWeek = (day: string) => {
  const week = ['일', '월', '화', '수', '목', '금', '토']
  const dayOfWeek = week[new Date(day).getDay()]

  return dayOfWeek
}
