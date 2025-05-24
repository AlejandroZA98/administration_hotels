import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore"
import { useParams } from "react-router-dom";
import type { Hotel } from "../types";

export default function hotel_detail() {
  const fetchHotel= useAppStore((state)=>state.fetchHotel)
  const hotel = useAppStore((state) => state.hotel);
  const { id } = useParams();
  const showModal = useAppStore((state) => state.showModal);
  // console.log(typeof (id));
  useEffect(() => {
    
      fetchHotel(id as Hotel['id']);
    },[id])
    // console.log("hotel", hotel.id);
  function handleReserve() {
    showModal();
  }
  return (
    <>
   <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 shadow-lg ">
  <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">{hotel.name}</h1>
  </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 max-w-6xl mx-auto bg-white shadow-xl rounded-xl mt-10 my-10">
  <img 
    src="/hotel.jpg" 
    alt={hotel.name} 
    className="rounded-3xl shadow-md hover:scale-105 transition-transform duration-300"
  />

  <div className="space-y-4 text-center md:text-left">
    <p className="text-gray-700 leading-relaxed">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae veritatis tempora provident dicta qui 
      totam dolor, modi iusto impedit dolorum culpa praesentium aliquam ex suscipit, quos tenetur quia magni vitae!
    </p>
    <p className="font-semibold text-lg text-gray-800">Dirección: {hotel.address}</p>
    <p className="font-semibold text-lg text-gray-800">Email: {hotel.email}</p>
    <p className="font-semibold text-lg text-gray-800">Teléfono: {hotel.phone}</p>

    <button 
      type="button" 
      className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow transition-colors w-full"
      onClick={()=> handleReserve()}>
      Reservar Ahora
    </button>
  </div>
  
</div>

    </>

  )
}
