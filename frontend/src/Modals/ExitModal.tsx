import { useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import './ExitModal.css'

interface ExitProps {
  children: ReactNode
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}


const ExitModal = ({children,setIsModalOpen}: ExitProps) => {

  useEffect(() => {
      document.body.style.overflow = 'hidden' 

    return () => {
      document.body.style.overflow ? 'hidden' : 'unset'
    }
  }, [])

  
  return (
    <>
      <div className='exitModal' onClick={() => setIsModalOpen(false)}>
        <div className='exitModalScreen' onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>
  )
}

export default ExitModal