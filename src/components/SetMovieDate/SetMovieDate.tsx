import {FC, useEffect, useState} from 'react'

import {Button, DatePicker, DatePickerProps} from 'antd'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import weekday from 'dayjs/plugin/weekday'

import styles from './SetMovieDate.module.scss'

import {IMovieLang} from '@/api/apiTypes'

import {DateListItem} from './DateListItem'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const dateFormat = 'YYYY.MM.DD'

interface Props {
    movie: IMovieLang | null | undefined,
    onUpdateMovieDateViewing: (val: string[]) => void,
    onAddMovieDateViewing: (val: string) => void
}
export const SetMovieDate: FC<Props> = ({
    movie,
    onUpdateMovieDateViewing,
    onAddMovieDateViewing
}) => {
    const movieDateViewing = movie?.settings?.dateViewing
    const [datePickerValue, setDatePickerValue] = useState('')
    const [addDatePickerValue, setAddDatePickerValue] = useState('')
    const [dateViewing, setDateViewing] = useState([''])
    const date = dateViewing || movieDateViewing

    useEffect(() => {
        setDateViewing(movieDateViewing || [])
    }, [movieDateViewing])

    const handleDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
        const updateDate = dateViewing?.map(date => {
            if (date === datePickerValue) {
                return dateString || date
            }
            return date
        })

        setDatePickerValue(dateString)
        setDateViewing(updateDate)
        onUpdateMovieDateViewing(updateDate)
    }

    const handleDateListItemClick = (value: string) => () => {
        const updateDate = dateViewing?.filter(date => date !== value)

        setDatePickerValue('')
        setDateViewing(updateDate)
        onUpdateMovieDateViewing(updateDate)
    }

    const handleAddDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
        setAddDatePickerValue(dateString)
    }

    const handleDateChange = (date: string) => () => {
        setDatePickerValue(date)
    }

    const handleAddDateClick = () => {
        if (addDatePickerValue) {
            onAddMovieDateViewing(addDatePickerValue)
            setAddDatePickerValue('')
        }
    }

    return (
        <div className={styles.wrapper}>
            <h3>Viewing dates</h3>

            <ol className={styles.ol}>
                {date?.map((dateItem, index) => (
                    <li key={index}>
                        <DateListItem
                            dateItem={dateItem}
                            onListItemClick={handleDateChange}
                            onListItemClose={handleDateListItemClick}
                        />
                    </li>
                ))}
            </ol>

            {datePickerValue && (
                <DatePicker
                    size='small'
                    className={styles.datePicker}
                    value={dayjs(datePickerValue)}
                    format={dateFormat}
                    onChange={handleDatePickerChange}
                />
            )}

            <div className={styles.addDate}>
                <DatePicker
                    size='small'
                    value={addDatePickerValue ? dayjs(addDatePickerValue) : undefined}
                    format={dateFormat}
                    onChange={handleAddDatePickerChange}
                />

                <Button
                    type='link'
                    onClick={handleAddDateClick}
                >
                    add date
                </Button>
            </div>
        </div>
    )
}