export const dateFormat = (date: string) => {
  let createDate = new Date(date)
  const nowDate = new Date()

  let formatedDate =
    nowDate.getMonth() + 1 === createDate.getMonth() + 1 &&
    nowDate.getDate() === createDate.getDate()
      ? '오늘'
      : `${createDate.getMonth() + 1}.${createDate.getDate()}`

  return formatedDate
}
