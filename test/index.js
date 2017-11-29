// @flow

import * as React from 'react'
import {describe, it} from 'mocha'
import {mount} from 'enzyme'
import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })


import {expect} from 'chai'

import Arrow from '../src/index'

describe('Arrow', () => {
  describe('down', () => {
    it('works', () => {
      const comp = mount(<Arrow direction="down" shaftWidth={10} shaftLength={10} headWidth={30} headLength={15} />)
      const svg = comp.find('svg')
      const style = svg.prop('style')
      expect(style.width).to.equal(30)
      expect(style.height).to.equal(25)
      expect(svg.prop('preserveAspectRatio')).to.equal('xMidYMid meet')
      expect(svg.prop('viewBox')).to.equal('-15 -10 30 25')
      expect(comp.find('path').prop('d')).to.equal(`M-5,-10
L-5,0
L-15,0
L0,15
L15,0
L5,0
L5,-10 z`)
    })
  })
  describe('up', () => {
    it('works', () => {
      const comp = mount(<Arrow direction="up" shaftWidth={10} shaftLength={10} headWidth={30} headLength={15} />)
      const svg = comp.find('svg')
      const style = svg.prop('style')
      expect(style.width).to.equal(30)
      expect(style.height).to.equal(25)
      expect(svg.prop('preserveAspectRatio')).to.equal('xMidYMid meet')
      expect(svg.prop('viewBox')).to.equal('-15 -15 30 25')
      expect(comp.find('path').prop('d')).to.equal(`M-5,10
L-5,0
L-15,0
L0,-15
L15,0
L5,0
L5,10 z`)
    })
  })
  describe('left', () => {
    it('works', () => {
      const comp = mount(<Arrow direction="left" shaftWidth={10} shaftLength={10} headWidth={30} headLength={15} />)
      const svg = comp.find('svg')
      const style = svg.prop('style')
      expect(style.width).to.equal(25)
      expect(style.height).to.equal(30)
      expect(svg.prop('preserveAspectRatio')).to.equal('xMidYMid meet')
      expect(svg.prop('viewBox')).to.equal('-15 -15 25 30')
      expect(comp.find('path').prop('d')).to.equal(`M10,-5
L0,-5
L0,-15
L-15,0
L0,15
L0,5
L10,5 z`)
    })
  })
  describe('right', () => {
    it('works', () => {
      const comp = mount(<Arrow direction="right" shaftWidth={10} shaftLength={10} headWidth={30} headLength={15} />)
      const svg = comp.find('svg')
      const style = svg.prop('style')
      expect(style.width).to.equal(25)
      expect(style.height).to.equal(30)
      expect(svg.prop('preserveAspectRatio')).to.equal('xMidYMid meet')
      expect(svg.prop('viewBox')).to.equal('-10 -15 25 30')
      expect(comp.find('path').prop('d')).to.equal(`M-10,-5
L0,-5
L0,-15
L15,0
L0,15
L0,5
L-10,5 z`)
    })
  })
  it('passes correct props to svg and path elements', () => {
    const onClick = () => {}
    const comp = mount(
      <Arrow
          direction="down"
          shaftWidth={10}
          shaftLength={10}
          headWidth={30}
          headLength={15}
          unclosed
          onClick={onClick}
          fill="blue"
          stroke="red"
          strokeWidth={2}
          style={{position: 'relative'}}
      />
    )
    const svg = comp.find('svg')
    expect(svg.prop('onClick')).to.equal(onClick)
    expect(svg.prop('unclosed')).not.to.exist
    expect(svg.prop('direction')).not.to.exist
    expect(svg.prop('shaftWidth')).not.to.exist
    expect(svg.prop('shaftLength')).not.to.exist
    expect(svg.prop('headWidth')).not.to.exist
    expect(svg.prop('headLength')).not.to.exist
    expect(svg.prop('fill')).not.to.exist
    expect(svg.prop('stroke')).not.to.exist
    expect(svg.prop('strokeWidth')).not.to.exist

    const style = svg.prop('style')
    expect(style.position).to.equal('relative')
    expect(style.width).to.equal(30)
    expect(style.height).to.equal(25)

    const path = comp.find('path').at(1)
    expect(path.prop('fill')).to.equal('blue')
    expect(path.prop('stroke')).to.equal('red')
    expect(path.prop('strokeWidth')).to.equal(4) // doubled to simulate stroke-alignment: inside
    expect(path.prop('d')).not.to.match(/ z$/)
  })
  it('simulates stroke-alignment:inside', () => {
    const comp = mount(
      <Arrow
          direction="down"
          shaftWidth={10}
          shaftLength={10}
          headWidth={30}
          headLength={15}
          stroke="red"
          strokeWidth={2}
      />
    )
    const clipPath = comp.find('clipPath').find('path')
    expect(clipPath.prop('d')).to.equal(`M-5,-10
L-5,0
L-15,0
L0,15
L15,0
L5,0
L5,-10 z`)
    const mainPath = comp.find('path').at(1)
    expect(mainPath.prop('strokeWidth')).to.equal(4)
  })
  it('simulates stroke-alignment:inside when strokeWidth is not given', () => {
    const comp = mount(
      <Arrow
          direction="down"
          shaftWidth={10}
          shaftLength={10}
          headWidth={30}
          headLength={15}
          stroke="red"
      />
    )
    const clipPath = comp.find('clipPath').find('path')
    expect(clipPath.prop('d')).to.equal(`M-5,-10
L-5,0
L-15,0
L0,15
L15,0
L5,0
L5,-10 z`)
    const mainPath = comp.find('path').at(1)
    expect(mainPath.prop('strokeWidth')).to.equal(2)
  })
  it('applies transform to both path and defs', () => {
    const transform = "rotate(45)"
    const comp = mount(
      <Arrow
          direction="down"
          shaftWidth={10}
          shaftLength={10}
          headWidth={30}
          headLength={15}
          stroke="red"
          transform={transform}
      />
    )
    const svg = comp.find('svg')
    const defs = svg.find('defs')
    expect(defs.prop('transform')).to.equal(transform)
    const g = comp.find('g')
    expect(g.prop('transform')).to.equal(transform)
    expect(g.find('path').prop('d')).to.equal(`M-5,-10
L-5,0
L-15,0
L0,15
L15,0
L5,0
L5,-10 z`)
  })
  it('allows style.width and style.height to be overridden', () => {
    const comp = mount(
      <Arrow
          direction="down"
          shaftWidth={10}
          shaftLength={10}
          headWidth={30}
          headLength={15}
          style={{width: 3, height: 4}}
      />
    )
    const svg = comp.find('svg')
    const style = svg.prop('style')
    expect(style.width).to.equal(3)
    expect(style.height).to.equal(4)
  })
})

