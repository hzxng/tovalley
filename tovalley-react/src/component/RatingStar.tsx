import {
  MdOutlineStar,
  MdOutlineStarHalf,
  MdOutlineStarBorder,
} from 'react-icons/md'

const RatingStar = ({ rating, size }: { rating: number; size: string }) => {
  let ratingStar

  if (rating - Math.floor(rating) === 0)
    ratingStar = (
      <>
        {Array(Math.floor(rating))
          .fill(0)
          .map((_, index) => {
            return <MdOutlineStar key={index} color="#66A5FC" size={size} />
          })}
        {Array(5 - Math.floor(rating))
          .fill(0)
          .map((_, index) => {
            return (
              <MdOutlineStarBorder key={index} color="#66A5FC" size={size} />
            )
          })}
      </>
    )
  else
    ratingStar = (
      <>
        {Array(Math.floor(rating))
          .fill(0)
          .map((_, index) => {
            return <MdOutlineStar key={index} color="#66A5FC" size={size} />
          })}
        <MdOutlineStarHalf color="#66A5FC" size={size} />
        {Array(4 - Math.floor(rating))
          .fill(0)
          .map((_, index) => {
            return (
              <MdOutlineStarBorder key={index} color="#66A5FC" size={size} />
            )
          })}
      </>
    )

  return <div>{ratingStar}</div>
}

export default RatingStar
