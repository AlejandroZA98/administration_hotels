import axios from "axios";
import {HotelAPIResponseSchema, HotelsAPIResponseSchema, RoomsAPIResponseSchema} from "../schemas/hotel-schemas";
import type { Hotel } from "../types";

export async function getHotels() {
    const url='http://127.0.0.1:8000/hotels/hotels-list/'
    const data=await axios.get(url)
    const result=HotelsAPIResponseSchema.safeParse(data.data)
    // console.log("DATOS",data)
    // console.log("DATOS2",data.data)
    // console.log("RESULT",result)
    if (result.success) {
        return result.data;
    }

}

export async function getHotel(id: string) {
    const url=`http://127.0.0.1:8000/hotels/hotel-detail/${id}/`
    const data=await axios.get(url)
    const result=HotelAPIResponseSchema.safeParse(data.data)
    // console.log("DATOS",data)
    // console.log("DATOS2",data.data)
    // console.log("RESULT",result)
    if (result.success) {
        return result.data;
    }
}

export async function registerClient(dataClient: any) {
    //console.log("Registering user...", dataClient);
    const url='http://127.0.0.1:8000/clients/register/'
    try{
        const response=await axios.post(url, dataClient)
        //console.log("DATOS",response)
        return response.data
    }catch (error:any) {
        //console.log("Error registering user", error)
        return error.response.data 
        }
}

export async function getRooms(hotelId: Hotel["id"]) {
    console.log("Buscando cuartos...", hotelId);
    const url=`http://127.0.0.1:8000/hotels/rooms-list/${hotelId}/`
    const data=await axios.get(url)
    const result=RoomsAPIResponseSchema.safeParse(data.data)
    console.log("DATOS",data)
    console.log("DATOS2",data.data)
    console.log("RESULT",result)
    if (result.success) {
        console.log("CUARTOS CORRECTOS", result.data)
        return data.data;
    }
    
}