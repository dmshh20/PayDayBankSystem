import axios from "axios"

export const InboxLetterFindByMailId = async (mailId: string | undefined) => {
        const token = localStorage.getItem('accessToken')
    
        const response = await axios.get(import.meta.env.VITE_INBOX_LETTER, {
            params: {
                type: mailId
            },
            headers: {
               'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        
        return response.data
}