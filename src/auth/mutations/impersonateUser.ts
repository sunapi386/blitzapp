import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import * as z from "zod"

export const ImpersonateUserInput = z.object({
  userId: z.number(),
})

export default resolver.pipe(
  resolver.zod(ImpersonateUserInput),
  resolver.authorize(),
  async ({ userId }, ctx) => {
    const user = await db.user.findFirst({ where: { id: userId } })
    if (!user) throw new Error("Could not find user id " + userId)

    await ctx.session.$create({
      userId: user.id,
      role: user.role as Role,
      // orgId: user.organizationId,
      impersonatingFromUserId: ctx.session.userId,
    })

    return user
  }
)
