import {useState} from "react"

export const useColorToTag = () => {
    let firstLetter = ''
    let count = 0
    const [tagColors] = useState(['magenta','red', 'purple', 'blue', 'orange',
        'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'volcano'
    ])

    return function (tagName: string) {
        if (tagName?.slice(0, 1) !== firstLetter) {
            count += 1
            firstLetter = tagName?.slice(0, 1)
        }

        return tagColors[count]
    }

}