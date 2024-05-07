import {FC, useState} from 'react'

import {CloseOutlined} from '@ant-design/icons'
import {Tag} from 'antd'

import styles from './SetMovieDate.module.scss'

interface Props {
    dateItem: string,
    onListItemClick: (date: string) => () => void,
    onListItemDelete: () => void,
}

export const DateListItem: FC<Props> = ({
    dateItem,
    onListItemClick,
    onListItemDelete,
}) => {
    const [isShow, setIsShow] = useState(false)

    const closeIcon = isShow && (
        <CloseOutlined
            rev={undefined}
        />
    )

    return (
        <div
            onMouseOver={() => setIsShow(true)}
            onMouseLeave={() => setIsShow(false)}
        >
            <Tag
                className={styles.dateListItem}
                color={isShow ? 'cyan' : ''}
                onClick={onListItemClick(dateItem)}
            >
                {dateItem}
            </Tag>
            <span
                style={{paddingLeft: 5}}
                onClick={onListItemDelete}
                className={styles.closeIcon}
            >
                {closeIcon}
            </span>
        </div>
    )
}