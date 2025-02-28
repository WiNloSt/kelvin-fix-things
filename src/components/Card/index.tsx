'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'id' | 'slug' | 'categories' | 'meta' | 'title' | 'createdAt'>

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'short',
  timeZone: 'Asia/Bangkok',
})

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
  likes?: number
}> = ({ className, doc, relationTo, showCategories, title: titleFromProps, likes }) => {
  const { card, link } = useClickableCard({})

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn('border border-border rounded-lg bg-card hover:cursor-pointer', className)}
      ref={card.ref}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}

        {doc?.createdAt && (
          <div className="text-secondary-foreground">
            <span>{dateFormat.format(new Date(doc.createdAt))}</span>
            {/* {likes && likes > 0 ? (
              <span className="ml-2">
                <IconHeartFilled size={18} className="inline-block align-text-top" />
                {likes}
              </span>
            ) : (
              <span className="ml-2 relative">
                <IconHeart size={18} className="inline-block align-text-top peer" />
                <div className="text-foreground border rounded px-2 py-1 inline-block bg-background absolute w-[280px] top-[-40px] left-0 -translate-x-1/2 z-10 invisible peer-hover:visible">
                  Be the first person to like this post!
                </div>
              </span>
            )} */}
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
