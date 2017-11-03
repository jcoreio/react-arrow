// @flow

import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Arrow from '../src/index'

const props = {
  shaftLength: 20,
  shaftWidth: 10,
  headWidth: 30,
  headLength: 20,
  fill: 'blue',
  stroke: 'red',
}

storiesOf('Arrow', module)
  .add('left', () => <Arrow direction="left" {...props} />)
  .add('right', () => <Arrow direction="right" {...props} />)
  .add('up', () => <Arrow direction="up" {...props} />)
  .add('down', () => <Arrow direction="down" {...props} />)
  .add('rotated', () => <Arrow direction="down" transform="rotate(45)" {...props} />)
  .add('multiple', () => (
    <div>
      <Arrow direction="down" {...props} />
      <Arrow direction="right" {...props} strokeWidth={5} />
    </div>
  ))
