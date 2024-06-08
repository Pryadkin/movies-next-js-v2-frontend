/* eslint-disable @typescript-eslint/no-unused-vars */
import {IPersonWithLang, IPersonWithoutLang} from "@/api/apiTypes/requestPerson"
import {TLanguage} from '@/types'

type TKeyName = 'name'

const deleteExtraValueFromPerson = (person: any) => {
    const {
        name,
        ...rest
    } = person

    return rest
}

export const getCorrectPersonWithLang = (
    currentPerson: IPersonWithoutLang,
    persWithAnotherLang: IPersonWithoutLang,
    lang: TLanguage
) => {
    const getValueWithLang = (keyName: TKeyName) => {
        if (lang === 'ru-RU') {
            return ({
                [`${keyName}_en`]: currentPerson[keyName],
                [`${keyName}_ru`]: persWithAnotherLang[keyName],
            })
        }
        return ({
            [`${keyName}_en`]: persWithAnotherLang[keyName],
            [`${keyName}_ru`]: currentPerson[keyName],
        })
    }

    const addLangValueToPerson = {
        ...persWithAnotherLang,
        ...getValueWithLang('name'),
        settings: currentPerson.settings,
    }

    const correctPersonWithLang = deleteExtraValueFromPerson(addLangValueToPerson) as IPersonWithLang

    return correctPersonWithLang
}