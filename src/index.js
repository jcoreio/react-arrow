// @flow

import * as React from 'react'

import type {Direction, Side, Axis} from 'isotrope'
import {oppositeSide, oppositeAxis, signumOf, sideInDirection, axisFor, loSide, hiSide} from 'isotrope'

type Props = {
  shaftWidth: number,
  shaftLength: number,
  headWidth: number,
  headLength: number,
  direction: 'left' | 'right' | 'up' | 'down',
  unclosed?: boolean,
  transform?: string,
}

const ownProps: {[key: string]: boolean} = {
  shaftWidth: true,
  shaftLength: true,
  headWidth: true,
  headLength: true,
  direction: true,
  unclosed: true,
  transform: true,
}

const pathProps: {[key: string]: boolean} = {
  alignmentBaseline: true,
  baselineShift: true,
  clip: true,
  clipPath: true,
  clipRule: true,
  color: true,
  cursor: true,
  direction: true,
  display: true,
  dominantBaseline: true,
  enableBackground: true,
  fill: true,
  fillOpacity: true,
  filter: true,
  floodColor: true,
  floodOpacity: true,
  mask: true,
  opacity: true,
  overflow: true,
  pointerEvents: true,
  shapeRendering: true,
  stopColor: true,
  stopOpacity: true,
  stroke: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeLinecap: true,
  strokeLinejoin: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
  visibility: true,
}

const pointFns: {[direction: Direction]: (x: number, y: number) => string} = {
  left: (x, y) => (-x) + ',' + y,
  right: (x, y) => x + ',' + y,
  up: (x, y) => y + ',' + (-x),
  down: (x, y) => y + ',' + x,
}

let nextId = 0

export default class Arrow extends React.Component<Props> {
  static defaultProps: Props;
  _id: number = nextId++

  render(): React.Node {
    const {props} = this
    const {shaftWidth, shaftLength, headWidth, headLength, unclosed, direction, transform} = props

    const side = sideInDirection[direction]
    const sideSignum = signumOf[side]
    const axis: Axis = axisFor[side]
    const oaxis: Axis = oppositeAxis[axis]

    const bounds: { [side: Side]: number } = {}

    bounds[side] = headLength * sideSignum
    bounds[oppositeSide[side]] = -shaftLength * sideSignum
    bounds[loSide[oaxis]] = -headWidth / 2
    bounds[hiSide[oaxis]] = headWidth / 2

    const point = pointFns[direction]

    const pathd = `M${point(-shaftLength, -shaftWidth / 2)}
L${point(0, -shaftWidth / 2)}
L${point(0, -headWidth / 2)}
L${point(headLength, 0)}
L${point(0, headWidth / 2)}
L${point(0, shaftWidth / 2)}
L${point(-shaftLength, shaftWidth / 2)}${unclosed ? '' : ' z'}`

    const width = bounds.right - bounds.left
    const height = bounds.bottom - bounds.top

    const propsForPath = {d: pathd}
    const propsForSvg: Object = {
      viewBox: `${bounds.left} ${bounds.top} ${width} ${height}`,
      preserveAspectRatio: "xMidYMid meet",
    }

    for (let key in props) {
      if (pathProps[key]) propsForPath[key] = props[key]
      else if (!ownProps[key]) propsForSvg[key] = props[key]
    }
    const clipPathId = `react-arrow-stroke-clip-${this._id}`
    if (propsForPath.stroke && !propsForPath.clipPath) {
      // double the stroke width and clip it to simulate stroke-alignment="inside"
      if (propsForPath.strokeWidth != null) propsForPath.strokeWidth *= 2
      else propsForPath.strokeWidth = 2
      propsForPath.clipPath = `url(#${clipPathId})`
    }
    const style = propsForSvg.style = (propsForSvg.style ? {...propsForSvg.style} : {})
    if (style.width == null) style.width = width
    if (style.height == null) style.height = height

    return (
      <svg {...propsForSvg}>
        {propsForPath.stroke && <defs transform={transform}>
          <clipPath id={clipPathId}>
            <path d={pathd} />
          </clipPath>
        </defs>}
        {transform
          ? <g transform={transform}><path {...propsForPath} /></g>
          : <path {...propsForPath} />
        }
      </svg>
    )
  }
}

