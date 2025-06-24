import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function () {
    const isLogin = useAppStore((state) => state.getTokens);
    const hotel = useAppStore((state) => state.hotel);
    useEffect(() => {
        isLogin();}, []);
    //console.log("Verificando si el usuario esta logueado", hotel);
  return (
    <>
       <div className="bg-amber-500 p-6 rounded-b-2xl shadow-md">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-3">
                <h1 className="text-white font-black text-4xl sm:text-5xl tracking-tight">
                {hotel.name}
                </h1>
                <p className="text-white text-lg sm:text-xl">
                Bienvenido, <span className="font-semibold ">{hotel.administrador_name}</span>
                </p>
                

            </div>
        </div>

        <div className="max-w-5xl mx-auto p-6 container shadow-md rounded-lg bg-white mt-6">
            <div>
                <p>Direccion: {hotel.address}</p>
                <p>Telefono: {hotel.phone}</p>
                <p>Email: {hotel.email}</p>
                <p>Telefono: {hotel.phone}</p>

            </div>
        </div>

    
    </>
)
}
