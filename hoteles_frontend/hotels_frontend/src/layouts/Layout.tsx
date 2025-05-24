import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Notification from '../components/Notification'

export default function Layout() {

    return(
        <>
        <Header></Header>
        {/* Outlet genera las vistas hijas */}
        <main className='bg-gray-100 min-h-screen'>
        <Outlet></Outlet> 
        </main>
        <Modal></Modal>
        <Notification />

        </>
    )
}