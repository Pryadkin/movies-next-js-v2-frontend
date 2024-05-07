import {Spin as SpinAntd} from 'antd'

import styles from './Spin.module.scss'

export const Spin = () => {
    return (
        <SpinAntd
            size="large"
            className={styles.spinWrapper}
        />
    )
}