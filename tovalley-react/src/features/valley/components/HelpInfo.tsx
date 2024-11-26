import styles from '@styles/valley/HelpInfo.module.scss'

const HelpInfo = () => {
  return (
    <div className={styles.helpInfo}>
      <div>
        <span>BOD(mg/L)</span>
        <span>
          <br />물 속의 유기 물질 분해 및 분해 과정에서 소비되는 산소 양을
          나타내는 지표입니다. <br /> BOD가 높다는 것은 그 물 속에 분해되기 쉬운
          유기물이 많음을 의미하므로 수질이 나쁘다는 것을 뜻 합니다. <br />
          수질 및 수생태계 환경기준에 따르면 BOD 3㎎/L 이하를 ‘좋은 물’이라 할
          수 있습니다.
        </span>
      </div>
      <div>
        <span>탁도(NTU)</span>
        <span>
          <br />물 속의 입자나 부유 물질로 인해 물이 얼마나 흐려지는지를
          나타내는 지표입니다. <br /> • 0-5 NTU : 매우 깨끗하고 맑은 물로,
          물체가 선명하게 보입니다. <br /> • 6-10 NTU : 물은 여전히 매우
          투명하지만 약간의 탁함이 느껴질 수 있습니다. <br /> • 11-20 NTU : 물이
          다소 탁하지만 일반적으로 명확한 물 상태입니다.
          <br />
          • 21-50 NTU : 물이 조금 탁해져 물체의 가시성이 낮아질 수 있습니다.
          <br />
          • 51-100 NTU : 물이 상당히 탁해져 물체의 가시성이 매우 낮아지며, 탁한
          느낌을 받을 수 있습니다. <br />• 101 NTU 이상 : 물이 매우 탁해져 거의
          모든 물체가 보이지 않을 정도로 가시성이 매우 낮습니다.
        </span>
      </div>
    </div>
  )
}

export default HelpInfo
