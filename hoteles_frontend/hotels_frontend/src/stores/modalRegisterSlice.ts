import type { StateCreator } from "zustand";
import type { Client } from "../types";
import { registerClient } from "../services/HotelServices";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";

export type ModalRegisterSliceType = {
registerClient: (data: Client) => Promise<void>
clientInfo: Client
loadClientFromStorage: () => void
}
export const createModalRegisterSlice: StateCreator<ModalRegisterSliceType & NotificationSliceType,[],[],ModalRegisterSliceType> = (set,get,api) => ({
    clientInfo: {
        id: '',
        name: '',
        email: '',
        phone: ''
    },
    registerClient: async (dataClient) => {
        //console.log("Registering user...", dataClient);
        const data = await registerClient(dataClient);
        //console.log("DATOS", data)
        // return data;
        if (data.id) {
            createNotificationSlice(set,get,api).showNotification({text:'Usuario registrado correctamente',error:false}) // Mostrar notificacion de que se elimino de favoritos
            set({
                clientInfo:{
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone
                }
            })
            localStorage.setItem("clientInfo", JSON.stringify(get().clientInfo));
             setTimeout(() => {
                
                    set({
                        notification: {
                            show: false,
                            text: "",
                            error: false
                        }
                    })
             
                }, 3000)
        } else {
            //console.log("ERROR", data.details)
            if (data.details.email && !data.details.phone) {
                set({
                    notification: {
                        show: true,
                        text: "Cliente ya registrado con este correo",
                        error: true
                    }
                })
                setTimeout(() => {
                    set({
                        notification: {
                            show: false,
                            text: "",
                            error: true
                        }
                    })
             
                }, 3000)
               
            }
            else if (data.details.phone && !data.details.email) {
                 set({
                    notification: {
                        show: true,
                        text: "Cliente ya registrado con este numero",
                        error: true
                    }
                })
                setTimeout(() => {
               set({
                        notification: {
                            show: false,
                            text: "",
                            error: false
                        }
                    })
                }, 3000)
               
            }else if (data.details.email && data.details.phone) {
                 set({
                    notification: {
                        show: true,
                        text: "Cliente ya registrado",
                        error: false
                    }
                })
                // FALTA BUSCAR EL CLIENTE
                setTimeout(() => {
                   set({
                        notification: {
                            show: false,
                            text: "",
                            error: false
                        }
                    })
                }, 3000)
                
            }
             
            
        }
     
    },
    loadClientFromStorage: () => {
    const clientInfo = localStorage.getItem("clientInfo");
    if (clientInfo) {
        set({
            clientInfo: JSON.parse(clientInfo)
        })
    }

}
})