import type { StateCreator } from "zustand";
import type { Client, Hotel, Reservation } from "../types";
import { createReservation } from "../services/HotelServices";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";

export type ReservationType = {
    createReservation: (data: Reservation )=> Promise<void>
    clientInfo: Client
    hotel: Hotel
    
}

export const createReservationSlice: StateCreator<ReservationType&NotificationSliceType, [], [], ReservationType> = (set, get,api) => ({
 clientInfo: {
        id: '',
        name: '',
        email: '',
        phone: ''
    },
    hotel:{
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
    url: "",
    floors: 0,
   
},
    createReservation: async (dataReservation) => {
    //console.log("Creando reservacion:", dataReservation);
   
    const data= await createReservation(dataReservation)
    if (data.id) {
        set({
                clientInfo:{
                    id: '',
                    name: '',
                    email: '',
                    phone: ''
                }
            })
        set({
            hotel: {
                id: "",
                name: "",
                address: "",
                email: "",
                phone: "",
                url: "",
                floors: 0,
            }
        })
        localStorage.setItem("hotel", JSON.stringify(get().hotel));
        localStorage.setItem("clientInfo", JSON.stringify(get().clientInfo));
        createNotificationSlice(set,get,api).showNotification({text:'Reservacion creada correctamente',error:false}) // Mostrar notificacion de que se elimino de favoritos
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


})