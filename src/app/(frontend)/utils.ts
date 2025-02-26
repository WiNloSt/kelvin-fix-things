import { post_likes_relations as postLikesSchema } from '@/payload-generated-schema'
import { count } from '@payloadcms/db-postgres/drizzle'
import type { BasePayload } from 'payload'

export async function getPostsLikes(payload: BasePayload) {
  const db = payload.db.drizzle
  return (
    await db
      .select({
        post: postLikesSchema.post,
        likesCount: count(),
      })
      .from(postLikesSchema)
      .groupBy(postLikesSchema.post)
  ).reduce((acc, postLike) => {
    return {
      ...acc,
      [postLike.post]: postLike.likesCount,
    }
  }, {})
}
