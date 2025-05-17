import axios from "axios";
import {HotelAPIResponseSchema, HotelsAPIResponseSchema} from "../schemas/hotel-schemas";

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