import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Post.css"

function POST() {
  const { id } = useParams();

 
  const [data, setData] = useState([]);
  const [data1, setData1] = useState({
    Name: "",
    companyName: "",
  });
  const [data2, setData2] = useState([]);


  useEffect(() => {
    
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((res) => res.json())
      .then((res) => {
     
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });

  
    fetch(`https://cointab-znde.onrender.com/user/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData1({ ...data1, Name: res.data.name, companyName: res.data.company.name });
      
      })
      .catch((err) => {
        console.log(err);
      });

 
    fetch(`https://cointab-znde.onrender.com/post/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setData2(res.data);
        } else {
          setData2([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);


  const BulkAdd = () => {
    data.forEach((ele) => {
      fetch("https://cointab-znde.onrender.com/post/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(ele),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status==201) {
            alert("Added to the database");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });


    fetch(`https://cointab-znde.onrender.com/post/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setData2(res.data);
        } else {
          setData2([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DownloadinExcel=()=>{
    fetch(`https://cointab-znde.onrender.com/post/export/${id}`)
    .then((res) => res.blob())
    .then((blob) => {
      
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.xlsx'; 
        document.body.appendChild(a); 
        a.click(); 
        a.remove();
    })
    .catch((error) => {
        console.error('Error :', error);
    });
    
  }

  return (
    <div>
      <div className="container">
        <h1>CointabSE-ASSIGNMENT</h1>
        {data2.length === 0 ? (
          <button onClick={BulkAdd}>Bulkadd</button>
        ) : (
          <button onClick={DownloadinExcel}>Download In Excel</button>
        )}
      </div>
      <div>
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>CompanyName</th>
        <th>Title</th>
        <th>Body</th>
      </tr>
    </thead>
    <tbody>
      {data.map((elem) => {
        return (
          <tr key={elem.id}>
            <td>{data1.Name}</td>
            <td>{data1.companyName}</td>
            <td>{elem.title}</td>
            <td>{elem.body}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
    </div>
  );
}

export default POST;
