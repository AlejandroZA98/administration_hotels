import { useAppStore } from "../stores/useAppStore";
import type { Reservation } from "../types";
import { useNavigate } from 'react-router-dom';


type ReservationsDetailProps = {
    reservation: Reservation
}
export default function ReservationDetail({reservation}:ReservationsDetailProps) {
    //const fetchHotel= useAppStore((state)=>state.fetchHotel)
  
//   const navigate = useNavigate();
//   function handleClick() {
//     //await fetchHotel(hotel.id);

//     navigate(`/hotel/${hotel.id}` );
//   }
  return (
    <div className='bg-blue-100 shadow-lg rounded-xl p-6 max-w-lg  mx-auto'>
        <p className='font-bold text-3xl  text-center'>Para: {reservation.client_name}</p>
        <div className="flex flex-col justify-center pt-3 items-center ">
                <p className='text-center text-sm font-bold mt-2'>Reservacion: {reservation.id}</p>
                <p className='text-center text-sm font-bold mt-2 '>Email: {reservation.client_email}</p>
                <p className='text-center text-sm font-bold mt-2 '>Telefono: {reservation.client_phone}</p>
                <p className="text-center  text-sm font-bold mt-2">Status: {reservation.status}</p>
                <p className="text-center  text-sm font-bold mt-2">Habitacion: {reservation.room_info}</p>

        </div>
        <div className="flex justify-center flex-col items-center">
            <button type="button" className="text-center font-bold bg-green-500 rounded-lg 
            hover:bg-green-600 mt-5 w-full p-3  text-white text-lg cursor-pointer">Aceptar reservacion</button>
            <button type="button" className="text-center font-bold bg-red-500 rounded-lg 
            hover:bg-red-600 mt-5 w-full p-3  text-white text-lg cursor-pointer">Cancelar reservacion</button>
        </div>

    </div>
  )
}
