import './App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userStatus, setUserStatus] = useState({});
  const [toggle, setToggle] = useState(true);



  const checkUserStatus = async (id) => {
    try {
      const response = await fetch(`https://cointab-znde.onrender.com/user/${id}`);
      const userData = await response.json();
      setUserStatus(prevStatus => ({
        ...prevStatus,
        [id]: !!userData.data
      }));
    } catch (error) {
      console.error(error);
    }
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
        if (data.status === 201) {
          alert("Added to the database");
        }
        setToggle(!toggle); 
      })
      .catch(error => {
        console.error(error);
      });
  };

  const allUser = () => {
    
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((res) => {
          res.forEach((ele) => {
            checkUserStatus(ele.id);
          });
          setData(res);
          setToggle(!toggle); 
        })
        .catch(error => {
          console.error(error);
        });
    
  };

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((ele) => {
        checkUserStatus(ele.id);
      });
    }
  }, [toggle]); 

  return (
    <div className='parent-div'>
      <div className='container'>
        <h1>CointabSE-ASSIGNMENT</h1>
        {data.length==0?<button onClick={allUser}>All user</button>:null}
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
