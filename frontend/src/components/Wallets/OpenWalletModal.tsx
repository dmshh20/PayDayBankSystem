import React, { type Dispatch, type SetStateAction } from 'react'
import './OpenWalletModal.css'

interface OpenWalletModalProps {
    children: any
    setIsOpen: Dispatch<SetStateAction<boolean>>
    
}


const OpenWalletModal = ({children}: OpenWalletModalProps) => {
  return (
    <section className='openWalletModal'>
        {children}
    </section>

)
}

export default OpenWalletModal