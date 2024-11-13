import { useEffect, useState } from 'react'
import styles from '@styles/home/Report.module.scss'
import { HiSun } from 'react-icons/hi'
import { BsFillCloudRainHeavyFill } from 'react-icons/bs'
import { GiDustCloud } from 'react-icons/gi'
import { FaWind, FaRegSnowflake } from 'react-icons/fa'
import { RiTyphoonFill, RiThunderstormsFill } from 'react-icons/ri'
import { TiWaves } from 'react-icons/ti'
import { PiThermometerColdFill } from 'react-icons/pi'
import { MdDry } from 'react-icons/md'
import styled from 'styled-components'
import useDidMountEffect from 'useDidMountEffect'
import { WeatherAlert } from 'types/main'

interface ReportProps {
  category: string
}

const ReportTitle = styled.div<ReportProps>`
  background-color: ${({ category }) =>
    category.includes('폭염')
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
      : ``};
  color: white;
  font-weight: bold;
  border-radius: 12px 12px 0 0;
  padding: 0.8em 1.2em;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  span:first-child {
    margin-right: 0.3em;
  }
`

const ReportContent = styled.div<ReportProps>`
  background-color: ${({ category }) =>
    category.includes('폭염')
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
      : ``};
  color: white;
  border-radius: 0 0 12px 12px;
  padding: 1em;
  font-size: 0.9rem;
  text-align: justify;
  line-height: 1.4em;
  height: 20vh;
  min-height: 10em;
  overflow-y: scroll;
  box-sizing: border-box;
`

const Report = ({ alert }: { alert: WeatherAlert }) => {
  const [report, setReport] = useState(true)
  const [alertNum, setAlertNum] = useState(0)
  const [preAlertNum, setPreAlertNum] = useState(0)
  const [carouselTransition, setCarouselTransition] = useState(
    'transform 600ms ease-in-out'
  )
  const [currAlertList, setCurrAlertList] = useState([...alert.weatherAlerts])
  const [currPreAlertList, setCurrPreAlertList] = useState([
    ...alert.weatherPreAlerts,
  ])

  useEffect(() => {
    if (alert.weatherAlerts.length > 1) {
      setCurrAlertList([...alert.weatherAlerts, alert.weatherAlerts[0]])
    }

    if (alert.weatherPreAlerts.length > 1) {
      setCurrPreAlertList([
        ...alert.weatherPreAlerts,
        alert.weatherPreAlerts[0],
      ])
    }
  }, [alert])

  useEffect(() => {
    const timer = setInterval(() => {
      setAlertNum((alertNum) => alertNum + 1)
      setPreAlertNum((preAlertNum) => preAlertNum + 1)
      setCarouselTransition('transform 600ms ease-in-out')
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useDidMountEffect(() => {
    if (alertNum === alert.weatherAlerts.length) handleAlertOriginSlide(0)
    if (preAlertNum === alert.weatherPreAlerts.length)
      handlePreAlertOriginSlide(0)
  }, [alertNum, preAlertNum])

  function handleAlertOriginSlide(index: number) {
    setTimeout(() => {
      setAlertNum(index)
      setCarouselTransition('')
    }, 500)
  }

  function handlePreAlertOriginSlide(index: number) {
    setTimeout(() => {
      setPreAlertNum(index)
      setCarouselTransition('')
    }, 500)
  }

  return (
    <div className={styles.report}>
      <div className={styles.menu}>
        <div
          className={styles.toggleBtn}
          onClick={() => {
            setReport((prev) => !prev)
          }}
        >
          <div
            className={report ? styles.toggleSwitchOn : styles.toggleSwitchOff}
          />
        </div>
        <span>{report ? '특보' : '예비 특보'}</span>
      </div>
      {report ? (
        <div className={styles.reportList}>
          {alert.weatherAlerts.length === 0 ? (
            <div className={styles.defaultAlert}>
              <div>특보 정보가 없습니다.</div>
              <div />
            </div>
          ) : (
            currAlertList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={styles.reportItem}
                  style={
                    currAlertList.length > 1
                      ? {
                          transition: `${carouselTransition}`,
                          transform: `translateX(-${alertNum}00%)`,
                        }
                      : {}
                  }
                >
                  <div className={styles.reportItemContainer}>
                    <ReportTitle category={item.title}>
                      <span>
                        {item.title.includes('폭염') ? (
                          <HiSun size="20px" />
                        ) : item.title.includes('호우') ? (
                          <BsFillCloudRainHeavyFill size="20px" />
                        ) : item.title.includes('황사') ? (
                          <GiDustCloud size="20px" />
                        ) : item.title.includes('강풍') ? (
                          <FaWind size="18px" />
                        ) : item.title.includes('태풍') ? (
                          <RiTyphoonFill size="20px" />
                        ) : item.title.includes('대설') ? (
                          <FaRegSnowflake size="20px" />
                        ) : item.title.includes('풍랑') ? (
                          <TiWaves size="23px" />
                        ) : item.title.includes('한파') ? (
                          <PiThermometerColdFill size="20px" />
                        ) : item.title.includes('건조') ? (
                          <MdDry size="20px" />
                        ) : item.title.includes('폭풍해일') ? (
                          <RiThunderstormsFill size="20px" />
                        ) : (
                          ''
                        )}
                      </span>
                      <span>{item.title}</span>
                    </ReportTitle>
                    <ReportContent category={item.title}>
                      <div className={styles.presentation}>
                        <span>발표</span>
                        <span>{item.announcementTime}</span>
                      </div>
                      <div className={styles.presentation}>
                        <span>발효</span>
                        <span>{item.effectiveTime}</span>
                      </div>
                      <div className={styles.region}>
                        <span>{item.content}</span>
                      </div>
                    </ReportContent>
                  </div>
                </div>
              )
            })
          )}
        </div>
      ) : (
        <div className={styles.reportList}>
          {alert.weatherPreAlerts.length === 0 ? (
            <div className={styles.defaultAlert}>
              <div>예비 특보 정보가 없습니다.</div>
              <div />
            </div>
          ) : (
            currPreAlertList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={styles.reportItem}
                  style={
                    currPreAlertList.length > 1
                      ? {
                          transition: `${carouselTransition}`,
                          transform: `translateX(-${preAlertNum}00%)`,
                        }
                      : {}
                  }
                >
                  <div className={styles.reportItemContainer}>
                    <ReportTitle category={item.title}>
                      <span>
                        {item.title.includes('폭염') ? (
                          <HiSun size="20px" />
                        ) : item.title.includes('호우') ? (
                          <BsFillCloudRainHeavyFill size="20px" />
                        ) : item.title.includes('황사') ? (
                          <GiDustCloud size="20px" />
                        ) : item.title.includes('강풍') ? (
                          <FaWind size="18px" />
                        ) : item.title.includes('태풍') ? (
                          <RiTyphoonFill size="20px" />
                        ) : item.title.includes('대설') ? (
                          <FaRegSnowflake size="20px" />
                        ) : item.title.includes('풍랑') ? (
                          <TiWaves size="23px" />
                        ) : item.title.includes('한파') ? (
                          <PiThermometerColdFill size="20px" />
                        ) : item.title.includes('건조') ? (
                          <MdDry size="20px" />
                        ) : item.title.includes('폭풍해일') ? (
                          <RiThunderstormsFill size="20px" />
                        ) : (
                          ''
                        )}
                      </span>
                      <span>{item.title}</span>
                    </ReportTitle>
                    <ReportContent category={item.title}>
                      <div className={styles.presentation}>
                        <span>발표</span>
                        <span>{item.announcementTime}</span>
                      </div>
                      {item.contents.map((content) => {
                        return (
                          <div className={styles.region}>
                            <span>{content.content}</span>
                          </div>
                        )
                      })}
                    </ReportContent>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default Report
