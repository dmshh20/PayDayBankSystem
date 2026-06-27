import React from 'react'
import './Inbox.css'
import Section from './Section/Section'

const Inbox = () => {

  return (
    <section className='inbox'>
        <h1 className='inbox-main-message'>Your Bank Account messages</h1>

        <div className='categories'>
          <Section category={'primary'}></Section>
          <Section category={'primary'}></Section>
          

        </div>
    </section>
  )
}

export default Inbox