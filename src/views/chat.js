import React from 'react'
import socketIOClient from 'socket.io-client'
import Message from '../components/message'
import generateMessage from '../utils/message'
import queryString from 'query-string'

class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            inputMsg:'',
            messages:[],
            disableBtn:false,
            disableLocBtn:false,
            location:'',
            users:[],
            room:''
        }
        this.msgHandler = this.msgHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.sendLocation = this.sendLocation.bind(this);
        this.scrollToBottom=this.scrollToBottom.bind(this)
        this.ENDPOINT="localhost:3001"
        this.socket = socketIOClient(this.ENDPOINT);
        this.messagesEndRef = React.createRef()
        this.parsed = queryString.parse(window.location.search);
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
        this.socket.on("message", (data,username) => {
            this.setState({
                messages: [...this.state.messages, generateMessage(data,username)]
            })
            this.scrollToBottom()
        });
        this.socket.on("locationMsg", (loc,username) => {
            this.setState({
                messages: [...this.state.messages, generateMessage(loc,username)]
            })
            this.scrollToBottom()
        });
        this.socket.on("userData", (users,room) => {
            this.setState({
                users: users,
                room: room
            })
            this.scrollToBottom()
        });
        this.socket.emit('join',this.parsed,(error)=>{
            if(error){
                alert(error)
                window.href="/join"
            }
        })
    }
    render(){
        return(
            <div className='outer-container'>
                <div className='container'>
                    <div className='left-container'>
                        <h2>{this.state.room}</h2>
                        <h3>Users</h3>
                        <ul>
                            {this.state.users.map(user=>(
                                 <li>{user.username}</li>
                            ))}                           
                        </ul>
                    </div>
                    <div className='right-container'>
                        <h1>Chat App</h1>
                        <div className='message-box'>
                            <Message messages={this.state.messages}/>
                            <div ref={this.messagesEndRef} />
                        </div>              
                        <form name='message-form' onSubmit={this.submitForm}>
                            <input type='text' name='inputMsg' placeholder="Message" value={this.state.inputMsg} onChange={this.msgHandler} required autoComplete='off'/>
                            <button id='submitMsg' disabled={this.state.disableBtn}>Submit</button>
                            <button id='send-location' onClick={this.sendLocation} disabled={this.state.disableLocBtn}>Send Location</button>
                        </form>
                    </div>                    
                </div>
            </div>
        )
    }
}


export default Chat