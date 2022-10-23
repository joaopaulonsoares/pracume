import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const CreateOrderPad = z.object({
  holderName: z.string(),
  tableReference: z.string().optional(),
})

export default resolver.pipe(resolver.zod(CreateOrderPad), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const orderPad = await db.orderPad.create({ data: input })

  return orderPad
})
