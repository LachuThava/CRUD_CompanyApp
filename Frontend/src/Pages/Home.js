import {React,useEffect,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {


    const[user,SetUser] = useState([]);


    useEffect(()=>{
        const retriveData = async() =>{
            try {
                    axios.get("http://localhost:8080/employees")
                .then((res)=>{
                    SetUser(res.data.slice());
                })
                .catch((err)=>{
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
            }
        }

        return () =>{retriveData()}
    })


    function HandleRemove(props){
        console.log("props : ",props);
        axios.delete(`http://localhost:8080/employees/delete/${props}`)
        .then(()=>{
            console.log("Deleted");
        })
        .catch((err)=>{
            console.log(err);
        })
    }


  return (
    <div>
        <div className='m-auto max-w-5xl flex justify-between mt-10 p-3 border-b-gray-500   border-b-2'>
            <h1 className='text-5xl'>Company Details</h1>
            <button onClick={()=>{window.location.href="/create"}} className='bg-green-400 hover:bg-green-500 hover:duration-700 p-1 w-32 text-xl rounded-md font-semibold'>Add User</button>

        </div>
        <div className='m-auto max-w-5xl flex justify-center h-screen'>
            <TableContainer  component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow className=''>
                            <TableCell  align="center">Id</TableCell>
                            <TableCell  align="center">Name</TableCell>
                            <TableCell  align="center">Age</TableCell>
                            <TableCell  align="center">Position</TableCell>
                            <TableCell  align="center"></TableCell>
                            <TableCell  align="center"></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {user.map((row,index) => (
                            
                            <TableRow
                            key={row['dress']}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            
                                <TableCell align="center">{index+1}</TableCell>
                                <TableCell align="center">{row['name']}</TableCell>
                                <TableCell align="center">{row['age']}</TableCell>
                                <TableCell align="center">{row['position']}</TableCell>
                                <TableCell align='right'><button  className='p-1 bg-slate-200 hover:bg-indigo-500 hover:duration-500 text-md rounded-md  w-20 h-10'><Link to={"/update"} state={{"id":row["_id"]}}>Edit</Link></button></TableCell>
                                <TableCell align='left'><button onClick={() =>{HandleRemove(row['_id'])}} className='p-1 bg-slate-200 hover:bg-red-500 hover:duration-500 text-md rounded-md  w-20 h-10'>Delete</button></TableCell>
                                
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer> 
            </div>
    </div>
  )
}

export default Home