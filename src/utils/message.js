import Moment from 'moment'
const generateMessage=(message,name)=>{
    const currentTime=new Date()
    return name+'qq'+Moment(currentTime).format('h:mm a')+'qq'+message
}

export default generateMessage