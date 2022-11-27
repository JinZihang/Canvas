import React, { useState, useEffect } from 'react'
import './Canvas.css'

type Dimension = { width: number; height: number }
type Resizer = 'R' | 'B' | 'BR' | undefined
type Coordinate = { x: number; y: number }

/**
 * @param {number} canvasWidth - Width of the canvas in pixels.
 * @param {number} canvasHeight - Height of the canvas in pixels.
 * The resizable parameter has higher priority than horResizable and verResizable.
 * @param {boolean} [resizable=false] - Whether the canvas is resizable.
 * @param {boolean} [horResizable=false] - Whether the canvas is resizable in the horizontall direction.
 * @param {boolean} [verResizable=false] - Whether the canvas is resizable in the horizontall direction.
 * Constraints of the resizing action:
 * @param {number} [canvasMinWidth=100] - The minimum width of the canvas.
 * @param {number} [canvasMinHeight=100] - The minimum height of the canvas.
 * @param {number} [canvasMaxWidth=900] - The maximum width of the canvas.
 * @param {number} [canvasMaxHeight=900] - The maximum height of the canvas.
 */
export default function Canvas(props: {
  canvasWidth: number
  canvasHeight: number
  resizable?: boolean
  horResizable?: boolean
  verResizable?: boolean
  canvasMinWidth?: number
  canvasMinHeight?: number
  canvasMaxWidth?: number
  canvasMaxHeight?: number
}) {
  const [canvasDim, setCanvasDim] = useState({
    width: props.canvasWidth,
    height: props.canvasHeight,
  })
  const [resizer, setResizer] = useState<Resizer>()
  const [befResizingCanvasDim, setBefResizingCanvasDim] = useState<Dimension>()
  const [befResizingCursorPos, setBefResizingCursorPos] = useState<Coordinate>()
  const canvasDimConstraints = {
    minWidth: props.canvasMinWidth ? props.canvasMinWidth : 100,
    minHeight: props.canvasMinHeight ? props.canvasMinHeight : 100,
    maxWidth: props.canvasMaxWidth ? props.canvasMaxWidth : 900,
    maxHeight: props.canvasMaxHeight ? props.canvasMaxHeight : 900,
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (resizer) {
        const newDim = {
          width: Math.min(
            Math.max(
              befResizingCanvasDim!.width + (event.clientX - befResizingCursorPos!.x),
              canvasDimConstraints.minWidth,
            ),
            canvasDimConstraints.maxWidth,
          ),
          height: Math.min(
            Math.max(
              befResizingCanvasDim!.height + (event.clientY - befResizingCursorPos!.y),
              canvasDimConstraints.minHeight,
            ),
            canvasDimConstraints.maxHeight,
          ),
        }
        setCanvasDim({
          width: resizer === 'B' ? canvasDim.width : newDim.width,
          height: resizer === 'R' ? canvasDim.height : newDim.height,
        })
      }
    }

    const handleMouseUp = () => {
      if (resizer) setResizer(undefined)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  })

  const startResizing = (event: React.MouseEvent, resizer: Resizer) => {
    setBefResizingCanvasDim({ ...canvasDim })
    setBefResizingCursorPos({ x: event.clientX, y: event.clientY })
    setResizer(resizer)
  }

  const renderResizers = () => {
    const resizerRStyle = {
      left: `${canvasDim.width}px`,
      height: `${canvasDim.height - 5}px`,
    }
    const resizerBStyle = {
      top: `${canvasDim.height}px`,
      width: `${canvasDim.width - 5}px`,
    }
    const resizerBRStyle = {
      top: `${canvasDim.height}px`,
      left: `${canvasDim.width}px`,
    }

    return (
      <>
        {(props.resizable || props.horResizable) && (
          <div className='resizer resizer-r' style={resizerRStyle} onMouseDown={(event) => startResizing(event, 'R')} />
        )}
        {(props.resizable || props.verResizable) && (
          <div className='resizer resizer-b' style={resizerBStyle} onMouseDown={(event) => startResizing(event, 'B')} />
        )}
        {props.resizable && (
          <div
            className='resizer resizer-br'
            style={resizerBRStyle}
            onMouseDown={(event) => startResizing(event, 'BR')}
          />
        )}
      </>
    )
  }

  return (
    <div className='react-canvas-container'>
      <svg className='react-canvas' width={canvasDim.width} height={canvasDim.height}>
        <line x1='6' y1='66' x2='233' y2='250' stroke='black' />
      </svg>
      {renderResizers()}
    </div>
  )
}
