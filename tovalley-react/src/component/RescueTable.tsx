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
  isDetailPage,
}: {
  children: React.ReactNode
  name: string
  rescueSupplies: number | string
  isDetailPage?: boolean
}) => {
  return (
    <div>
      <span>{children}</span>
      {isDetailPage && <span>{name}</span>}
      <span>
        {rescueSupplies === -1 || rescueSupplies === '' ? '-' : rescueSupplies}
      </span>
    </div>
  )
}

const RescueTable = ({
  rescueSupplies,
  dangerSignboardsNum,
  isDetailPage,
}: {
  rescueSupplies: RescueSupplies
  dangerSignboardsNum?: number | string
  isDetailPage?: boolean
}) => {
  return (
    <>
      <RescueItem
        name="구명환"
        rescueSupplies={rescueSupplies.lifeRingNum}
        isDetailPage={isDetailPage}
      >
        <TbChartDonut4 />
      </RescueItem>
      <RescueItem
        name="구명로프"
        rescueSupplies={rescueSupplies.rescueRopeNum}
        isDetailPage={isDetailPage}
      >
        <TbJumpRope />
      </RescueItem>
      <RescueItem
        name="인명구조함"
        rescueSupplies={rescueSupplies.lifeBoatNum}
        isDetailPage={isDetailPage}
      >
        <MdEmojiPeople />
      </RescueItem>
      <RescueItem
        name="구명조끼"
        rescueSupplies={rescueSupplies.lifeJacketNum}
        isDetailPage={isDetailPage}
      >
        <FaVest />
      </RescueItem>
      <RescueItem
        name="이동식 거치대"
        rescueSupplies={rescueSupplies.portableStandNum}
        isDetailPage={isDetailPage}
      >
        <MdHomeRepairService />
      </RescueItem>
      <RescueItem
        name="구명봉"
        rescueSupplies={rescueSupplies.rescueRodNum}
        isDetailPage={isDetailPage}
      >
        <LuUtilityPole />
      </RescueItem>
      {dangerSignboardsNum && (
        <RescueItem
          name="위험구역 안내표지판"
          rescueSupplies={dangerSignboardsNum}
          isDetailPage={isDetailPage}
        >
          <BsFillClipboardCheckFill />
        </RescueItem>
      )}
    </>
  )
}

export default RescueTable
