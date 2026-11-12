import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    return true
  })

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // iOS Safari eski sürümleri addEventListener yerine addListener destekler
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
    } else if (mql.addListener) {
      mql.addListener(onChange)
    }

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onChange)
      } else if (mql.removeListener) {
        mql.removeListener(onChange)
      }
    }
  }, [])

  return !!isMobile
}
