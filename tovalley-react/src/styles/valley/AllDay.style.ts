import styled from 'styled-components'

interface ContainerProps {
  sameMonth: boolean
  sameDay: boolean
  afterToday: boolean
  clickDay: boolean
  addScheduleBtn: boolean
}

interface PeopleCntProps {
  peopleCnt: number
}

export const Container = styled.div<ContainerProps>`
  cursor: ${({ sameMonth, addScheduleBtn, afterToday }) =>
    sameMonth && addScheduleBtn && afterToday ? `pointer` : ``};

  p {
    font-weight: ${({ sameMonth }) => (sameMonth ? `700` : `500`)};
    color: ${({ sameMonth, addScheduleBtn, afterToday }) =>
      sameMonth && addScheduleBtn && afterToday
        ? ``
        : sameMonth && !addScheduleBtn
        ? `black`
        : !sameMonth && !addScheduleBtn
        ? `#BCBCBC`
        : `#d4d4d4;`};

    ${({ sameDay }) =>
      sameDay &&
      ` padding: 0.3em;
          color: white;
          background-color: red;
          border-radius: 100%;
          width: 1.3em;
          height: 1.3em;
          display: flex;
          justify-content: center;
        `}

    ${({ clickDay }) =>
      clickDay &&
      ` background-color: #3378fc;
          color: white;
          border-radius: 100%;
          padding: 0.3em;
          width: 1.3em;
          height: 1.3em;
          display: flex;
          justify-content: center;
        `}
  }
`

export const PeopleCnt = styled.div<PeopleCntProps>`
  background-color: ${({ peopleCnt }) =>
    peopleCnt >= 46
      ? `#FA7F64`
      : peopleCnt >= 31
      ? `#FFD874`
      : peopleCnt >= 16
      ? `#8EBBFF`
      : `#E0E0E0`};
`
