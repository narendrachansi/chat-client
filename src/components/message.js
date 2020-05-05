import React from 'react'
class Message extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <ul>
            {this.props.messages.map((item,index) => {
                var mes=item.split('qq')
                console.log(mes)
                if(item.includes("https://google.com/maps?"))
            return <li key={index}><span className='time'>{mes[0]}</span><iframe src={mes[1]} frameBorder="0"></iframe></li>
            return <li key={index}><span className='time'>{mes[0]}</span>{mes[1]}</li>
            }
            )}
            </ul>
        )
    }
}

export default Message