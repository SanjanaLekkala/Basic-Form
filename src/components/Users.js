import React from 'react';
import users from "../components/json/users.json";

const Users = () => {
  console.log(users);
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <table border={1} style={{borderCollapse:"collapse"}}>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                    {users.users.map((user,id)=>(
                          <tr>
                          <td key={id}>{user.id}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                      </tr>

                    ))}
                  
                </tbody>
           
        </table>
     
    </div>
  )
}

export default Users