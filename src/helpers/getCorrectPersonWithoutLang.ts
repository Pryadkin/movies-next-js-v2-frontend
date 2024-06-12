import {IPerson} from '@/api/apiTypes/requestPerson'

import {getPictureUrlByShortUrl} from './getPictureUrlByShortUrl'

export const getCorrectPersonWithoutLang = (
    data: IPerson[],
): IPerson[] => {
    const resWithPicturs = data.filter(elem => elem.profile_path)
    const updatePersons: IPerson[] = resWithPicturs.map(elem => {
        const getImageUrl = (url: string) => {
            return url ? getPictureUrlByShortUrl(elem.profile_path, 'w500') : ''
        }

        const updateRes = {
            ...elem,
            id: elem.id,
            name: elem.name,
            original_title: elem.original_name,
            profile_path: getImageUrl(elem.profile_path),
            settings: {
                tags: [],
            }
        }

        return updateRes
    })

    return updatePersons
}