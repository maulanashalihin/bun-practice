import type { Config } from "drizzle-kit";
 
export default {
  schema: "./models",
  out: "./migrations"
} satisfies Config;