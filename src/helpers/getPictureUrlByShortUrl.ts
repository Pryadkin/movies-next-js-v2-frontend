export const getPictureUrlByShortUrl = (
    shortUrl: string,
    quality = 'w300'
) => {
    return shortUrl.includes('https')
        ? shortUrl
        : `https://image.tmdb.org/t/p/${quality}${shortUrl}`
}