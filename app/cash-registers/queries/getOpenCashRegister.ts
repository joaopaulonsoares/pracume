import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

export default resolver.pipe(resolver.authorize(), async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const cashRegister = await db.cashRegister.findFirst({ where: { isClosed: false } })

  if (!cashRegister) throw new NotFoundError()

  return cashRegister
})
