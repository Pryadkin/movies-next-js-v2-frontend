import {Provider} from 'react-redux'

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import type {AppProps} from 'next/app'
import dynamic from 'next/dynamic'

const Layout = dynamic(import('@/components/Layout/Layout'), {ssr: false})
import {store} from '@/redux/store'

import '../styles/globals.scss'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
})

const MyApp = ({Component, pageProps}: AppProps) => (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
        <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
)

export default MyApp
