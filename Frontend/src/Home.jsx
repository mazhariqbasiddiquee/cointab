import './App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userStatus, setUserStatus] = useState({});

  const fetchUserData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => {
        setData(res)
      })
      .catch(error => {
        console.error( error)
      });
  };

  const checkUserStatus = (id) => {
    fetch(`https://cointab-znde.onrender.com/user/${id}`)
      .then(response => response.json())
      .then(userData => {
        setUserStatus(prevStatus => ({
          ...prevStatus,
          [id]: !!userData.data
        }));
      })
      .catch(error => {
        console.error( error)
      });
  };

  const addUser = (elem) => {
    fetch("https://cointab-znde.onrender.com/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(elem)
    })
      .then((res) => res.json())
      .then((data) => {
    
        fetchUserData();
      })
      .catch(error => {
        console.error( error)
      });
  };

  const handleAllUserClick = () => {
    fetchUserData();
  };

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((ele) => {
        checkUserStatus(ele.id);
      });
    }
  }, [data]);

  return (
    <div className='parent-div'>
      <div className='container'>
        <h1>CointabSE-ASSIGNMENT</h1>
        <button onClick={handleAllUserClick}>All user</button>
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
                      <button onClick={() => Navigate(`/${ele.id}`)}>Open</button>
                    ) : (
                      <button onClick={() => addUser(ele)}>Add</button>
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
