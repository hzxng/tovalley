import { useState } from 'react'
import styles from '@styles/home/Report.module.scss'
import ToggleBtn from '@component/ToggleBtn'
import ReportContainer from './ReportContainer'
import { WeatherAlert, WeatherAlerts, WeatherPreAlerts } from 'types/main'
// import { data } from 'dummy/main-data'

const Report = ({ alert }: { alert: WeatherAlert }) => {
  // const alert = data.weatherAlert
  const [alertActive, setAlertActive] = useState(true)

  const getProcessedAlertList = (
    alerts: WeatherAlerts[] | WeatherPreAlerts[]
  ) => {
    return alerts.length > 1 ? [...alerts, alerts[0]] : alerts
  }

  const alerts = alertActive ? alert.weatherAlerts : alert.weatherPreAlerts
  const processedAlertList = getProcessedAlertList(alerts)
  const weatherAlertsLength = alerts.length

  return (
    <div className={styles.report}>
      <div className={styles.menu}>
        <ToggleBtn
          active={alertActive}
          setActive={setAlertActive}
          explanation={['예비특보 보기', '특보 보기']}
        />
      </div>
      <ReportContainer
        weatherAlertsLength={weatherAlertsLength}
        processedAlertList={processedAlertList}
      />
    </div>
  )
}

export default Report
