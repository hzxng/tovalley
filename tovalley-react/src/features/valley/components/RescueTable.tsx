import styles from '@styles/valley/RescueTable.module.scss'
import { RescueSupplies } from 'types/valley'
import { TbChartDonut4, TbJumpRope } from 'react-icons/tb'
import { MdEmojiPeople, MdHomeRepairService } from 'react-icons/md'
import { FaVest } from 'react-icons/fa'
import { LuUtilityPole } from 'react-icons/lu'
import { BsFillClipboardCheckFill } from 'react-icons/bs'

const RescueItem = ({
  children,
  name,
  rescueSupplies,
}: {
  children: React.ReactNode
  name: string
  rescueSupplies: number | string
}) => {
  return (
    <div className={styles.rescueItem}>
      <span>{children}</span>
      <span>{name}</span>
      <span>
        {rescueSupplies === -1 || rescueSupplies === '' ? '-' : rescueSupplies}
      </span>
    </div>
  )
}

const RescueTable = ({
  rescueSupplies,
  dangerSignboardsNum,
}: {
  rescueSupplies: RescueSupplies
  dangerSignboardsNum: number | string
}) => {
  return (
    <div className={styles.rescueList}>
      <RescueItem name="구명환" rescueSupplies={rescueSupplies.lifeRingNum}>
        <TbChartDonut4 />
      </RescueItem>
      <RescueItem name="구명로프" rescueSupplies={rescueSupplies.rescueRopeNum}>
        <TbJumpRope />
      </RescueItem>
      <RescueItem name="인명구조함" rescueSupplies={rescueSupplies.lifeBoatNum}>
        <MdEmojiPeople />
      </RescueItem>
      <RescueItem name="구명조끼" rescueSupplies={rescueSupplies.lifeJacketNum}>
        <FaVest />
      </RescueItem>
      <RescueItem
        name="이동식 거치대"
        rescueSupplies={rescueSupplies.portableStandNum}
      >
        <MdHomeRepairService />
      </RescueItem>
      <RescueItem name="구명봉" rescueSupplies={rescueSupplies.rescueRodNum}>
        <LuUtilityPole />
      </RescueItem>
      <RescueItem
        name="위험구역 안내표지판"
        rescueSupplies={dangerSignboardsNum}
      >
        <BsFillClipboardCheckFill />
      </RescueItem>
    </div>
  )
}

export default RescueTable
