import React from 'react'
import LightBulb from './bulb-light-icon.svg'
import { robotoCondense } from '@/app/(frontend)/font'
import clsx from 'clsx'

interface LogoProps {
  className?: string
}
export const Logo = ({ className }: LogoProps) => {
  return (
    <div
      className={clsx(robotoCondense.className, 'text-[32px]', className)}
      style={{ lineHeight: 1 }}
    >
      KELVIN FIX
      <div className="mt-[5px]">
        <LightBulb className={clsx('h-[32px] inline-block mt-[-6px]')} />
        <span className="inline-block ml-3">THINGS</span>
      </div>
    </div>
  )
}
