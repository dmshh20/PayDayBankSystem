import { type Dispatch, type ReactNode, type SetStateAction } from 'react'
import './ExitModal.css'

interface ExitProps {
  children: ReactNode
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}


const ExitModal = ({children, setIsModalOpen}: ExitProps) => {
  return (
    <>
      <div className='exitModal' >
        <div className='exitModalScreen'>
          {children}
        </div>
      </div>
    </>
  )
}

export default ExitModal