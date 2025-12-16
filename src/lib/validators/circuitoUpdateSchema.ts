import { z } from "zod";
import { circuitoSchema } from "./circuitoSchema";

export const circuitoUpdateSchema = circuitoSchema.partial();
