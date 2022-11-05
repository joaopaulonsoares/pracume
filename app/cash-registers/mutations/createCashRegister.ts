import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

export default resolver.pipe(resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const cashRegister = await db.cashRegister.create({ data: { isClosed: false } })

  return cashRegister
})
