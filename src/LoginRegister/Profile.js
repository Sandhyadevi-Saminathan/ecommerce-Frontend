import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Profile() {
   
    const id = window.localStorage.getItem('id');
    const [isloading, setloading] = useState(true)
    const navigate = useNavigate()
    const [userList, setUserList] = useState({})
 
    useEffect(() => {
        fetchUsers()
    }, [])
    let fetchUsers = async () => {
        try {
            let userData = await axios.get(`http://localhost:8000/user/${id}`, {
                headers: {
                    Authorization: `${window.localStorage.getItem("token")}`
                }
            })
            console.log(userData.data);
            setUserList(userData.data)
            setloading(false)
        } catch (error) {
            console.log('error')
        }
    }


    return (

        <>
            {isloading ? (
                <div class="col d-flex justify-content-center">
                    <h1>Loading</h1>
                </div>

            )
                :
                <div className='col d-flex justify-content-center' >

                    <div class="card border-white bg-info mb-3" style={{ "textAlign": "center", "width": "30rem" ,height:"250px" }} >
                        <h3>   <div class="card-header">
                            Profile
                        </div></h3>
                        <div className="card-body">
  <h4 style={{ marginBottom: '10px', fontFamily: "cursive" }}>First Name: {userList.name}</h4>
  <h4 style={{ marginBottom: '10px', fontFamily: "cursive"  }}>Email: {userList.email}</h4>
  <h4 style={{ marginBottom: '10px', fontFamily: "cursive"  }}>Phone Number: {userList.phone}</h4>
</div>

                    </div>
                </div>
            }
        </>
    )
}


export default Profile