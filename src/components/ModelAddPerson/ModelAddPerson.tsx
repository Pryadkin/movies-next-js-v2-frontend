/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {
    Button,
    Modal,
    Space,
    Typography,
} from 'antd'

import {IPerson, IPersonWithLang, IPersonWithoutLang, TPersonState} from '@/api/apiTypes/requestPerson'
import {isPersonWithoutLang} from '@/helpers'
import {getCorrectPersonWithLang} from '@/helpers/getCorrectPersonWithLang'
import {useSaveProfilePerson} from '@/hooks/useSaveProfilePerson'

import styles from './ModelAddPerson.module.scss'

import {useSearchPerson} from '@/hooks/useSearchPerson'
import {setSelectPerson} from '@/redux/reducers/layoutReducer/layoutSlice'
import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'

enum Text {
    TITLE = 'ADD MOVIE',
    SELECT_LANG_NAME = 'Select the lang name',
    RU = 'ru-RU',
    EN = 'en-EN',
}

interface Props {
    person: TPersonState,
    isModalOpen: boolean,
    onModalCancel: () => void,
}

export const ModelAddPerson = ({
    person,
    isModalOpen,
    onModalCancel,
}: Props) => {
    const dispatch = useAppDispatch()
    const lang = useSelector(getSelectLanguage)
    const anotherLang = lang === Text.EN ? Text.RU : Text.EN
    const {mutationSavePerson} = useSaveProfilePerson()
    const {mutationPersonSearch} = useSearchPerson(anotherLang)
    const {data: anotherLangPerson} = mutationPersonSearch
    const isLoading = mutationPersonSearch.isLoading
    const [anotherLangPersonState, setAnotherLangPersonState] = useState<IPersonWithoutLang | null>(null)
    const personName = (person as IPerson).name || (person as IPersonWithLang).name_ru

    const [correctMovieId, setCorrectMovieId] = useState<number | string>()
    const [isSelectAnotherLangMovie, setIsSelectAnotherLangMovie] = useState(false)

    useEffect(() => {
        if (isModalOpen && person) {
            mutationPersonSearch.mutate({
                searchName: person.original_name,
                page: '1'
            })
        }

        return () => {
            setAnotherLangPersonState(null)
            setIsSelectAnotherLangMovie(false)
        }

    }, [isModalOpen])

    const handleAddAnotherLangPersonClick = (
        currentPerson: IPersonWithoutLang,
        personWithAnotherLang: IPersonWithoutLang
    ): IPersonWithLang => {
        const correctPersonWithLang = getCorrectPersonWithLang(
            currentPerson,
            personWithAnotherLang,
            anotherLang
        )

        dispatch(setSelectPerson(correctPersonWithLang))

        return correctPersonWithLang
    }

    const getAnotherLangPerson = (
        anotherLangPerson: IPersonWithoutLang[] | undefined,
    ) => {
        if (isLoading) return <div>...Loading</div>
        if (anotherLangPerson) {{
            return anotherLangPerson.map(searchPerson => {
                const isCorrectMovie = isSelectAnotherLangMovie && correctMovieId === searchPerson.id
                return (
                    <li
                        key={searchPerson.id}
                        style={{
                            backgroundColor: isCorrectMovie ? 'aquamarine' : '',
                            borderRadius: '5px',
                        }}
                        className={styles.movieTitle}
                        onClick={() => {
                            setAnotherLangPersonState(searchPerson)
                            setCorrectMovieId(searchPerson.id)
                            setIsSelectAnotherLangMovie(true)
                        }}
                    >
                        <div className={styles.titleList}>
                            <p>{searchPerson.name}</p>
                            <p>{`Original: ${searchPerson.original_name}`}</p>
                        </div>
                    </li>
                )
            })
        }
        }
    }

    const handleAddPersonBtnClick = () => {
        const personWithLang = anotherLangPersonState
        && isPersonWithoutLang(person)
        && handleAddAnotherLangPersonClick(person, anotherLangPersonState)

        personWithLang && mutationSavePerson.mutate(personWithLang)
        onModalCancel()
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
            <Space
                direction="vertical"
            >
                {personName}

                <p className={styles.p}>Выберите описание на другом языке</p>

                <ol style={{
                    width: 500,
                    height: 300,
                    overflow: 'scroll',
                    border: '1px solid black',
                    borderRadius: 5,
                    padding: 10,
                    paddingLeft: 30,
                    paddingRight: 50,
                }}>
                    {getAnotherLangPerson(anotherLangPerson)}
                </ol>

                <Button
                    onClick={handleAddPersonBtnClick}
                    disabled={!anotherLangPersonState?.id}
                >
                    Add Person
                </Button>
            </Space>
        </Modal>
    )
}