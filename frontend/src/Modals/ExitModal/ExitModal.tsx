import { type Dispatch, type ReactNode, type SetStateAction } from 'react'
import './ExitModal.css'
import { hiddenScroll } from '../../utils/hiddenScroll'

interface ExitProps {
  children: ReactNode
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const ExitModal = ({children,setIsModalOpen}: ExitProps) => {
  hiddenScroll()

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