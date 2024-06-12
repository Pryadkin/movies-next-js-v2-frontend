/* eslint-disable @typescript-eslint/no-unused-vars */
import {IPersonWithLang, IPersonWithoutLang} from "@/api/apiTypes/requestPerson"
import {IArtistDetails, IPersonDetailsWithouLang} from "@/api/apiTypes/responseArtistDetails"
import {TLanguage} from '@/types'

type TKeyName = 'name' | 'biography' | 'place_of_birth'

const deleteExtraValueFromPerson = (person: any) => {
    const {
        name,
        biography,
        place_of_birth,
        ...rest
    } = person

    return rest
}

export const getPersonArtistsWithLang = (
    person: IArtistDetails,
    persWithAnotherLang: IArtistDetails,
    lang: TLanguage
) => {
    const getValueWithLang = (keyName: TKeyName) => {
        if (lang === 'ru-RU') {
            return ({
                [`${keyName}_en`]: person[keyName],
                [`${keyName}_ru`]: persWithAnotherLang[keyName],
            })
        }
        return ({
            [`${keyName}_en`]: persWithAnotherLang[keyName],
            [`${keyName}_ru`]: person[keyName],
        })
    }

    const addLangValueToPerson = {
        ...persWithAnotherLang,
        ...getValueWithLang('name'),
        ...getValueWithLang('biography'),
        ...getValueWithLang('place_of_birth'),
        settings: {
            tags: []
        },
    }

    const correctPersonWithLang = deleteExtraValueFromPerson(addLangValueToPerson) as IPersonWithLang

    return correctPersonWithLang
}