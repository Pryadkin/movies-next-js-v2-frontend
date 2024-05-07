/* eslint-disable react/display-name */
import {forwardRef} from "react"
import {Doughnut} from "react-chartjs-2"

import {Chart, ArcElement} from 'chart.js'

import styles from './ChartElement.module.scss'
Chart.register(ArcElement)

interface Props {
    vote: number,
    size: number,
    data: {
        num: number,
        color: string,
    }[],
    className?: string,
}

export const ChartElement = forwardRef<HTMLDivElement, Props>(
    (props, ref) => {
        const {
            vote,
            size,
            data,
        } = props
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
                ref={ref}
                {...props}
                style={{
                    marginBottom: 20,
                }}
            >
                <div className="positionWrapper"
                    style={{
                        position: 'relative',
                        width: size,
                        height: size,
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
            </div>
        )
    }
)