/* eslint-disable react-hooks/exhaustive-deps */
import {useState} from 'react'
import {useSelector} from 'react-redux'

import {
    Button,
    Modal,
    Space,
    Typography,
} from 'antd'

import {IPersonWithLang} from '@/api/apiTypes/requestPerson'
import {IArtistDetails} from '@/api/apiTypes/responseArtistDetails'
import {getPersonArtistsWithLang} from '@/helpers/getPersonArtistsWithLang'
import {useFetchArtistDetails} from '@/hooks/useFetchArtistDetails'

import styles from './ModelAddPerson.module.scss'

import {useSaveProfilePerson} from '@/hooks/useSaveProfilePerson'
import {getSelectLanguage} from '@/redux/selectors/layoutSelectors'
import {useAppDispatch} from '@/redux/store'

enum Text {
    TITLE = 'ADD MOVIE',
    SELECT_LANG_NAME = 'Select the lang name',
    RU = 'ru-RU',
    EN = 'en-EN',
}

interface Props {
    person: IArtistDetails,
    isModalOpen: boolean,
    onModalCancel: () => void,
}

export const ModelAddPerson = ({
    person,
    isModalOpen,
    onModalCancel,
}: Props) => {
    const lang = useSelector(getSelectLanguage)
    const anotherLang = lang === Text.EN ? Text.RU : Text.EN
    const {mutationSavePerson} = useSaveProfilePerson()
    const {data: anotherLangPerson, isFetching} = useFetchArtistDetails(person.id, anotherLang)
    const [anotherLangPersonState, setAnotherLangPersonState] = useState<IArtistDetails | null>(null)
    const personName = (person as IArtistDetails).name

    const [correctMovieId, setCorrectMovieId] = useState<number | string>()
    const [isSelectAnotherLangMovie, setIsSelectAnotherLangMovie] = useState(false)

    const handleAddAnotherLangPersonClick = (
        currentPerson: IArtistDetails,
        personWithAnotherLang: IArtistDetails
    ): IPersonWithLang => {
        const correctPersonWithLang = getPersonArtistsWithLang(
            currentPerson,
            personWithAnotherLang,
            anotherLang
        )

        return correctPersonWithLang
    }

    const getAnotherLangPerson = (
        anotherLangPerson: IArtistDetails | undefined | null,
    ) => {
        if (isFetching) return <div>...Loading</div>
        if (anotherLangPerson) {{
            const isCorrectMovie = isSelectAnotherLangMovie && correctMovieId === anotherLangPerson.id
            return (
                <li
                    key={anotherLangPerson.id}
                    style={{
                        backgroundColor: isCorrectMovie ? 'aquamarine' : '',
                        borderRadius: '5px',
                    }}
                    className={styles.movieTitle}
                    onClick={() => {
                        setAnotherLangPersonState(anotherLangPerson)
                        setCorrectMovieId(anotherLangPerson.id)
                        setIsSelectAnotherLangMovie(true)
                    }}
                >
                    <div className={styles.titleList}>
                        <p>{anotherLangPerson.name}</p>
                        <p>{`Original: ${anotherLangPerson.name}`}</p>
                    </div>
                </li>
            )

        }
        }
    }

    const handleAddPersonBtnClick = () => {
        const personWithLang = anotherLangPersonState
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