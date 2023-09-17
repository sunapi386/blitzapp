import { z } from "zod"

export const CreateContractSchema = z.object({
  name: z.string(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateContractSchema = CreateContractSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteContractSchema = z.object({
  id: z.number(),
})
