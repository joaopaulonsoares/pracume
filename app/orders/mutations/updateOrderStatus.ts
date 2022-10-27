import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateOrderStatus = z.object({
  id: z.number(),
  status: z.enum(["OPEN", "PREPARING", "READY", "DELIVERED", "CANCELED"]),
})

export default resolver.pipe(
  resolver.zod(UpdateOrderStatus),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const order = await db.order.update({ where: { id }, data })

    return order
  }
)
