import { useParams } from 'react-router-dom'
import './InboxLetter.css'
import { useEffect, useState } from 'react'
import { InboxLetterFindByMailId } from './InboxLetter.api'
import type { LetterData } from './InboxLetterInterface'

const InboxLetter = () => {
  const { mailId } = useParams<{mailId: string}>()
  const [letterData, setLetterData] = useState<LetterData>()

  useEffect(() => {
    
    const gettingLetter = async () => {
      const data = await InboxLetterFindByMailId(mailId)
      setLetterData(data)
    }
    gettingLetter()

  }, [mailId])



  return (
   <section>
    <div className='aboutUser'>
      <img src="#" alt="" />
        <div className='usernicknameFromWhom'>{letterData?.topic}</div>

        <div className='mainMessage'>
          {letterData?.message}
        </div>
    </div>

   </section>
  )
}

export default InboxLetter