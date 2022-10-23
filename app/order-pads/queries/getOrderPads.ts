import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetOrderPadsInput
  extends Pick<Prisma.OrderPadFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetOrderPadsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: orderPads,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.orderPad.count({ where }),
      query: (paginateArgs) =>
        db.orderPad.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            orders: true,
          },
        }),
    })

    return {
      orderPads,
      nextPage,
      hasMore,
      count,
    }
  }
)
