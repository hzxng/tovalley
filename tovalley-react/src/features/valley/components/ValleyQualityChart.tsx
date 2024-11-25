import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { WaterQualityReviews } from 'types/valley'

ChartJS.register(ArcElement, Tooltip, Legend)

const ValleyQualityChart = ({
  waterQualityReviews,
}: {
  waterQualityReviews: WaterQualityReviews
}) => {
  const isEmpty = () => {
    if (
      waterQualityReviews.깨끗해요 &&
      waterQualityReviews.괜찮아요 &&
      waterQualityReviews.더러워요
    )
      return false
    else return true
  }
  const labels = isEmpty() ? [] : ['깨끗해요', '괜찮아요', '더러워요']

  const data = {
    labels,
    datasets: [
      {
        data: [
          isEmpty() ? -1 : waterQualityReviews.깨끗해요,
          isEmpty() ? 0 : waterQualityReviews.괜찮아요,
          isEmpty() ? 0 : waterQualityReviews.더러워요,
        ],
        backgroundColor: [
          isEmpty() ? '#b8b8b8' : '#AADCF2',
          '#82BEF5',
          '#C7B9B1',
        ],
      },
    ],
  }

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  }

  return <Doughnut data={data} options={isEmpty() ? options : {}} />
}

export default ValleyQualityChart
