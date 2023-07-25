import {useEffect, useMemo, useState} from "react"
import {useSelector} from "react-redux"

import {Button, Input, Select, Tag} from "antd"

import {useDeleteTag} from "@/hooks/useDeleteTag"
import {useSaveNewTag} from "@/hooks/useSaveNewTag"
import {addEnableFilters, removeEnableFilters} from "@/redux/reducers"
import {getSelectEnableFilters, getSelectTags} from "@/redux/selectors"

import styles from './Sidebare.module.scss'

import {getSelectTagsForAntSelect} from "@/redux/selectors/profileSelectors"
import {useAppDispatch} from "@/redux/store"

import {useColorToTag} from "../AddTags/useColorToTag"

export const Sidebare = () => {
    const dispatch = useAppDispatch()
    const tags = useSelector(getSelectTags)
    const antSelectTags = useSelector(getSelectTagsForAntSelect)
    const {mutationSave} = useSaveNewTag()
    const {mutationDelete} = useDeleteTag()
    const enableFilters = useSelector(getSelectEnableFilters)
    const tagsWithoutEnable = useMemo(() => {
        return tags.filter(tag => !enableFilters.includes(tag))
    }, [tags, enableFilters])
    const getColorTag = useColorToTag()

    const [inputAddTagValue, setInputAddTagValue] = useState('')
    const [selectRemoveTagValue, setSelectRemoveTagValue] = useState('')

    useEffect(() => {
        console.log('antSelectTags', antSelectTags)
    }, [antSelectTags])

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

    const handleAddNewTagBtnClick = () => {
        mutationSave.mutate(inputAddTagValue)
    }
    const handleRemoveTagBtnClick = () => {
        mutationDelete.mutate(selectRemoveTagValue)
    }

    return (
        <div className={styles.wrapper}>
            <h2>Filtration</h2>

            <div className={styles.addTagWrapper}>
                <Input
                    value={inputAddTagValue}
                    size="small"
                    onChange={e => setInputAddTagValue(e.target.value)}
                />
                <Button
                    size="small"
                    onClick={handleAddNewTagBtnClick}
                >
                add
                </Button>
            </div>
            <div className={styles.addTagWrapper}>
                <Select
                    size="small"
                    style={{width: 100}}
                    // defaultValue={{value: '', label: ''}}
                    options={antSelectTags}
                    onChange={value => setSelectRemoveTagValue(value)}
                />
                <Button
                    size="small"
                    onClick={handleRemoveTagBtnClick}
                >
                remove
                </Button>
            </div>

            <h3>enable filters</h3>

            {enableFilters && getTags(enableFilters, true)}

            <h3>all tags</h3>

            {tagsWithoutEnable && getTags(tagsWithoutEnable)}
        </div>
    )
}