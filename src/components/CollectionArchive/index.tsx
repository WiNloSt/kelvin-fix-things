import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

type PostId = number
type PostsLikes = Record<PostId, number>

export type Props = {
  posts: CardPostData[]
  postsLikes: PostsLikes
}

export const CollectionArchive: React.FC<Props> = ({ posts, postsLikes }) => {
  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((post, index) => {
            const postLikes = postsLikes[post.id]
            if (typeof post === 'object' && post !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card
                    className="h-full"
                    doc={post}
                    likes={postLikes}
                    relationTo="posts"
                    showCategories
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
