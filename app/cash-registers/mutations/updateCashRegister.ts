import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateCashRegister = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateCashRegister),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const cashRegister = await db.cashRegister.update({ where: { id }, data });

    return cashRegister;
  }
);
