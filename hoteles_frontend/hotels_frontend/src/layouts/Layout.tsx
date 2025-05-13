import {Outlet} from 'react-router-dom'
import Header from '../components/Header'

export default function Layout() {

    return(
        <>
        <Header></Header>
        {/* Outlet genera las vistas hijas */}
        <Outlet></Outlet> 
        </>
    )
}