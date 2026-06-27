import React, { useState } from 'react'
import './Inbox.css'
import Section from './Section/Section'
import SectionMessages from './SectionMessages/SectionMessages'

const Inbox = () => {
    const [activeSection, isActiveSection] = useState<string>('PRIMARY')

  return (
    <section className='inbox'>
        <h1 className='inbox-main-message'>Your Bank Account messages</h1>

        <div className='categories'>
            <div onClick={() => isActiveSection('PRIMARY')}>
                <Section isActive={activeSection === 'PRIMARY'} category={'primary'}></Section>
            </div>

            <div onClick={() => isActiveSection('BILLS')}>
                <Section isActive={activeSection === 'BILLS'} category={'bills'}></Section>

            </div>
        </div>

        <div className='inbox-content'>
            <SectionMessages isActive={activeSection === 'PRIMARY'}></SectionMessages>
            <SectionMessages isActive={activeSection === 'BILLS'}></SectionMessages>
        </div>
    </section>
  )
}

export default Inbox