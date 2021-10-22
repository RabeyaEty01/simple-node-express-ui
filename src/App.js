import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])


  const handleAddUser = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const newUser = { name: name, email: email }

    //send data to the server
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })

      .then(res => res.json())
      .then(data => {
        console.log(data);
        const addedUser=data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers);
      })

      nameRef.current.value='';
      emailRef.current.value='';
    e.preventDefault();
  }

  return (
    <div className="App">
      <h1>Found users:{users.length}</h1>

      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} placeholder="name" id="" />
        <input type="email" ref={emailRef} placeholder="email" id="" />
        <input type="submit" value="Submit" id="" />
      </form>


      <ul>
        {
          users.map(user => <li
            key={user.id}
            user={user}
          >name: {user.name} <br /> phone: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
