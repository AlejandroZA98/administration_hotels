import { NavLink,useLocation } from "react-router-dom"

export default function Header() {
  return (
        <header className='bg-[url("/morelia.jpg")] bg-center bg-cover bg-no-repeat h-60  '>
            <div className="mx-auto container px-5 py-10">
                <div className="flex justify-between items-center">


                    <div className="flex items-center gap-4">
                        <img src="/logo.svg" className="h-30" alt="logotipo" />
                    </div>
                    <nav className="flex gap-4">
                        <NavLink to="/" className={({isActive})=>isActive?"text-red-500 text-lg font-bold hover:text-withe":"text-white text-lg font-bold hover:text-gray-300"}>Inicio</NavLink>
                        <NavLink to="/hotels" className={({isActive})=>isActive?"text-red-500 text-lg font-bold hover:text-withe":"text-white text-lg font-bold hover:text-gray-300"}>Hoteles</NavLink>
                    </nav>
                </div>
            </div>
        </header>
)
}
