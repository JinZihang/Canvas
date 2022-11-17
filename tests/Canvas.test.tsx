import React from 'react'
import { render } from '@testing-library/react'
import 'jest-canvas-mock'

import Canvas from '../src/components/Canvas'

describe('Render Canvas', () => {
  it('Canvas gets rendered without crashing.', () => {
    render(<Canvas />)
  })
})
