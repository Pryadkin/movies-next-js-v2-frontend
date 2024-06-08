import {useMutation, useQueryClient} from "@tanstack/react-query"

import {API} from "@/api"
import {IPersonWithLang} from "@/api/apiTypes/requestPerson"
import {RequestUrl} from "@/api/requestUrlList"

export const useSaveProfilePerson = () => {
    const queryClient = useQueryClient()
    const savePerson = async (value: IPersonWithLang) => {
        await API.requestSavePerson(value)
    }

    const mutationSavePerson = useMutation({
        mutationFn: (value: IPersonWithLang) => savePerson(value),
        onSuccess: () => queryClient.invalidateQueries({queryKey: [RequestUrl.GET_PROFILE_PERSONS]})
    })

    return {mutationSavePerson}
}
