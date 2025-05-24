// define las rutas de las paginas de la aplicacion
import  {BrowserRouter, Route, Routes} from 'react-router-dom'   
import Layout from './layouts/Layout'
import {lazy,Suspense} from 'react'

const IndexPage = lazy(()=> import ('./views/IndexPage'))
const HotelsPage = lazy(()=> import ('./views/hotels'))
const HotelDetailPage = lazy(()=> import ('./views/hotel_detail')) 
const CreateReservationPage = lazy(()=> import ('./views/createReservation'))
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
                    <Route path="/hotel/:id" element={
                        <Suspense fallback="Loading...">
                            <HotelDetailPage/>
                        </Suspense>}/>

                    <Route path="/create_reservation/" element={
                        <Suspense fallback="Loading...">
                            <CreateReservationPage/>
                        </Suspense>}/>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}