import { useState } from 'react'
import styles from '@styles/valley/ValleyQuality.module.scss'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import ValleyQualityChart from './ValleyQualityChart'
import { WaterPlaceDetails } from 'types/valley'
import HelpInfo from './HelpInfo'
import GaugeBar from './GaugeBar'

const ValleyQuality = ({
  waterPlaceDetails,
}: {
  waterPlaceDetails: WaterPlaceDetails
}) => {
  const [helpInfo, setHelpInfo] = useState(false)

  return (
    <div className={styles.valleyQuality}>
      <span>계곡 수질</span>
      <div className={styles.valleyQualityContent}>
        {helpInfo && <HelpInfo />}
        <div className={styles.qualityDetail}>
          <div className={styles.qualityGauge}>
            <div className={styles.gaugeTitle}>
              <span>수질정도</span>
              <span onClick={() => setHelpInfo(!helpInfo)}>
                <AiOutlineInfoCircle color="#7BA5F6" />
              </span>
            </div>
            <div className={styles.gaugeBarList}>
              <GaugeBar
                name="BOD(mg/L)"
                max={10}
                value={waterPlaceDetails.bod}
              />
              <GaugeBar
                name="탁도(NTU)"
                max={101}
                value={waterPlaceDetails.turbidity}
              />
            </div>
          </div>
          <div className={styles.valleyWaterInfo}>
            <div className={styles.average}>
              <span>물놀이 구간 ({waterPlaceDetails.waterPlaceSegment}m)</span>
              <span>평균 수심</span>
            </div>
            <div className={styles.blank} />
            <div className={styles.danger}>
              <span>위험 구간 ({waterPlaceDetails.dangerSegments}m)</span>
              <span>가장 깊은 곳</span>
            </div>
          </div>
          <div className={styles.valleyWater}>
            <Depth depth={waterPlaceDetails.avgDepth} />
            <div className={styles.waterTemperature}>
              <span>수온</span>
              <div>
                <span>{waterPlaceDetails.waterTemperature}</span>
                <span>°C</span>
              </div>
            </div>
            <Depth depth={waterPlaceDetails.deepestDepth} />
          </div>
        </div>
        <div className={styles.valleyQualityReview}>
          <h4>사용자 수질 평가</h4>
          <ValleyQualityChart
            waterQualityReviews={waterPlaceDetails.waterQualityReviews}
          />
        </div>
      </div>
    </div>
  )
}

const Depth = ({ depth }: { depth: number }) => {
  return (
    <div className={styles.depth}>
      <span>{depth}m</span>
      <div />
    </div>
  )
}

export default ValleyQuality
