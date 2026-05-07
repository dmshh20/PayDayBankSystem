import { useEffect } from "react"

export const hiddenScroll = () => {

     useEffect(() => {
        document.body.style.overflow = 'hidden'
    
        return () => {
          document.body.style.overflow ? 'hidden' : 'unset'
        }
        }, [])
      

}