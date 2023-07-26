import {FC, useMemo} from "react"
import {useSelector} from "react-redux"

import {Button, Tag} from "antd"

import {addEnableFilters, removeEnableFilters} from "@/redux/reducers"
import {getSelectEnableFilters, getSelectTags} from "@/redux/selectors"
import {useAppDispatch} from "@/redux/store"

import styles from './Sidebare.module.scss'

import {useColorToTag} from "../AddTags/useColorToTag"
interface Props {
    onModalOpen: (value: boolean) => void
}

export const Sidebare: FC<Props> = ({onModalOpen}) => {
    const dispatch = useAppDispatch()
    const tags = useSelector(getSelectTags)

    const enableFilters = useSelector(getSelectEnableFilters)
    const tagsWithoutEnable = useMemo(() => {
        return tags.filter(tag => !enableFilters.includes(tag))
    }, [tags, enableFilters])
    const getColorTag = useColorToTag()

    const handleTagClick = (tagName: string) => () => {
        dispatch(addEnableFilters(tagName))
    }

    const handleEnableFilterClick = (tagName: string) => () => {
        dispatch(removeEnableFilters(tagName))
    }

    const getTags = (t: string[], isEnable?: boolean) => t.map(tag => {
        if (isEnable) {
            return (
                <Tag
                    className={styles.tag}
                    key={tag}
                    color={getColorTag(tag)}
                    onClick={handleEnableFilterClick(tag)}
                >
                    {tag}
                </Tag>
            )
        }
        return (
            <Tag
                className={styles.tag}
                key={tag}
                color={getColorTag(tag)}
                onClick={handleTagClick(tag)}
            >
                {tag}
            </Tag>
        )
    })

    return (
        <div className={styles.wrapper}>
            <h2>Filtration</h2>

            <Button
                size="small"
                onClick={() => onModalOpen(true)}
            >
                SETTINGS
            </Button>

            <h3>enable filters</h3>

            {enableFilters && getTags(enableFilters, true)}

            <h3>all tags</h3>

            {tagsWithoutEnable && getTags(tagsWithoutEnable)}
        </div>
    )
}