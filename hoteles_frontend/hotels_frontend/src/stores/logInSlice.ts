import type { StateCreator } from "zustand";
import { createLogin, getHotelInfo } from "../services/HotelServices";
import {createNotificationSlice, type NotificationSliceType } from "./notificationSlice";
import type { Hotel } from "../types";

type dataLoginType = {
    username: string;
    password: string;
    hotel_id: string;
    
}
export type LogInSliceType={
    login: (data: dataLoginType)=>Promise<{ access: string; refresh: string; hotel_id:string} >
    getTokens: ()=>Promise<void>
    hotel: Hotel
}

export const logInSlice:StateCreator<LogInSliceType & NotificationSliceType,[],[],LogInSliceType>=(set,get,api)=>({
    hotel:{
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
    url: "",
    floors: 0,
   
    },
    login: async(data)=>{
        //console.log("Recibiendo data",data)
        const loginAccess= await createLogin(data)

        //console.log("DATOS LOGIN",loginAccess)
        if (loginAccess.access) { 
            //console.log("Login exitoso", loginAccess.access);
            localStorage.setItem("accessToken", loginAccess.access);
            localStorage.setItem("refreshToken", loginAccess.refresh);
            localStorage.setItem("hotel_id", data.hotel_id);
            return loginAccess;

        }
        else{
          //  console.log("Login fallido", loginAccess);
            createNotificationSlice(set,get,api).showNotification({text:'Acceso denegado',error:true}) // Mostrar notificacion de que se elimino de favoritos
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
        return
        

    },
    getTokens: async()=>{
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const hotelId = localStorage.getItem("hotel_id");
        //console.log("Access Token:", accessToken);
        const hotel_Info= await getHotelInfo ({access: accessToken, refresh: refreshToken, hotel_id: hotelId})
        //console.log("INFOOOO",hotel_Info)
        if (hotel_Info){
            set({
                hotel: hotel_Info,
            });
            //localStorage.setItem("hotel", JSON.stringify(get().hotel));
        }
    }
})