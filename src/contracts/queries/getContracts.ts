import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetContractsInput
  extends Pick<Prisma.ContractFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetContractsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: contracts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.contract.count({ where }),
      query: (paginateArgs) => db.contract.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      contracts,
      nextPage,
      hasMore,
      count,
    }
  }
)
