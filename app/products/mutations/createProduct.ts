import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateProduct = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
})

export default resolver.pipe(resolver.zod(CreateProduct), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const product = await db.product.create({ data: input })

  return product
})
