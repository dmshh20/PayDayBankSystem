import './SectionMessages.css'
import type { InboxMessagesData, SectionMessagesData } from './interfaces/SectionMessages.interface'
import { filterInboxMessagesByTopic } from './SectionMessages.api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'


const SectionMessages = ({isActive, category}: SectionMessagesData) => {
    const { inboxMessages, openingLetter } = filterInboxMessagesByTopic(category)


  return (
    <>
    <div>
        {inboxMessages.map((item: InboxMessagesData) => (
            <div key={item.id} className={!isActive ? 'sectionMessagesSection sectionMessagesSectionActive' : ''} >
                <div className='inboxMessage' onClick={() => openingLetter(item.mailId)}>
                    <div className='selectAndTitle'>
                        <p className='selectButton'><FontAwesomeIcon icon={faBookmark} /></p>
                        <p>{item.topic}</p>
                    </div>
                    <p>{item.message.slice(0, 90)}</p>

                </div>
            </div>            
        ))}
    </div>
    </> 
    )
}

export default SectionMessages