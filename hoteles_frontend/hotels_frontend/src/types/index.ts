import z from "zod";
import { HotelAPIResponseSchema,HotelsAPIResponseSchema } from "../schemas/hotel-schemas";

export type Hotel = z.infer<typeof HotelAPIResponseSchema>;
export type Hotels = z.infer<typeof HotelsAPIResponseSchema>;