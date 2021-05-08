import React from 'react'
import { useSelector } from 'react-redux'



import ExperienceCard from '../../experience_card/ExperienceCard'





const SignedinHomeComponent = () =>{

    
    const experiences = useSelector((state) => state.experiences.experiences)

    return(
        <div className='signedin-home-component-container'>
            
            {
                experiences.map(experience =>{
                    return(
                        <ExperienceCard experience={experience} key={experience._id} />
                    )
                })
            }

        </div>
    )
}



export default SignedinHomeComponent