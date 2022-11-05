import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateCashRegister = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateCashRegister),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const cashRegister = await db.cashRegister.create({ data: input });

    return cashRegister;
  }
);
