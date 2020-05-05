import React from 'react'
import socketIOClient from 'socket.io-client'
import Message from '../components/message'
import generateMessage from '../utils/message'
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            inputMsg:'',
            messages:[],
            disableBtn:false,
            disableLocBtn:false,
            location:''
        }
        this.msgHandler = this.msgHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.sendLocation = this.sendLocation.bind(this);
        this.scrollToBottom=this.scrollToBottom.bind(this)
        this.ENDPOINT="localhost:3001"
        this.socket = socketIOClient(this.ENDPOINT);
        this.messagesEndRef = React.createRef()
    }
    scrollToBottom(){
        this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    msgHandler(event){
        this.setState({inputMsg:event.target.value})
    }
    submitForm(e){
        e.preventDefault()
        this.setState({disableBtn:true})
        this.socket.emit('sendMessage',this.state.inputMsg,(error)=>{
            if(error) console.log(error)
            this.setState({disableBtn:false})
            this.setState({inputMsg:''})
        })
    }
    sendLocation(){
        this.setState({disableLocBtn:true})
        if(!navigator.geolocation){
            return alert("Your browser doesn't support geolocation")
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            const latitude=position.coords.latitude
            const longitude=position.coords.longitude
            this.socket.emit('location',{latitude,longitude},()=>{
                this.setState({disableLocBtn:false})
                console.log('Location shared!')
            })
        })
    }

    componentDidMount(){
        this.socket.on("message", (data) => {
            //console.log(data)
            this.setState({
                messages: [...this.state.messages, generateMessage(data)]
            })
            this.scrollToBottom()
        });
        this.socket.on("locationMsg", (loc) => {
            this.setState({
                messages: [...this.state.messages, generateMessage(loc)]
            })
            this.scrollToBottom()
        });
    }
    render(){
        return(
            <div className='outer-container'>
                <div className='container'>
                    <h1>Chat App</h1>
                    <div className='message-box'>
                        <Message messages={this.state.messages}/>
                        <div ref={this.messagesEndRef} />
                    </div>              
                    <form name='message-form' onSubmit={this.submitForm}>
                        <input type='text' name='inputMsg' placeholder="Message" value={this.state.inputMsg} onChange={this.msgHandler} />
                        <button id='submitMsg' disabled={this.state.disableBtn}>Submit</button>
                        <button id='send-location' onClick={this.sendLocation} disabled={this.state.disableLocBtn}>Send Location</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}


export default Chat