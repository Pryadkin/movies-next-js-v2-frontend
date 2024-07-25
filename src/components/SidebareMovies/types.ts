export const releaseDateTitle = 'by release date'
export const dateOfViewingTitle = 'by date of viewing'



export type TSortName = 'release_date' | 'date_of_viewing'

export interface ISelectSort {
    name: TSortName,
    title: typeof releaseDateTitle | typeof dateOfViewingTitle
}

export const sortOptions: ISelectSort[] = [{
    name: 'release_date',
    title: releaseDateTitle
},{
    name: 'date_of_viewing',
    title: dateOfViewingTitle
}]