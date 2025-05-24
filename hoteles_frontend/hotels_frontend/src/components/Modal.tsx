import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState, type ChangeEvent } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { useNavigate } from 'react-router-dom';

export default function Modal() {
    const [clientInfo, setClientInfo] = useState({
        id: '',
        name: '',
        email: '',
        phone: ''
    });
    const modal= useAppStore((state) => state.modal);
    const closeModal= useAppStore((state) => state.hideModal);
    const registerClient= useAppStore((state) => state.registerClient);
    const clientRegistered= useAppStore((state) => state.clientInfo);
      const navigate = useNavigate();

  const handleChange=(e:ChangeEvent <HTMLInputElement>| ChangeEvent<HTMLSelectElement>)=>{
      //  console.log(e.target.name, e.target.value);
        setClientInfo({
            ...clientInfo,
            [e.target.name]:e.target.value
        })
    }
  useEffect(() => {
          if (clientRegistered.id) {
            console.log("CLIENTE REGISTRADO (efectivamente):", clientRegistered)
            navigate(`/create_reservation/`);
            console.log("NAVEGANDO A RESERVA")
          }
        }, [clientRegistered]) 

    function handleRegister() {
        registerClient(clientInfo)
        console.log( "REGISTRO")
        closeModal()
        // if (clientRegistered.id) {
        //     console.log("CLIENTE REGISTRADO:", clientRegistered)
        //     navigate(`/hotel/create_reservation/` );

        // }      
         // setClientInfo({
        //     name: '',
        //     email: '',
        //     phone: ''
        // })
    

    }
    return (
    <>
    
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                    RERGISTRATE
                  </Dialog.Title>
                 <form action="">
                    <div className='mb-5'>
                      <label htmlFor="name" className='text-gray-700 font-bold'>Nombre</label>
                      <input type="text" id='name' name='name' placeholder='Nombre' onChange={handleChange} value={clientInfo.name} className='mt-2 w-full p-3 border rounded-xl bg-gray-50'/>
                    </div>
                    <div className='mb-5'>
                      <label htmlFor="email" className='text-gray-700 font-bold'>Email</label>
                      <input type="email" id='email' name='email' placeholder='Email' onChange={handleChange} value={clientInfo.email} className='mt-2 w-full p-3 border rounded-xl bg-gray-50'/>
                    </div>
                    <div className='mb-5'>
                      <label htmlFor="phone" className='text-gray-700 font-bold'>Teléfono</label>
                      <input type="tel" id='phone' name='phone' placeholder='Teléfono' onChange={handleChange} value={clientInfo.phone} className='mt-2 w-full p-3 border rounded-xl bg-gray-50'/>
                    </div>
                    <div className='mt-5 flex justify-between gap-4'>
                    <button
                        type='button' onClick={closeModal} className='w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow hover:bg-gray-500' >Cerrar
                    </button>
                    <button
                        type='button' className='w-full rounded bg-orange-500 p-3 font-bold uppercase text-white shadow
                         hover:bg-orange-600' onClick={handleRegister}
                       >Registrar
                    </button>
                  </div>

                 </form>
                 
                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    
    
    
    </>

)
}
