import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { AccidentCountPerMonth } from 'types/main'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  maintainAspectRatio: false,
}

const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const AccidentChart = ({
  accidentCnt,
}: {
  accidentCnt: AccidentCountPerMonth[]
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: '사망',
        data: accidentCnt.map((item) => item.deathCnt),
        borderColor: '#9396DB',
        backgroundColor: '#9396DB',
        borderWidth: 2,
      },
      {
        label: '실종',
        data: accidentCnt.map((item) => item.disappearanceCnt),
        borderColor: '#89C4D1',
        backgroundColor: '#89C4D1',
        borderWidth: 2,
      },
      {
        label: '부상',
        data: accidentCnt.map((item) => item.injuryCnt),
        borderColor: '#FEA520',
        backgroundColor: '#FEA520',
        borderWidth: 2,
      },
    ],
  }

  return <Line options={options} data={data} />
}

export default AccidentChart
