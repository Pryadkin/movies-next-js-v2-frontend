import {Doughnut} from "react-chartjs-2"

import {Chart, ArcElement} from 'chart.js'

import styles from './ChartElement.module.scss'
Chart.register(ArcElement)

export const ChartElement = ({
    vote,
    size,
    data,
}: {
    vote: number,
    size: number,
    data: {
        num: number,
        color: string,
    }[]
}) => {
    const nums = data.map(elem => elem.num)
    const colors = data.map(elem => elem.color)

    const chartData = {
        labels: colors,
        datasets: [{
            label: 'rating',
            data: nums,
            color: [
                'green',
                'red'
            ],
            backgroundColor: colors,
            hoverOffset: 3,
            hoverBorderColor: 'blue',
        }],
    }

    return (
        <div
            style={{
                position: 'relative',
                width: size,
                height: size,
                marginBottom: 20,
            }}
        >
            <Doughnut
                data={chartData}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                className={styles.vote}
            >
                {`${vote}%`}
            </div>
        </div>
    )
}