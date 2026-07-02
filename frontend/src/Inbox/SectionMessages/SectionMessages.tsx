import './SectionMessages.css'
import type { InboxMessagesData, SectionMessagesData } from './interfaces/SectionMessages.interface'
import { filterInboxMessagesByTopic } from './SectionMessages.api'


const SectionMessages = ({isActive, category}: SectionMessagesData) => {
    const { inboxMessages, openingLetter } = filterInboxMessagesByTopic(category)


  return (
    <>
    <div>
        {inboxMessages.map((item: InboxMessagesData) => (
            <div key={item.id} className={!isActive ? 'sectionMessagesSection sectionMessagesSectionActive' : ''} >
                <div className='inboxMessage' onClick={() => openingLetter(item.mailId)}>
                    <div className='selectAndTitle'>
                        <p className='selectButton'>[]</p>
                        <p>{item.topic}</p>
                    </div>
                    <p>{item.message}</p>

                </div>
            </div>            
        ))}
    </div>
    </> 
    )
}

export default SectionMessages