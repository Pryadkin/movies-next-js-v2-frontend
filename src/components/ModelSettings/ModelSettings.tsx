import React, {useState} from 'react'
import {useSelector} from 'react-redux'

import {
    Input,
    Modal,
    Button,
    Select,
    Space,
    Typography,
} from 'antd'
import Link from 'next/link'

import {useDeleteMovieTags} from '@/hooks/useDeleteMovieTags'
import {useDeleteTag} from '@/hooks/useDeleteTag'
import {useSaveNewTag} from '@/hooks/useSaveNewTag'
import {useUpdateMovieTags} from '@/hooks/useUpdateMovieTags'

import styles from './ModelSettings.module.scss'

import {useUpdateTags} from '@/hooks/useUpdateTags'
import {getSelectTagsForAntSelect} from '@/redux/selectors'

enum Text {
    TITLE = 'SETTINGS',
    TEGS = 'Tags',
    ENTER_TAG_NAME = 'Enter the tag name',
    SELECT_TAG_NAME = 'Select the tag name to delete',
    SELECT_TAG_NAME_TO_REMANE = 'Select the tag name to rename',
}

interface Props {
    isModalOpen: boolean,
    onModalCancel: () => void,
}

export const ModelSettings = ({
    isModalOpen,
    onModalCancel,
}: Props) => {
    const [inputAddTagValue, setInputAddTagValue] = useState<string>('')
    const [inputRenameTagValue, setInputRenameTagValue] = useState<string>('')
    const [selectRemoveTagValue, setSelectRemoveTagValue] = useState('')
    const [selectRenameTagValue, setSelectRenameTagValue] = useState('')
    const antSelectTags = useSelector(getSelectTagsForAntSelect)
    const {mutationSave} = useSaveNewTag()
    const {mutationDelete} = useDeleteTag()
    const {mutationDeleteMovieTags} = useDeleteMovieTags()
    const {mutationTagsUpdate} = useUpdateTags()
    const {mutationMovieTagsUpdate} = useUpdateMovieTags()

    const handleAddNewTagBtnClick = () => {
        mutationSave.mutate({
            tagName: inputAddTagValue,
            color: ''
        })
        setInputAddTagValue('')
    }
    const handleRemoveTagBtnClick = () => {
        mutationDelete.mutate({
            tagName: selectRemoveTagValue,
            color: ''
        })
        mutationDeleteMovieTags.mutate(selectRemoveTagValue)

        setSelectRemoveTagValue('')
    }
    const handleRenameTagBtnClick = () => {
        mutationTagsUpdate.mutate({
            oldTag: selectRenameTagValue,
            newTag: inputRenameTagValue
        })
        mutationMovieTagsUpdate.mutate({
            oldTag: selectRenameTagValue,
            newTag: inputRenameTagValue
        })
        setSelectRenameTagValue('')
        setInputRenameTagValue('')
    }

    return (
        <Modal
            className={styles.modalContainer}
            title={
                <Typography.Title
                    level={3}
                    style={{margin: 0}}
                >
                    {Text.TITLE}
                </Typography.Title>
            }
            open={isModalOpen}
            onCancel={onModalCancel}
            footer={[]}
        >
            <Link
                href={'https://www.themoviedb.org/'}
                target="_blank">
                www.themoviedb.org
            </Link>
            <Space
                direction="vertical"
            >
                <Typography.Title
                    level={4}
                    style={{margin: 0}}
                >
                    {Text.TEGS}
                </Typography.Title>
                <Space.Compact
                    style={{width: '300px'}}
                    size='small'
                >
                    <Input
                        placeholder={Text.ENTER_TAG_NAME}
                        value={inputAddTagValue}
                        onChange={e => setInputAddTagValue(e.target.value)}
                        allowClear
                    />
                    <Button
                        type="primary"
                        onClick={handleAddNewTagBtnClick}
                    >
                        ADD
                    </Button>
                </Space.Compact>

                <Space.Compact
                    style={{width: '300px'}}
                    size='small'
                >
                    <Select
                        size="small"
                        style={{width: '250px'}}
                        value={selectRemoveTagValue || undefined}
                        placeholder={Text.SELECT_TAG_NAME}
                        options={antSelectTags}
                        onChange={value => setSelectRemoveTagValue(value)}
                        allowClear
                    />
                    <Button
                        type="primary"
                        onClick={handleRemoveTagBtnClick}
                    >
                        DELETE
                    </Button>
                </Space.Compact>

                <Space.Compact
                    style={{width: '500px'}}
                    size='small'
                >
                    <Select
                        size="small"
                        style={{width: '230px'}}
                        value={selectRenameTagValue || undefined}
                        placeholder={Text.SELECT_TAG_NAME_TO_REMANE}
                        options={antSelectTags}
                        onChange={value => {
                            setSelectRenameTagValue(value)
                            setInputRenameTagValue(value)
                        }}
                        allowClear
                    />
                    <Button
                        type="primary"
                        onClick={handleRenameTagBtnClick}
                    >
                        RENAME
                    </Button>
                    <Input
                        style={{width: '200px'}}
                        placeholder={Text.ENTER_TAG_NAME}
                        value={inputRenameTagValue}
                        onChange={e => setInputRenameTagValue(e.target.value)}
                        disabled={!selectRenameTagValue}
                        allowClear
                    />
                </Space.Compact>
            </Space>
        </Modal>
    )
}
