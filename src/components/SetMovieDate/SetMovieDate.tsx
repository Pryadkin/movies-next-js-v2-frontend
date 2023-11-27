import {FC, useState} from 'react'

import {Button, DatePicker, DatePickerProps} from 'antd'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import weekday from 'dayjs/plugin/weekday'

import styles from './SetMovieDate.module.scss'

import {ICorrectMovieWithLang, ICorrectMovieWithoutLang} from '@/api/apiTypes/requestMovies'
import {IUpdateDate} from '@/redux/reducers/layoutReducer/layoutSlice'

import {DateListItem} from './DateListItem'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const dateFormat = 'YYYY.MM.DD'

interface Props {
    movie: ICorrectMovieWithLang | ICorrectMovieWithoutLang,
    onUpdateMovieDateViewing: (val: IUpdateDate) => void,
    onAddMovieDateViewing: (val: string) => void,
    deleteSelectMovieDateViewing: (val: string) => void
}
export const SetMovieDate: FC<Props> = ({
    movie,
    onUpdateMovieDateViewing,
    onAddMovieDateViewing,
    deleteSelectMovieDateViewing
}) => {
    const [newDatePickerValue, setNewDatePickerValue] = useState('')
    const [oldDatePickerValue, setOldDatePickerValue] = useState('')
    const [addDatePickerValue, setAddDatePickerValue] = useState('')

    const handleDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
        setNewDatePickerValue(dateString)
    }

    const handleDateItemUpdate = () => {
        onUpdateMovieDateViewing({
            oldDate: oldDatePickerValue,
            newDate: newDatePickerValue,
        })
        setNewDatePickerValue('')
    }

    const handleDateItemDelete = (value: string) => () => {
        deleteSelectMovieDateViewing(value)
    }

    const handleAddDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
        setAddDatePickerValue(dateString)
    }

    const handleDateChange = (date: string) => () => {
        setNewDatePickerValue(date)
        setOldDatePickerValue(date)
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
                {movie.settings.dateViewing.map((dateItem, index) => (
                    <li key={index}>
                        <DateListItem
                            dateItem={dateItem}
                            onListItemClick={handleDateChange}
                            onListItemDelete={handleDateItemDelete(dateItem)}
                        />
                    </li>
                ))}
            </ol>

            {newDatePickerValue && (
                <div>
                    <DatePicker
                        size='small'
                        className={styles.datePicker}
                        value={dayjs(newDatePickerValue)}
                        format={dateFormat}
                        onChange={handleDatePickerChange}
                    />
                    <Button
                        type='link'
                        onClick={handleDateItemUpdate}
                        style={{
                            position: 'absolute',
                            top: 62,
                            left: 270,
                        }}
                    >
                        update date
                    </Button>
                </div>
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