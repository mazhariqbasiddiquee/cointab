import './App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const Navigate=useNavigate()
  const [data, setData] = useState([]);
  const [userStatus, setUserStatus] = useState({});



  const Alluser = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
   
    data.forEach((ele) => {
      CheckUser(ele.id);
    });
  }, [data]); 

  const CheckUser = (id) => {
    fetch(`http://localhost:4500/user/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setUserStatus((prevStatus) => ({
          ...prevStatus,
          [id]: res.data ? true : false
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AddUser = (elem) => {
    fetch("http://localhost:4500/user/add", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(elem)
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
<div className='parent-div'>
      <div className='container'>
        <h1>CointabSE-ASSIGNMENT</h1>
        {data.length===0?<button onClick={Alluser}>All user</button>:null}
      </div>
      {data.length > 0 && (
  <div className='content-div'>
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Button</th>
        </tr>
      </thead>
      <tbody>
        {data.map((ele) => (
          <tr key={ele.id}>
            <td>{ele.name}</td>
            <td>{ele.address.city}</td>
            <td>{ele.email}</td>
            <td>{ele.phone}</td>
            <td>{ele.website}</td>
            <td>
              {userStatus[ele.id] ? (
                <button onClick={(e) => Navigate(`/${ele.id}`)}>Open</button>
              ) : (
                <button onClick={(e) => AddUser(ele)}>Add</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
</div>
  );
}

export default Home;
