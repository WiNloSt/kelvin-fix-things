import type { ColumnBlock as ColumnBlockProps } from 'src/payload-types'

import React from 'react'
import RichText from '@/components/RichText'

type Props = {} & ColumnBlockProps

export const ColumnBlock: React.FC<Props> = ({ leftColumn, rightColumn }) => {
  console.log({ leftColumn, rightColumn })
  return (
    <div className="grid auto-cols-fr md:grid-flow-col md:gap-8 -my-5">
      <RichText data={leftColumn} enableGutter={false} enableProse={false} />
      <RichText
        className="-mt-5 md:mt-0"
        data={rightColumn}
        enableGutter={false}
        enableProse={false}
      />
    </div>
  )
}
