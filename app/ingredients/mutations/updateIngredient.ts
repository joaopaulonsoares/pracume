import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateIngredient = z.object({
  id: z.number(),
  name: z.string(),
  unitMeasurement: z.string(),
  quantity: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateIngredient),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const ingredient = await db.ingredient.update({ where: { id }, data })

    return ingredient
  }
)
