import { useState } from 'react'
import './Inbox.css'
import Section from './Section/Section'
import SectionMessages from './SectionMessages/SectionMessages'

const Inbox = () => {
    const [activeSection, setActiveSection] = useState<string>('PRIMARY')

  return (
    <section className='inbox'>
        <h1 className='inbox-main-message'>Your Bank Account messages</h1>

        <div className='categories'>
            <div onClick={() => setActiveSection('PRIMARY')}>
                <Section isActive={activeSection === 'PRIMARY'} category={'primary'}></Section>
            </div>

            <div onClick={() => setActiveSection('BILLS')}>
                <Section isActive={activeSection === 'BILLS'} category={'bills'}></Section>

            </div>
        </div>

        <div className='inbox-content'>
            <SectionMessages category={0}  isActive={activeSection === 'PRIMARY'}></SectionMessages>
            <SectionMessages category={1} isActive={activeSection === 'BILLS'}></SectionMessages>

        </div>
    </section>
  )
}

export default Inbox