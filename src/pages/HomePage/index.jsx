import React, {lazy, Suspense} from 'react' 
// import ListProduct from 'components/ListProduct'
import Header from 'components/Header'
import LazyLoad from 'components/LazyLoad'

export default function HomePage(props) {
    const LoadListProduct = lazy(() => import('components/ListProduct'))
    return (
        <> 
            <Suspense fallback={<LazyLoad/>}>
                <Header />
                <LoadListProduct /> 
            </Suspense>  
        </>
    )
}
