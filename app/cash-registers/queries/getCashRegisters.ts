import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetCashRegistersInput
  extends Pick<
    Prisma.CashRegisterFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCashRegistersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: cashRegisters,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.cashRegister.count({ where }),
      query: (paginateArgs) =>
        db.cashRegister.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      cashRegisters,
      nextPage,
      hasMore,
      count,
    };
  }
);
