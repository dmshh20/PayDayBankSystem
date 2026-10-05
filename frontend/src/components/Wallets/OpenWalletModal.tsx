import React, { type Dispatch, type SetStateAction } from 'react'
import './OpenWalletModal.css'

interface OpenWalletModalProps {
    children: React.ReactNode
    setIsOpen: Dispatch<SetStateAction<boolean>>
    
}


const OpenWalletModal = ({children, setIsOpen}: OpenWalletModalProps) => {
  return (
    <section className='openWalletModal' onClick={() => setIsOpen(false)}>
        <div onClick={(e) => e.stopPropagation()}>
        {children}

        </div>
    </section>

)
}

export default OpenWalletModal