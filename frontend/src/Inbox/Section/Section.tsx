import React from 'react'
import './Section.css'

interface SectionData {
  category: string
}

const Section = ({category}: SectionData) => {
  return (
    <section>
        <div>
          <img src="#" alt="" />
          <h1 className='category'>{category}</h1>
        </div>          

    </section>
  )
}

export default Section