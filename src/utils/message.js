import Moment from 'moment'
const generateMessage=(message)=>{
    const currentTime=new Date()
    return Moment(currentTime).format('h:mm a')+'qq'+message
}

export default generateMessage