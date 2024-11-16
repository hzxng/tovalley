import { HiSun } from 'react-icons/hi'
import { BsFillCloudRainHeavyFill } from 'react-icons/bs'
import { GiDustCloud } from 'react-icons/gi'
import { FaWind, FaRegSnowflake } from 'react-icons/fa'
import { RiTyphoonFill, RiThunderstormsFill } from 'react-icons/ri'
import { TiWaves } from 'react-icons/ti'
import { PiThermometerColdFill } from 'react-icons/pi'
import { MdDry } from 'react-icons/md'

const ReportType = (category: string) => {
  const Icon = category.includes('폭염') ? (
    <HiSun size="20px" />
  ) : category.includes('호우') ? (
    <BsFillCloudRainHeavyFill size="20px" />
  ) : category.includes('황사') ? (
    <GiDustCloud size="20px" />
  ) : category.includes('강풍') ? (
    <FaWind size="18px" />
  ) : category.includes('태풍') ? (
    <RiTyphoonFill size="20px" />
  ) : category.includes('대설') ? (
    <FaRegSnowflake size="20px" />
  ) : category.includes('풍랑') ? (
    <TiWaves size="23px" />
  ) : category.includes('한파') ? (
    <PiThermometerColdFill size="20px" />
  ) : category.includes('건조') ? (
    <MdDry size="20px" />
  ) : category.includes('폭풍해일') ? (
    <RiThunderstormsFill size="20px" />
  ) : (
    ''
  )

  const titleColor = category.includes('폭염')
    ? `#fd7878`
    : category.includes('호우')
    ? `#00AED4`
    : category.includes('황사')
    ? `#D77E3F`
    : category.includes('강풍')
    ? `#01AA44`
    : category.includes('태풍')
    ? `#2764BF`
    : category.includes('대설')
    ? `#939393`
    : category.includes('풍랑')
    ? `#ACAF12`
    : category.includes('한파')
    ? `#6952AA`
    : category.includes('건조')
    ? `#A952B7`
    : category.includes('폭풍해일')
    ? `#2478A7`
    : ``

  const contentColor = category.includes('폭염')
    ? `#FFAAAA`
    : category.includes('호우')
    ? `#7CCCDD`
    : category.includes('황사')
    ? `#EBAB7D`
    : category.includes('강풍')
    ? `#74BC91`
    : category.includes('태풍')
    ? `#6192DB`
    : category.includes('대설')
    ? `#BFBFBF`
    : category.includes('풍랑')
    ? `#CDCF51`
    : category.includes('한파')
    ? `#947ED4`
    : category.includes('건조')
    ? `#BD83C7`
    : category.includes('폭풍해일')
    ? `#5299C0`
    : ``

  return { Icon, titleColor, contentColor }
}

export default ReportType
