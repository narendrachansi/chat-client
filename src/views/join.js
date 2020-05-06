import React from 'react'
import '../css/join.css'
class Join extends React.Component{
    render(){
        return(
            <div class='outer-container'>
                <div class='inner-container'>
                    <h1>JOIN</h1>
                    <form  action='/chat'>
                        <p className='textHeading'>Display Name</p>
                        <input name='displayName' required />
                        <p className='textHeading'>Room</p>
                        <input name='room' required />
                        <button>Join</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Join