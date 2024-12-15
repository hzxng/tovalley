import { WeatherAlerts, WeatherPreAlerts } from 'types/main'
import ReportType from './ReportType'
import styled from 'styled-components'
import styles from '@styles/home/ReportContainer.module.scss'
import useCarousel from '@hooks/useCarousel'

interface ReportProps {
  color: string
}

const ReportComponent = styled.div<ReportProps>`
  background-color: ${({ color }) => color};
`

const isWeatherAlerts = (
  alert: WeatherAlerts | WeatherPreAlerts
): alert is WeatherAlerts => {
  return (alert as WeatherAlerts).effectiveTime !== undefined
}

const ReportContainer = ({
  weatherAlertsLength,
  processedAlertList,
}: {
  weatherAlertsLength: number
  processedAlertList: (WeatherAlerts | WeatherPreAlerts)[]
}) => {
  const { currentIndex, carouselTransition } = useCarousel({
    duration: 600,
    interval: 5000,
    length: weatherAlertsLength,
  })

  if (weatherAlertsLength === 0) {
    return (
      <div className={styles.reportList}>
        <div className={styles.defaultAlert}>
          <div>특보 정보가 없습니다.</div>
          <div />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.reportList}>
      {processedAlertList.map((item, index) => {
        const { Icon, titleColor, contentColor } = ReportType(item.title)
        return (
          <div
            key={index}
            className={styles.reportItem}
            style={{
              transition: `${carouselTransition}`,
              transform: `translateX(-${currentIndex}00%)`,
            }}
          >
            <div className={styles.reportItemContainer}>
              <ReportComponent
                color={titleColor}
                className={styles.reportTitle}
              >
                <span>{Icon}</span>
                <span>{item.title}</span>
              </ReportComponent>
              <ReportComponent
                color={contentColor}
                className={styles.reportContent}
              >
                <div className={styles.presentation}>
                  <span>발표</span>
                  <span>{item.announcementTime}</span>
                </div>
                {isWeatherAlerts(item) ? (
                  <>
                    <div className={styles.presentation}>
                      <span>발효</span>
                      <span>{item.effectiveTime}</span>
                    </div>
                    <div className={styles.region}>
                      <span>{item.content}</span>
                    </div>
                  </>
                ) : (
                  item.contents.map((content) => {
                    return (
                      <div className={styles.region}>
                        <span>{content.content}</span>
                      </div>
                    )
                  })
                )}
              </ReportComponent>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReportContainer
