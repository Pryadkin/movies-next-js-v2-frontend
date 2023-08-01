import {Spin as SpinAntd} from 'antd'

import styles from './Spin.module.scss'

export const Spin = () => {
    return (
        <div className={styles.wrapper}>
            <SpinAntd size="large"/>
        </div>
    )
}