import React from 'react'
import { useSelector } from 'react-redux'
//import Pusher from 'pusher-js'





//import { getAllExperiences } from '../../store/actions/experiences'
import SignedinHomeComponent from '../../components/home/signedin/SignedinHome'
import SpinnerLoader from '../../components/loaders/spinner_loader/SpinnerLoader'


const HomePage = () => {

    //const dispatch = useDispatch()

    
    

    // useEffect(() => {
    //     const pusher = new Pusher('249f2df25e3d65b17fd7', {
    //         cluster: 'mt1'
    //     });

    //     const channel = pusher.subscribe('experience');

    //     channel.bind('experience-created', function (data) {
    //         dispatch(getAllExperiences())
    //         //console.log(data)
    //     });

    //     return () =>{
    //         channel.unbind('experience-created')
    //     }


    // }, [dispatch])

    const fetchingExperiences = useSelector((state) => state.experiences.fetchingExperiences)

    if(fetchingExperiences) return <SpinnerLoader />
    return (
        <SignedinHomeComponent />
    )
}




export default HomePage