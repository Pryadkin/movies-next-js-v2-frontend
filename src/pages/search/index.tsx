import {useDispatch} from 'react-redux'

import {Input} from 'antd'

const {Search} = Input

import {getMovies} from '@/modules/reducers'

import styles from './Search.module.scss'

const SearchMovies = () => {
    const dispatch = useDispatch()
    const handleMoviesSearch = (value: string) => {
        dispatch<any>(getMovies(value, true, '1'))
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
            {/* <div className={styles.cardWrapper}>
                <Card
                    hoverable
                    style={{width: 240}}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
            </div> */}
        </div>

    )
}

export default SearchMovies
