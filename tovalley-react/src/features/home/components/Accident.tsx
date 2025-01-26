import styles from '@styles/home/Accident.module.scss'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import React, { Suspense, useRef, useState } from 'react'
import { AccidentCountDto } from 'types/main'
import { province } from '../utils/regions'
// import AccidentTable from '@component/AccidentTable'
// import AccidentChart from './AccidentChart'
import cn from 'classnames'
import { Axios } from '@utils/axios_interceptor'

const AccidentChart = React.lazy(() => import('./AccidentChart'))
const AccidentTable = React.lazy(() => import('@component/AccidentTable'))

const Accident = ({ accident }: { accident: AccidentCountDto }) => {
  const [regionAccident, setRegionAccident] =
    useState<AccidentCountDto>(accident)
  const [clicked, setClicked] = useState(accident.province)
  const [isNext, setIsNext] = useState(false)

  const scrollRefs = {
    prev: useRef<HTMLDivElement>(null),
    next: useRef<HTMLDivElement>(null),
  }

  const handleScroll = (direction: 'prev' | 'next') => {
    scrollRefs[direction].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
    setIsNext(direction === 'next')
  }

  const getRegionAccident = async (region: { ko: string; en: string }) => {
    try {
      const { data } = await Axios.get('/api/main-page/accidents', {
        params: {
          province: region.en,
        },
      })
      setRegionAccident(data.data)
    } catch (err) {
      console.error(err)
    }
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
                  <span ref={scrollRefs.prev} className={styles.blank}>
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
                  <span ref={scrollRefs.next} className={styles.blank}>
                    ㅤ
                  </span>
                )}
              </div>
            )
          })}
          {isNext ? (
            <span
              className={styles.regionPrevBtn}
              onClick={() => handleScroll('prev')}
            >
              <MdNavigateBefore size="30px" />
            </span>
          ) : (
            <span
              className={styles.regionNextBtn}
              onClick={() => handleScroll('next')}
            >
              <MdNavigateNext size="30px" />
            </span>
          )}
        </div>
      </div>
      <Suspense fallback={<div className={styles.grpahSkeleton} />}>
        <div className={styles.lineGraph}>
          <AccidentChart accidentCnt={regionAccident.accidentCountPerMonth} />
        </div>
      </Suspense>
      <Suspense fallback={<div className={styles.skeleton} />}>
        <AccidentTable accident={regionAccident} />
      </Suspense>
    </div>
  )
}

export default Accident
