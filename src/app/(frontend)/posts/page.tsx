import type { Metadata } from 'next/types'
import { post_likes_relations as postLikesSchema } from '@/payload-generated-schema'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { count } from '@payloadcms/db-postgres/drizzle'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      createdAt: true,
    },
  })

  const db = payload.db.drizzle
  const postsLikes = (
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

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
          <p>
            Hi! Welcome to my blog posts where I publish a fun and hopefully relatable story every
            week about how I improve my everyday live as a househusband, engineer, and soon-to-be
            father.
          </p>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} postsLikes={postsLikes} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Posts',
  }
}
