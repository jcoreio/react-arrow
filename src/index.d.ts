import * as React from 'react'

type Props = {
  shaftWidth: number
  shaftLength: number
  headWidth: number
  headLength: number
  direction: 'left' | 'right' | 'up' | 'down' | 'leftRight' | 'upDown'
  unclosed?: boolean
  transform?: string
}

declare const Arrow: React.ComponentType<Props>
export default Arrow
