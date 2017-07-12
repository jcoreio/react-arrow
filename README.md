# react-arrow

[![Build Status](https://travis-ci.org/jcoreio/react-arrow.svg?branch=master)](https://travis-ci.org/jcoreio/react-arrow)
[![Coverage Status](https://coveralls.io/repos/github/jcoreio/react-arrow/badge.svg?branch=master)](https://coveralls.io/github/jcoreio/react-arrow?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

a simple svg arrow component

## Usage

```sh
npm install --save react-arrow
```

```js
import React from 'react'
import Arrow from 'react-arrow'

const element = (
  <Arrow
      direction="down"
      shaftWidth={10}
      shaftLength={10}
      headWidth={30}
      headLength={15}
      fill="blue"
      stroke="red"
      strokeWidth={2}
      onClick={() => alert('You clicked the arrow!')}
  />
)
```

## Geometry

```
<----- head  width ----->
            ^                 ^
           / \                |
          /   \               |
         /     \              |
        /       \             |
       /         \
      /           \      head length
     /             \
    /               \         |
   /                 \        |
  /                   \       |
 /                     \      |
/___                 ___\     v
    |               |         ^
    |               |         |
    |               |         |
    |               |         |
    |               |
    |               |    shaft length
    |               |
    |               |         |
    |               |         |
    |               |         |
    |_______________|         v
    <- shaft width ->
```

## Props

##### `direction: 'left' | 'right' | 'up' | 'down'` **(required)**

The direction you want the arrow to point

##### `shaftWidth: number` **(required)**

The width of the arrow's shaft

##### `shaftLength: number` **(required)**

The length of the arrow's shaft

##### `headWidth: number` **(required)**

The width of the arrow's head (from one side of the triangle's base to the other)

##### `headLength: number` **(required)**

The length of the arrow's head (from the base to the tip of the triangle)

##### `unclosed: boolean`

If `true`, the path will be left unclosed.

### Other SVG props

*Most* props applicable to the `<path>` element will be passed down to it.  Any other props besides the aforementioned
props will be passed down to the `<svg>` element.  For the list of props that will be passed to the `<path>` element,
see `pathProps` in the source code.

### `stroke` note

If you provide a `stroke`, `Arrow` simulates the proposed `stroke-alignment: inside` property by doubling the
`strokeWidth` and applying a `clip-path` with a unique id.

### `transform` note

`Arrow` doesn't currently go to the trouble to pick the correct `viewBox`, `style.width`, and `style.height` to fit the
arrow if you provide a `transform` property.
