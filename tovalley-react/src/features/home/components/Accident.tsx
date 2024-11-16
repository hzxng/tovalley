import styles from '@styles/home/Accident.module.scss'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { useRef, useState } from 'react'
import axios from 'axios'
import { AccidentCountDto } from 'types/main'
import { province } from '../utils/regions'
import AccidentTable from '@component/AccidentTable'
import AccidentChart from './AccidentChart'
import cn from 'classnames'

const localhost = process.env.REACT_APP_HOST

const Accident = ({ accident }: { accident: AccidentCountDto }) => {
  const [regionAccident, setRegionAccident] =
    useState<AccidentCountDto>(accident)

  const [clicked, setClicked] = useState<string>(accident.province)
  const [next, setNext] = useState<boolean>(false)

  const scroll = useRef<HTMLDivElement>(null)
  const scrollPrev = useRef<HTMLDivElement>(null)

  const onMove = () => {
    scroll.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }
  const onMovePrev = () => {
    scrollPrev.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  const handleNext = () => {
    setNext(true)
    onMove()
  }

  const handlePrev = () => {
    setNext(false)
    onMovePrev()
  }

  const getRegionAccident = (region: { ko: string; en: string }) => {
    const config = {
      params: {
        province: region.en,
      },
    }
    axios
      .get(`${localhost}/api/main-page/accidents`, config)
      .then((res) => {
        // console.log(res)
        setRegionAccident(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={styles.accident}>
      <h4>올해 사고 발생수</h4>
      <div className={styles.regionNav}>
        <div className={styles.regionMenu}>
          {province.map((item, index) => {
            return (
              <div key={index}>
                {index === 0 && (
                  <span ref={scrollPrev} className={styles.blank}>
                    ㅤ
                  </span>
                )}
                <span
                  onClick={() => {
                    setClicked(`${item.ko}`)
                    getRegionAccident(item)
                  }}
                  className={cn({ [styles.clicked]: clicked === item.ko })}
                >
                  {item.ko}
                </span>
                {index === province.length - 1 && (
                  <span ref={scroll} className={styles.blank}>
                    ㅤ
                  </span>
                )}
              </div>
            )
          })}
          {next ? (
            <span className={styles.regionPrevBtn} onClick={handlePrev}>
              <MdNavigateBefore size="30px" />
            </span>
          ) : (
            <span className={styles.regionNextBtn} onClick={handleNext}>
              <MdNavigateNext size="30px" />
            </span>
          )}
        </div>
      </div>
      <div className={styles.lineGraph}>
        <AccidentChart accidentCnt={regionAccident.accidentCountPerMonth} />
      </div>
      <AccidentTable accident={accident} />
    </div>
  )
}

export default Accident
