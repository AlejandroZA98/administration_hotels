// define las rutas de las paginas de la aplicacion
import  {BrowserRouter, Route, Routes} from 'react-router-dom'   
import Layout from './layouts/Layout'
import {lazy,Suspense} from 'react'

const IndexPage = lazy(()=> import ('./views/IndexPage'))

const HotelsPage = lazy(()=> import ('./views/hotels'))
 
export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes> 
                {/* La ruta Layout se comparte en todas las vistas*/}
                <Route element={<Layout></Layout>}>
                    <Route path='/' element={
                        <Suspense fallback="Loading...">
                            <IndexPage/>
                        </Suspense>} />
                        
                    <Route path="/hotels" element={
                        <Suspense fallback="Loading...">
                            <HotelsPage/>
                        </Suspense>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}