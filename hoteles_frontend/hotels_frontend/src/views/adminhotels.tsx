import { useEffect, useState, type ChangeEvent } from "react";
import { useAppStore } from "../stores/useAppStore";
import { useStore } from "zustand";

export default function () {
    const isLogin = useAppStore((state) => state.getTokens);
    const hotel = useAppStore((state) => state.hotel);
    const [activeTab, setActiveTab] = useState("general");
    const updateHotel = useAppStore((state) => state.updateHotel);
    useEffect(() => {
        isLogin();}, []);

    //console.log("Verificando si el usuario esta logueado", hotel);
    const [hotelData,setHotelData]= useState({
        name: "",
        address: "",
        phone: "",
        email: "",

        floors: 1,
        total_rooms: 1,

    });
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
   // console.log("Datos del hotel", hotelData);

    const handleChange=(e:ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLSelectElement>)=>{
    console.log("cambiando datos", e.target.name, e.target.value);
    setHotelData({
            ...hotelData,
            [e.target.name]:e.target.value
        })
    }
    const handleupdateHotel = (e: React.FormEvent) => {
    e.preventDefault()
    updateHotel(hotelData)
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
          Servicios
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
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700">Aquí iría la sección de habitaciones 🛏️</p>
            {/* Puedes agregar inputs para `single_rooms`, `double_rooms`, etc. */}
          </div>
        )}

        {activeTab === "services" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700">Aquí iría la sección de servicios ✨</p>
            {/* Inputs de servicios que ofrece el hotel */}
          </div>
        )}
      </div>
    </div>
    </>
)
}
