import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface PortalProps {
  containerId?: string
  containerRef?: React.RefObject<HTMLElement>
  children: React.ReactNode
}

const Portal = ({ containerId, containerRef, children }: PortalProps) => {
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(
    null,
  )

  useEffect(() => {
    let element: HTMLElement | null = null

    if (containerRef?.current) {
      element = containerRef.current
    } else if (containerId) {
      element = document.getElementById(containerId)
      if (!element) {
        element = document.createElement("div")
        element.id = containerId
        document.body.appendChild(element)
      }
    }

    setContainerElement(element)

    return () => {
      if (containerId && element?.parentNode && element.id === containerId) {
        document.body.removeChild(element)
      }
    }
  }, [containerId, containerRef])

  if (!containerElement) return null

  return createPortal(children, containerElement)
}

export default Portal
