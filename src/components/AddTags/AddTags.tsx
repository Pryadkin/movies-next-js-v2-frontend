import {FC, useState} from "react"

import {Space, Tag} from "antd"

interface Props {
    tags: string[]
}

export const AddTags: FC<Props> = ({
    tags,
}) => {
    const [tagColors] = useState(['magenta','red', 'purple', 'blue', 'orange',
        'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'volcano'
    ])
    const [title] = useState('All tags')

    const handleTagClick = (value: string) => () => {
        console.log(value)
    }

    const setColorToTag = () => {
        let firstLetter = null
        let count = 0
        return tags.map(tag => {
            firstLetter = tag.slice(1)

            if (firstLetter !== tag.slice(0)) {
                count++
            }

            return (
                <Tag
                    style={{cursor: 'pointer'}}
                    key={tag}
                    color={tagColors[count]}
                    onClick={handleTagClick(tag)}
                >
                    {tag}
                </Tag>
            )
        })
    }
    return (
        <Space
            direction="vertical"
            size={[0, 8]}
            wrap
        >
            <h2>{title}</h2>
            {setColorToTag()}
        </Space>
    )
}