import { useEffect, useState, type ChangeEvent } from 'react'
import { useAppStore } from '../stores/useAppStore';
import type { Rooms } from '../types';
import { useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function createReservation() {
    const hotel = useAppStore((state) => state.hotel);
    const clientRegistered = useAppStore((state) => state.clientInfo);
    const fetchRooms = useAppStore((state) => state.fetchRooms);
    const rooms = useAppStore((state) => state.rooms);
    const [filterRooms,setRoomsFilter]=useState<Rooms>([]);

    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const navigate = useNavigate();

    const createReservation = useAppStore((state) => state.createReservation);
    const [filters, setFilters] = useState({
        room_type: '',
        floor: '',
        room: '',
    });
    const [reservationData, setReservationData] = useState({
        hotel: hotel.id,
        client: clientRegistered.id,
        room:'',
        floor: 0,
        check_in_date: '', // Fecha actual new Date().toISOString().split('T')[0]
        check_out_date:'', // Fecha de mañana
    });
    useEffect(() => {
        fetchRooms(hotel.id)
        }, [hotel]) 

    const filteringRooms=(e:ChangeEvent<HTMLSelectElement>)=>{
      // console.log("Filtrando habitaciones",e.target.value) 
      const { name, value } = e.target;
      const updatedFilters = {
        ...filters,
        [name]: value
      }
      setFilters(updatedFilters);

    const filtered = rooms.filter((room) => { // filtra las habitaciones segun 
    const matchesType = updatedFilters.room_type ? room.room_type === updatedFilters.room_type : false; 
    const matchesFloor = updatedFilters.floor ? room.floor === parseInt(updatedFilters.floor) : false;
    const isAvailable = room.status === 'available';

    return matchesType && matchesFloor && isAvailable;
     });

    setRoomsFilter(filtered);

    
    setReservationData({
          ...reservationData,
          room: updatedFilters.room != '' ? updatedFilters.room : '',
          floor: updatedFilters.floor? parseInt(updatedFilters.floor): 0,
         
        })
 
    }
    useEffect(() => {
        if (checkInDate) {
            setReservationData((prevData) => ({
                ...prevData,
                check_in_date: checkInDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
                check_out_date: checkOutDate ? checkOutDate.toISOString().split('T')[0] : '', // Formato YYYY-MM-DD
            }));
        }}, [checkInDate,checkOutDate]);

    
   
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       // console.log("Formulario enviado");
        createReservation(reservationData)
        setReservationData({
            hotel: '',
            client: '',
            room: '',
            floor: 0,

            check_in_date: '', // Fecha actual new Date().toISOString().split('T')[0]
            check_out_date: '', // Fecha de mañana
        });
        setFilters({
            room_type: '',
            floor: '',
            room: '',
        });
      setTimeout(() => {
                
      navigate(`/hotels` );
      }, 1000)


    };
  return (
<>
<form className=" flex justify-center items-center pt-10   bg-gray-100" onSubmit={handleSubmit}>
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
      <select name="floor" id="floor" className='w-full p-3 border border-gray-300 rounded-lg' value={reservationData.floor} onChange={filteringRooms}>
        <option value="">--Seleccionar--</option>
        {Array.from({ length: hotel.floors }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}

      </select>

      <label htmlFor="room" className="block text-black uppercase font-bold text-lg mt-3" >Numero de habitacion</label>
      <select name="room" id="room" className='w-full p-3 border border-gray-300 rounded-lg 'value={reservationData.room} onChange={filteringRooms}>
        <option value="">--Seleccionar--</option>
        {
          filterRooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.room_number}
              
            </option>
          ))
          
        }
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col">
          <label htmlFor="check_in_date" className="text-gray-700 font-semibold mb-2">
            Fecha de entrada
          </label>
          <DatePicker
            selected={checkInDate}
            onChange={(date: Date | null) => setCheckInDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Selecciona una fecha"
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="check_out_date" className="text-gray-700 font-semibold mb-2">
            Fecha de salida
          </label>
          <DatePicker
            selected={checkOutDate}
            onChange={(date: Date | null) => setCheckOutDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Selecciona una fecha"
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      
      
      <button 
        type="submit" 
        className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow transition-colors w-full"
      >
        Confirmar Reservacion
      </button>
    </div>
  </div>
</form>


</>

)
}
