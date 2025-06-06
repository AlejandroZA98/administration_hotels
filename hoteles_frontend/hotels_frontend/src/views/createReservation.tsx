import { useEffect, useState, type ChangeEvent } from 'react'
import { useAppStore } from '../stores/useAppStore';
import type { Rooms } from '../types';

export default function createReservation() {
    const hotel = useAppStore((state) => state.hotel);
    const clientRegistered = useAppStore((state) => state.clientInfo);
    const fetchRooms = useAppStore((state) => state.fetchRooms);
    const rooms = useAppStore((state) => state.rooms);
    const [filterRooms,setRoomsFilter]=useState<Rooms>([]);
    useEffect(() => {
        fetchRooms(hotel.id)
        }, [hotel]) 

    const filteringRooms=(e:ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLSelectElement>)=>{
      console.log("Filtrando habitaciones",e.target.value) 
      const filteredRooms= rooms.filter((room) => room.room_type === e.target.value && room.status === 'available');
      setRoomsFilter(filteredRooms);
    }
  return (
<>
<div className=" flex justify-center items-center pt-10   bg-gray-100">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 max-w-6xl m-auto justify-between bg-white shadow-xl rounded-xl">
    <img 
      src="/hotel.jpg" 
      alt={hotel.name} 
      className="rounded-3xl shadow-md hover:scale-105 transition-transform duration-300"
    />
    
    <div className="space-y-1 text-center md:text-left">
      <h1 className='font-bold text-center text-3xl'>{hotel.name}</h1> 
      <p className="font-bold text-center text-lg text-gray-800">Dirección: {hotel.address}</p>
      <p className="font-bold text-center  text-lg text-gray-800">Email: {hotel.email}</p>
      <p className="font-bold text-center  text-lg text-gray-800">Teléfono: {hotel.phone}</p>
      <p className="font-bold text-center  text-lg text-gray-800 mt-5 bg-green-300"> DATOS DE CLIENTE</p>
      <p className="font-bold text-center  text-lg text-gray-800">Nombre: {clientRegistered.name}</p>
      <p className="font-bold text-center  text-lg text-gray-800">Numero de telefono: {clientRegistered.phone}</p>
      <p className="font-bold text-center  text-lg text-gray-800">Email: {clientRegistered.email}</p>
      
      <label htmlFor="room_type" className='block text-black uppercase font-bold text-lg pt-5 mt-3'>Tipo de habitacion</label>
      <select name="room_type" id="room_type" className='w-full p-3 border border-gray-300 rounded-lg' onChange={filteringRooms}>
        <option value="">--Seleccionar--</option>
        <option value="single">Individual</option>
        <option value="double">Doble</option>
        <option value="suite">Suite</option>
      </select>
    <label htmlFor="floor" className="block text-black uppercase font-bold text-lg mt-3">Piso</label>
      <select name="floor" id="floor" className='w-full p-3 border border-gray-300 rounded-lg '>
        <option value="">--Seleccionar--</option>
        {
          filterRooms.map((room) => (
            <option key={room.id} value={room.floor}>
              {room.room_number}
              
            </option>
          ))
          
        }
      </select>

      <label htmlFor="room" className="block text-black uppercase font-bold text-lg mt-3">Numero de habitacion</label>
      <select name="room" id="room" className='w-full p-3 border border-gray-300 rounded-lg '>
        <option value="">--Seleccionar--</option>
        {
          filterRooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.room_number}
              
            </option>
          ))
          
        }
      </select>
      
      <button 
        type="button" 
        className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow transition-colors w-full"
      >
        Confirmar Reservacion
      </button>
    </div>
  </div>
</div>


</>

)
}
