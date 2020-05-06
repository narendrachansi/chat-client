import React from 'react'
import messageStyle from '../css/message.css'
class Message extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <ul>
            {this.props.messages.map((item,index) => {
                var mes=item.split('qq')
                if(item.includes("https://google.com/maps?"))
            return <li key={index}><p><span className='name'>{mes[0]}</span><span className='time'>{mes[1]}</span></p><iframe src={mes[2]} frameBorder="0"></iframe></li>
            return <li key={index}><p><span className='name'>{mes[0]}</span><span className='time'>{mes[1]}</span></p>{mes[2]}</li>
            }
            )}
            </ul>
        )
    }
}

export default Message