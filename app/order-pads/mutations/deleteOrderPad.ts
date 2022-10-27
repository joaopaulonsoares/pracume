import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteOrderPad = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteOrderPad),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const orderPad = await db.orderPad.deleteMany({ where: { id } });

    return orderPad;
  }
);
