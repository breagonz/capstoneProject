import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Profile({user}) {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const {id} = useParams();
    


    return(<>
        <div className = "Profile">
            <h1>Welcome back, {user.name}!</h1>
        
        <h3><u>Username</u>: {user.username}</h3>
        <h3><u>Name</u>: {user.name}</h3>
        <h3><u>Email</u>: {user.email}</h3>
        <h3><u>Address</u>: {user.address}</h3>
        
        

          {console.log(user.isadmin)}
        {<div className="admin"> 
            {user.isadmin === true ?
            <button onClick={() => navigate('/Admin')}> Admin Access </button> : null }
    
             </div>}
             </div>
        </>
    )

}