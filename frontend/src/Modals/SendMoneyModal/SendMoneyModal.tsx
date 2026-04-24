import { type Dispatch, type ReactNode, type SetStateAction } from 'react'
import './SendMoneyModal.css'

interface SendMoneyModalProps {
    children: ReactNode
    setIsSendMoneyModalOpen: Dispatch<SetStateAction<boolean>>
}

const SendMoneyModal = ({children, setIsSendMoneyModalOpen }: SendMoneyModalProps) => {
  return (
    <>
        <div className='sendMoneyModal' onClick={() => setIsSendMoneyModalOpen(false)}>
            <div className='sendMoneyScreen' onClick={(e) => e.stopPropagation()}>
                {children}
            </div>

        </div>
    </>
  )
}

export default SendMoneyModal