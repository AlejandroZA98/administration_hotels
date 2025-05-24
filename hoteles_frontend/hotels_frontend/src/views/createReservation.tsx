import React, { useEffect } from 'react'
import { useAppStore } from '../stores/useAppStore';

export default function createReservation() {
    const hotel = useAppStore((state) => state.hotel);
    const clientRegistered = useAppStore((state) => state.clientInfo);
    const fetchRooms = useAppStore((state) => state.fetchRooms);
    const rooms = useAppStore((state) => state.rooms);
    useEffect(() => {
        fetchRooms(hotel.id)
        }, [hotel]) 
  return (
<>
<div className="min-h-screen flex items-center justify- bg-gray-100">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 max-w-6xl m-auto justify-between bg-white shadow-xl rounded-xl">
    <img 
      src="/hotel.jpg" 
      alt={hotel.name} 
      className="rounded-3xl shadow-md hover:scale-105 transition-transform duration-300"
    />
    
    <div className="space-y-1 text-center md:text-left">
      <h1 className='font-bold text-center text-3xl'>NAME HOTEL {hotel.name}</h1> 
      <p className="font-bold text-center text-lg text-gray-800">Dirección: {hotel.address}</p>
      <p className="font-bold text-center  text-lg text-gray-800">Email: {hotel.email}</p>
      <p className="font-bold text-center  text-lg text-gray-800">Teléfono: {hotel.phone}</p>
      <p className="font-bold text-center  text-lg text-gray-800">Nombre: {clientRegistered.name}</p>
      <p className="font-bold text-center  text-lg text-gray-800">Numero de telefono: {clientRegistered.email}</p>
      <p className="font-bold text-center  text-lg text-gray-800">Email: {clientRegistered.email}</p>
      
      <label htmlFor="room" className="block text-black uppercase font-bold text-lg">Numero de habitacion</label>
      <select name="room" id="room" className='w-full p-3 border border-gray-300 rounded-lg mt-4'>
        <option value="">--Seleccionar--</option>
        {
          rooms.map((room) => (
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
