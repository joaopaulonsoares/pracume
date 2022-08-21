import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateIngredient = z.object({
  name: z.string(),
  unitMeasurement: z.string(),
  quantity: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateIngredient),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const ingredient = await db.ingredient.create({ data: input })

    return ingredient
  }
)
