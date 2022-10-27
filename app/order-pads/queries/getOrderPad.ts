import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetOrderPad = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetOrderPad), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const orderPad = await db.orderPad.findFirst({
    where: { id },
    include: {
      orders: true,
    },
  })

  if (!orderPad) throw new NotFoundError()

  return orderPad
})
