
import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";
import HotelsDetail from "../components/HotelsDetail";

export default function hotels() {
  const hotels = useAppStore((state) => state.hotels);
  const fetchHotels = useAppStore((state) => state.fetchHotels);
  useEffect(() => {
      fetchHotels();
  },[])
  console.log("hoteles",hotels);

  return (
    <>
     <div>
        <h1 className="text-4xl p-6 bg-blue-400 font-bold align-baseline flex justify-center">Reserva Ahora</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {
                hotels.map((hotel) => (
                    <HotelsDetail
                    key={hotel.id}
                    hotel={hotel}></HotelsDetail>
                ))
            }
        </div>
        
    </div>
    </>

  )
}
