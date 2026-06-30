import axios from "axios"
import { useEffect, useState } from "react"

export const filterInboxMessagesByTopic = (category: any) => {
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


        return {
            inboxMessages
        }
}



