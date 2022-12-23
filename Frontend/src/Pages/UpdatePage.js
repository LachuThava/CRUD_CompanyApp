import {React,useEffect,useRef,useState} from 'react';
import Select from 'react-select';
import axios from 'axios';
import { positions } from './CreatePage';
import { useLocation } from 'react-router-dom';

const UpdatePage = () => {
    var nameRef = useRef(null);
    var ageRef = useRef(null);
    var positionRef = useRef(null);


    const location = useLocation();

    useEffect(()=>{
        const getUserData = ()=>{
            console.log("id : ",location.state.id);
            axios.get(`http://localhost:8080/employees/${location.state.id}`)
            .then((res)=>{
                nameRef.current = res.data.name;
                ageRef.current = res.data.age;
                positionRef.current = res.data.position;
            })
            .catch((err)=>{
                console.log(err);
            });
        }

        return () =>{getUserData()};
    })



    const handleSubmit = async(e)=>{
        e.preventDefault();
        const user = {
            "name":nameRef.current,
            "age":ageRef.current,
            "position":positionRef.current
        }
        console.log("user : ",user);
        try {
          await  axios.post(`http://localhost:8080/employees/update/${location.state.id}`,user)
        .then(()=>{
            alert("updated....");
            window.location.href= "/";
        })
        .catch((err)=>{
            console.log(err);
        })
        } catch (error) {
          console.log(error);  
        }
    }
   const handleSelect = (props)=>{
            positionRef.current = props['value'];
        }

        const handleName = (event) =>{
            nameRef.current = event.target.value;
        }

        const handleAge = (event) =>{
            ageRef.current = event.target.value;
        }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
        <div className='shadow-md border-2 flex flex-col w-1/2 h-auto p-2'>
            <div className='mb-2 text-center text-7xl font-bold'>
                <h1>Update Details</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit} className='flex flex-col  items-center'>
                <div className='flex-col flex mb-2 justify-center w-1/2'>
                    <label className='text-2xl mb-2'>Name</label>
                    <input onChange={handleName} ref={nameRef} className='p-1 h-10 rounded-md border-2 border-indigo-400' type="text" placeholder='enter name' />
                </div>
                <div className='flex-col flex mb-2 justify-center w-1/2'>
                    <label className='text-2xl mb-2'>Age</label>
                    <input onChange={handleAge} ref={ageRef} className='p-1 h-10 rounded-md border-2 border-indigo-400' type="text" placeholder='enter age' />
                </div>
                {/* <div className='flex-col flex mb-2 justify-center w-1/2'>
                    <label className='text-2xl mb-2'>Position</label>
                    <input onChange={handleSelect} value={position} className='p-1 h-10 rounded-md border-2 border-indigo-400' type="text" placeholder='enter position' />
                </div> */}
                <Select className='w-6/12 mt-4 mb-10'  ref={positionRef} onChange={handleSelect} options={positions}  />
                <button className='w-40 rounded-lg h-10 text-lg bg-indigo-500 shadow-md  hover:bg-indigo-700' type='submit'>Update</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default UpdatePage