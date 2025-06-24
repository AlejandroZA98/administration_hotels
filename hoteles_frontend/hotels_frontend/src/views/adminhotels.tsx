import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function () {
    const isLogin = useAppStore((state) => state.getTokens);
    useEffect(() => {
        isLogin();}, []);
    //console.log("Verificando si el usuario esta logueado", isLogin);
  return (
    <>
        <div className='flex  justify-center'>
            <div className='bg-white '>
                <h2 className='text-2xl font-bold mb-4 mt-4 text-center'>Admin Hotels</h2>
                <div>
                    <p className='text-lg text-gray-700'>Esta pagina es para administrar los hoteles, puedes crear, editar y eliminar hoteles.</p>
                </div>
            </div>
        </div>
    
    </>
)
}
