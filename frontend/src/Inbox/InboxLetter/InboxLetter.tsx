import { useParams } from 'react-router-dom'
import './InboxLetter.css'
import { useEffect, useState } from 'react'
import { InboxLetterFindByMailId } from './InboxLetter.api'

const InboxLetter = () => {
  const { mailId } = useParams<{mailId: string}>()
  const [letter, setLetter] = useState()

  useEffect(() => {
    
    const gettingLetter = async () => {
      const data = await InboxLetterFindByMailId(mailId)
      setLetter(data.message)
    }
    gettingLetter()

  }, [mailId])



  return (
   <section>
    <div className='aboutUser'>
      <img src="#" alt="" />
        <div className='usernicknameFromWhom'>barclays@myworkday.com </div>

        <div className='mainMessage'>
          {letter}
        </div>
    </div>

   </section>
  )
}

export default InboxLetter