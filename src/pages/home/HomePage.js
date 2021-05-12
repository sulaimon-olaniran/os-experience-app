import React from 'react'
import { useSelector } from 'react-redux'





import ExperienceCard from '../../components/experience_card/ExperienceCard'
import SpinnerLoader from '../../components/loaders/spinner_loader/SpinnerLoader'


const HomePage = () => {


    const fetchingExperiences = useSelector((state) => state.experiences.fetchingExperiences)
    const experiences = useSelector((state) => state.experiences.experiences)


    if(fetchingExperiences) return <SpinnerLoader />
    return (
        <div className='home-page-container'>
            
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




export default HomePage