import { useState } from "react";
import { useAppStore } from "../stores/useAppStore";
import Notification from "../components/Notification";
import { useNavigate } from 'react-router-dom';

export default function LoginUsers() {
  const [isLogin, setIsLogin] = useState(true);
  const login= useAppStore((state)=>state.login)
  const navigate = useNavigate();
  const [dataLogin,setdataLogin]=useState({
    username:'',
    password:''
  })
  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    //console.log("Cambiando",e.target.name, e.target.value);
    setdataLogin({
        ...dataLogin,
        [e.target.name]: e.target.value
    })
  }
  const handleLogin= async(e:React.FormEvent)=>{
    e.preventDefault()
    //console.log("Registreando")
    const loginAcces= await login(dataLogin)
    console.log("DATOS LOGIN",loginAcces);
    if (loginAcces?.access) {
        console.log("Login EXITOSO", loginAcces);
        navigate('/adminhotels/')
     }
  }
  return (
    <>  
    <Notification />
    
    <div className="min-h-screen bg-gray-500 flex flex-col items-center justify-start pt-10">
        {/* BOTON DE INICIO */}
      <div
        className={`w-35 h-10 flex items-center rounded-full cursor-pointer relative transition-all duration-300 ${
          isLogin ? "bg-green-500" : "bg-blue-500"
        }`}
        onClick={() => setIsLogin(!isLogin)}>

        <div className="absolute w-full flex justify-between px-4 text-white font-semibold text-sm z-0">
          <span>Login</span>
          <span>Register</span>
        </div>

        <div
          className={`absolute w-1/2 h-full bg-white rounded-full shadow-md flex items-center justify-center font-bold text-gray-800 text-sm z-10
             transition-transform duration-300 ${
            isLogin ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {isLogin ? "Login" : "Register"}
        </div>
      </div>

          {/* FORMULARIO */}
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "Iniciar sesión" : "Crear cuenta"}
          </h2>

          <form>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Nombre
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  id="name"
                  placeholder="Tu nombre"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Usuario
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                id="username"
                placeholder="usuario123"
                onChange={handleChange}
                value={dataLogin.username}
                name="username"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="password"
                id="password"
                placeholder="********"
                onChange={handleChange}
                value={dataLogin.password}
                name="password"
              />
            </div>

            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="confirm">
                  Confirmar contraseña
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="password"
                  id="confirm"
                  placeholder="********"
                />
              </div>
            )}

            <button
              className={`w-full ${
                isLogin ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
              } text-white p-2 rounded mt-2`}
              type="submit" onClick={handleLogin}
            >
              {isLogin ? "Iniciar sesión" : "Registrarse"}
            </button>
          </form>
        </div>
      </div>
    </div>
      
    </>

  );
}
