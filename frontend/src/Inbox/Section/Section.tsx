import './Section.css'

interface SectionData {
  category: string
  isActive: boolean
}

const Section = ({category, isActive}: SectionData) => {
  return (
    <section>
        <div>
          <img src="#" alt="" />
           <h1 className={isActive ? 'category activeSection' : 'category'}>{category}</h1>
           
        </div>          
    </section>
  )
}

export default Section