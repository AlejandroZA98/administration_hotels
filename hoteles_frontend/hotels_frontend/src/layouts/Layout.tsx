import {Outlet} from 'react-router-dom'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Notification from '../components/Notification'
import { useAppStore } from '../stores/useAppStore'
import { useEffect } from 'react'

export default function Layout() {
    const loadHotelFromStorage = useAppStore((state) => state.loadHotelFromStorage);
    const loadClientFromStorage = useAppStore((state) => state.loadClientFromStorage);

    useEffect(() => {
        loadHotelFromStorage()
        loadClientFromStorage();    
    },[])
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