import {Provider} from 'react-redux'

import type {AppProps} from 'next/app'

import {store} from '@/redux/store'

import Layout from '../components/Layout'

import '../styles/globals.scss'

const MyApp = ({Component, pageProps}: AppProps) => (
    <Provider store={store}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </Provider>
)

export default MyApp
