export const getCorrectPrice = (price: number) => {
    const arrayPrice = `${price}`.split('')
        .reverse()
        .map((num, index) => {
            const isThirdIndex = index === 0 ? false : (index) % 3 === 0

            return isThirdIndex ? `${num}.` : num
        })

    return arrayPrice.reverse()
        .join('') + '$'
}