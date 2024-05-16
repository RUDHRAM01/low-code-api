import React from 'react'
import '../styles/show.css'
import { useNavigate } from 'react-router-dom';


function ShowSchema({data,setIsAdd}) {
    const navigate = useNavigate();
  return (
    <div className='view-schema'>
        <div className='view-header'>
            <h4>Schema</h4>
            <button className='createBtn' onClick={()=>{
                navigate('./addSchema')
            }}>Add New Schema</button>
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>
           {
            data?.map((item, index) => {
                return (
                    <div key={index} className='schemas'>
                    <h5>{item.name}</h5>
                    <div>
                        <table>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Is Unique</th>
                            <th>Is Ref</th>
                            <th>Ref Model</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.properties.map((prop, index) => (
                            <tr key={index}>
                                <td>{prop.pname}</td>
                                <td>{prop.type}</td>
                                <td>{prop.isunique ? "Yes" : "No"}</td>
                                <td>{prop.isref ? "Yes" : "No"}</td>
                                <td>{prop.refModel}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                )
                })
           }
        </div>
    </div>
  )
}

export default ShowSchema