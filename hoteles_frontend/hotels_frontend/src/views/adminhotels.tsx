import { useEffect, useState, type ChangeEvent } from "react";
import { useAppStore } from "../stores/useAppStore";
import { useStore } from "zustand";
import ReservationDetail from "../components/ReservationDetail";

export default function () {
    const isLogin = useAppStore((state) => state.getTokens);
    const hotel = useAppStore((state) => state.hotel);
    const [activeTab, setActiveTab] = useState("general");
    const updateHotel = useAppStore((state) => state.updateHotel);
    const createRoom = useAppStore((state) => state.fetchCreateRoom);
    const getReservations = useAppStore((state) => state.getReservations);
    const reservations = useAppStore((state) => state.reservations);
    const [hotelData,setHotelData]= useState({
        name: "",
        address: "",
        phone: "",
        email: "",

        floors: 1,
        total_rooms: 1,

    });
    const [roomData,setroomData]=useState({
        room_type: "",
        floor: 0,
        room_number: 0,
    })
     const [status, setStatus] = useState('');
    useEffect(() => {
        isLogin();}, []);

    useEffect(() => {
    if (hotel) {
      setHotelData({
        name: hotel.name,
        address: hotel.address,
        phone: hotel.phone,
        email: hotel.email,
        floors: hotel.floors,
        total_rooms: hotel.total_rooms??0,});
    }
  }, [hotel]);

    useEffect(() => {
        getReservations(status);
    }, [status]);


    const handleChange=(e:ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLSelectElement>)=>{
    setHotelData({
            ...hotelData,
            [e.target.name]:e.target.value
        })
    }
    const handleupdateHotel = (e: React.FormEvent) => {
    e.preventDefault()
    updateHotel(hotelData)
    }

    const handleChangeRoom = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setroomData({
            ...roomData,
            [e.target.name]: e.target.value
        });
    }
    const handlecreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
   // console.log("Creando habitacion", );
    const create_Room= createRoom(roomData);
    setroomData({
              room_type: "",
              floor: 0,
              room_number: 0,
          });
      }
    const filteringStatus = (e: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      //console.log("Filtrando status", name, value);
      setStatus(value);
      // setStatus(updatedFilters);      
    }
      
  
    
  return (
    <>


      <div className="max-w-5xl mx-auto mt-6">
      {/* Encabezado del hotel */}
      <div className="bg-amber-500 p-6 rounded-b-2xl shadow-md text-center">
        <h1 className="text-white font-black text-4xl sm:text-5xl tracking-tight">
          {hotel.name}
        </h1>
        <p className="text-white text-lg sm:text-xl">
          Bienvenido, <span className="font-semibold">{hotel.administrador_name}</span>
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex justify-center mt-6 space-x-6 border-b pb-2">
        <button
          onClick={() => setActiveTab("general")}
          className={`text-lg font-semibold pb-2 ${
            activeTab === "general" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
          }`}
        >
          Datos generales
        </button>
        <button
          onClick={() => setActiveTab("rooms")}
          className={`text-lg font-semibold pb-2 ${
            activeTab === "rooms" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
          }`}
        >
          Habitaciones
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`text-lg font-semibold pb-2 ${
            activeTab === "services" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
          }`}
        >
          Soliciudes de reservaciones
        </button>
      </div>

      {/* Contenido de las pestañas */}
      <div className="mt-4">
        {activeTab === "general" && (
          <form className="bg-white p-6 rounded-lg shadow space-y-5">
            {/* Dirección */}
            <div>
              <label htmlFor="address" className="block text-xl font-bold mb-1">
                Dirección:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                name="address"
                value={hotelData.address}
                onChange={handleChange}
              />
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="phone" className="block text-xl font-bold mb-1">
                Teléfono:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                name="phone"
                value={hotelData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xl font-bold mb-1">
                Email:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="email"
                name="email"
                value={hotelData.email}
                onChange={handleChange}
              />
            </div>

            {/* Pisos */}
            <div>
              <label htmlFor="floors" className="block text-xl font-bold mb-1">
                Pisos:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="number"
                name="floors"
                value={hotelData.floors}
                onChange={handleChange}
              />
            </div>

            {/* Total de Cuartos */}
            <div>
              <label htmlFor="total_rooms" className="block text-xl font-bold mb-1">
                Total de cuartos:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded cursor-not-allowed"
                type="number"
                name="total_rooms"
                value={hotelData.total_rooms}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                onClick={handleupdateHotel}
              >
                Guardar cambios
              </button>
            </div>
          </form>
        )}

        {activeTab === "rooms" && (
          <div className="bg-white p-6 rounded-lg shadow mt-4">
            {/* Puedes agregar inputs para `single_rooms`, `double_rooms`, etc. */}
            <p className="text-gray-700"> Crea habitaciones para tus clientes</p>
            <form >
            <label htmlFor="room_type" className='block text-black uppercase font-bold text-lg pt-5 mt-3'>Tipo de habitacion</label>
            <select name="room_type" id="room_type" className='w-full p-3 border border-gray-300 rounded-lg' onChange={handleChangeRoom} value={roomData.room_type}>
              <option value="">--Seleccionar--</option>
              <option value="single">Individual</option>
              <option value="double">Doble</option>
              <option value="suite">Suite</option>

            </select>
            <label htmlFor="floor" className="block text-xl font-bold mt-3">
                Piso:
            </label>
            <input
                className="w-full p-2 border border-gray-300 rounded "
                type="room"
                name="floor"
                onChange={handleChangeRoom}
                value={roomData.floor}

            />

            <label htmlFor="floor" className="block text-xl font-bold mt-3">
                Numero de habitacion:
            </label>
            <input
                className="w-full p-2 border border-gray-300 rounded"
                type="number"
                name="room_number"
                onChange={handleChangeRoom}
                value={roomData.room_number}

            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                onClick={handlecreateRoom}
              >
                Crear habitacion
              </button>
            </div>
</form>
          </div>
        )}

        {activeTab === "services" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700">Acepta o rechaza reservaciones</p>

            <div className="flex flex-col items-end mt-4 space-y-2">
              <label 
                htmlFor="status" 
                className="text-black uppercase font-bold text-lg tracking-wide"
              >
                Status
              </label>

              <select
                name="status"
                id="status"
                className="p-3 w-48 border bg-blue-400 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                onChange={filteringStatus}
              >
                <option value="">Todas</option>
                <option value="canceled">Cancelada</option>
                <option value="pending">Pendiente</option>
                <option value="aproved">Aprobada</option>
              </select>
            </div>


            
            <div className="grid  grid-cols-3 gap-6">
              {
                  reservations.map((reservation) => (
                      <ReservationDetail
                      key={reservation.id}
                      reservation={reservation}
                      ></ReservationDetail>
                    
                  ))
              }
              </div>
            {/* Inputs de servicios que ofrece el hotel */}
          </div>
        )}
      </div>
    </div>
    </>
)

}