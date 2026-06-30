import { useEffect, useState } from 'react'
import './SectionsMessages.css'
import axios from 'axios'


interface SectionMessagesData {
    isActive: boolean
    category: number
}

interface inboxMessagesData {
    id: number
    userId: number
    topic: string
    message: string
    type: number
}
 

const SectionMessages = ({isActive, category}: SectionMessagesData) => {
    const [inboxMessages, setInboxMessages] = useState([])
    
        useEffect(() => {
            filterMessages(category)
        }, [category])

        const filterMessages = async (categoryId: number) => {
        
            const token = localStorage.getItem('accessToken')
            
            const messages = await axios.get(import.meta.env.VITE_INBOX_CATEGORIES, {
                params: {
                    type: categoryId
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            setInboxMessages(messages.data)    
        }



  return (
    <>
    <div>
        {inboxMessages.map((item: inboxMessagesData) => (
            <div key={item.id} className={!isActive ? 'sectionMessagesSection sectionMessagesSectionActive' : ''} >
                <div className='inboxMessage' >
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