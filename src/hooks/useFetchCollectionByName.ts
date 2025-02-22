import { API } from '@/api';
import { RequestUrl } from '@/api/requestUrlList';
import { useQuery } from '@tanstack/react-query';

export const useFetchCollectionByName = (collectionName: string) => {
    console.log('collectionName', collectionName)
    const fetchCollectionByName = async () => {
        if (!collectionName) {
            return null
        }

        const res = await API.requestCollectionByName(collectionName);
        if (res) {
            return res.data
        }
        return null;
    };

    const { data, error, isLoading, isSuccess } = useQuery({
        queryKey: [RequestUrl.GET_COLLECTION_BY_NAME, collectionName],
        queryFn: fetchCollectionByName,
        enabled: !!collectionName,
    });

    return { collection: data, error, isLoading, isSuccess };
};