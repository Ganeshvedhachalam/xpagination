import React, { useEffect, useState } from "react"
import axios from "axios"
import "./Table.css"
function DataTable(){
const[data , SetData] = useState([])
const [currentpage ,setCurrentpage]=useState(1);
const rowsperpage=10

useEffect(()=>{
    const FetchData = async ()=>{
        try {
        const response =await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        SetData(response.data)
        } catch (error) {
            console.error("not fetched data",error);
            alert("failed to fetch data")
        }
        
    }
    FetchData()

},[])

const HandlePrevious =()=>{
    setCurrentpage(prevpage => Math.max(prevpage-1,1))
    console.log(  `previous${currentpage}`)
}
const maxpage = Math.ceil(data.length/rowsperpage);

const HandleNext = () => {
    setCurrentpage((prevPage) => Math.min(prevPage + 1, maxpage));
  };


   const startIndex=(currentpage -1 )*rowsperpage;
   const currentPageData=data.slice(startIndex,startIndex+rowsperpage)



    return (
        <div>
             <h2>Employee Data Table</h2>
            <table >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name </th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                 
                </thead>
                <tbody>
                    {currentPageData.map((item)=>(
                        <tr key={item.id}>
                        <td> {item.id}</td>
                        <td> {item.name}</td>
                        <td> {item.email}</td>
                        <td> {item.role}</td>
                    </tr>

                    ))}
                    

                </tbody>
            </table>
            <div className="pagination">
            <button onClick={HandlePrevious} disabled={currentpage===1}>Previous</button>
            <span>{currentpage}</span>
            <button onClick={HandleNext} disabled={currentpage === maxpage}>Next</button>
            </div>


        </div>
    )
}
export default DataTable;