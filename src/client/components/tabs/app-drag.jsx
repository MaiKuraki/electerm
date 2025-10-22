import { useEffect, useRef } from 'react'

export default function AppDrag (props) {
  const isDraggingRef = useRef(false)

  function canOperate (e) {
    const {
      target
    } = e
    const { classList = [] } = target || {}
    if (
      !classList.contains('app-drag') &&
      !classList.contains('tabs-inner') &&
      !classList.contains('tabs-wrapper')
    ) {
      window.pre.runSync('windowMove', false)
      return false
    }
    return true
  }

  function onMouseDown (e) {
    // e.stopPropagation()
    if (canOperate(e)) {
      isDraggingRef.current = true
      window.pre.runSync('windowMove', true)
    }
  }

  function onMouseUp (e) {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      window.pre.runSync('windowMove', false)
    }
  }

  function onDoubleClick (e) {
    e.stopPropagation()
    if (!canOperate(e)) {
      return
    }
    const {
      isMaximized
    } = window.store
    if (isMaximized) {
      window.pre.runGlobalAsync('unmaximize')
    } else {
      window.pre.runGlobalAsync('maximize')
    }
  }

  useEffect(() => {
    // Listen for mouseup at document level to catch mouseup outside window
    document.addEventListener('mouseup', onMouseUp)
    window.addEventListener('contextmenu', onMouseUp)

    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('contextmenu', onMouseUp)
    }
  }, [])
  return (
    <div
      className='app-drag'
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onDoubleClick={onDoubleClick}
    >
      {props.children}
    </div>
  )
}
