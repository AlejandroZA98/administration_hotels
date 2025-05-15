import type { Hotel } from "../types";
type HotelsDetailProps = {
    hotel: Hotel
}
export default function HotelsDetail({hotel}:HotelsDetailProps) {
  return (
    <div className='bg-blue-100 shadow-lg rounded-xl p-6 max-w-lg mx-auto'>
        <p className='font-bold text-3xl  text-center'>{hotel.name}</p>
        <img src="/hotel.jpg" alt="" className="hover:scale-105 transition-transform rounded-2xl"/>
        <div className="flex flex-col justify-center items-center pt-5">
          <p className='text-center font-bold '>{hotel.address}</p>
          <p className="text-center font-bold">Email: {hotel.email}</p>
          <p className="text-center font-bold">No.Telefonico: {hotel.phone}</p>
        </div>
        <div className="flex justify-center ">
            <button type="button" className="text-center font-bold bg-orange-500 rounded-lg 
            hover:bg-orange-500 mt-5 w-full p-3  text-white text-lg">Ver Hotel</button>

        </div>

    </div>
  )
}
