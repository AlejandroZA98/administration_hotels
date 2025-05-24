import z from "zod";
import { HotelAPIResponseSchema,HotelsAPIResponseSchema,ClientSchema,RoomAPIResponseSchema,RoomsAPIResponseSchema} from "../schemas/hotel-schemas";

export type Hotel = z.infer<typeof HotelAPIResponseSchema>;
export type Hotels = z.infer<typeof HotelsAPIResponseSchema>;
export type Client = z.infer<typeof ClientSchema>;
export type Room = z.infer<typeof RoomAPIResponseSchema>;
export type Rooms = z.infer<typeof RoomsAPIResponseSchema>;