import React, { useState } from 'react'
import api from '../API';
import 'bootstrap/dist/css/bootstrap.css';


const Users = () => {

    // return <span className="badge bg-danger p-3 m-2" >Тусоваться не с кем :(</span>;

    const [users, setUsers] = useState(api.users.fetchAll());


    const delUser = (id) => {
        setUsers(users.filter((user) => user._id !== id))
    }
    const personWord = () => {
        if (users.length > 1 && users.length < 5) { return ("человека") }
        else { return ("человек") }
    }

    return (
        <div>
            <h3><span className={`badge p-2 m-2 bg-${users.length > 0 ? "primary" : "danger"} `} >{users.length > 0 ? `${users.length} ${personWord()} тусанёт с тобой!` : `Ты один, сегодня без тусы(`}</span></h3>
            {users.length > 0
                &&
                <table className="table table-light table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {

                                if (!user.bookmark) {
                                    return (
                                        <tr key={user._id}>
                                            <th>{user.name}</th>
                                            <td>
                                                {
                                                    user.qualities.map(quality => {
                                                        return (
                                                            <span key={quality._id} className={`badge m-1 bg-${quality.color}`}>{quality.name}</span>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>{user.profession.name}</td>
                                            <td>{user.completedMeetings}</td>
                                            <td>{user.rate}/5</td>
                                            <td><button type="button" className="btn btn-danger" onClick={() => delUser(user._id)}>Delete</button></td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            }

        </div>
    )


}

export default Users