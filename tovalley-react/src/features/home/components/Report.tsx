import { useState } from 'react'
import styles from '@styles/home/Report.module.scss'
import ToggleBtn from '@component/ToggleBtn'
import ReportContainer from './ReportContainer'
import { WeatherAlert, WeatherAlerts, WeatherPreAlerts } from 'types/main'
// import { data } from 'dummy/main-data'

const Report = ({ alert }: { alert: WeatherAlert }) => {
  // const alert = data.weatherAlert
  const [alertActive, setAlertActive] = useState<boolean>(true)

  let currAlertList: WeatherAlerts[] = alert.weatherAlerts
  let currPreAlertList: WeatherPreAlerts[] = alert.weatherPreAlerts

  if (alert.weatherAlerts.length > 1) {
    currAlertList = [...alert.weatherAlerts, alert.weatherAlerts[0]]
  }

  if (alert.weatherPreAlerts.length > 1) {
    currPreAlertList = [...alert.weatherPreAlerts, alert.weatherPreAlerts[0]]
  }

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
        weatherAlert={
          alertActive ? alert.weatherAlerts : alert.weatherPreAlerts
        }
        currAlertList={alertActive ? currAlertList : currPreAlertList}
      />
    </div>
  )
}

export default Report
