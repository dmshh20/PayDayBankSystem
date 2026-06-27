import React from 'react'
import './SectionsMessages.css'

interface SectionMessagesData {
    isActive: boolean
}

const SectionMessages = ({isActive}: SectionMessagesData) => {
  return (
    <div className={!isActive ? 'sectionMessagesSection sectionMessagesSectionActive' : ''} >
        <div className='inboxMessage'>
            <div className='selectAndTitle'>
                <p className='selectButton'>[]</p>
                <p>Title</p>
            </div>

            <p>Description</p>

        </div>
    </div>
    )
}

export default SectionMessages