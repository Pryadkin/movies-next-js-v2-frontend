import {useEffect} from 'react'

import {Card} from 'antd'
import Search from 'antd/es/input/Search'

import {API} from '../api'

import styles from './searchMovies.module.scss'

const {Meta} = Card

const SearchMovies = () => {
    console.log('Search')
    // useEffect(() => {
    //     API.getMovies('one', true, '1')
    // }, [])
    const handleMoviesSearch = (value: string) => {
        API.getMovies(value, true, '1')
    }
    return (
        <div className={styles.searchWrapper}>
            <Search
                className={styles.searchInput}
                placeholder="input movie name"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleMoviesSearch}
            />
            <div className={styles.cardWrapper}>
                <Card
                    hoverable
                    style={{width: 240}}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
            </div>
        </div>

    )
}

export default SearchMovies
