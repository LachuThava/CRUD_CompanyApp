import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

export const positions = ["Software Architect","Software Engineer","Software Developer","Junior Software Developer","Intern Software Developer","Engineer"].map( item =>({label:item,value:item}));

const CreatePage = () => {

    const[name,setName] = useState("");
    const[age,setAge] = useState("");
    const[position,setPosition] = useState("");



        function handleSelect(props){
            setPosition(props['value']);
        }

        function handleName(event){
            setName(event.target.value);
        }

        function handleAge(event){
            setAge(event.target.value);
        }



        const  handleSubmit = async(e)=>{
            e.preventDefault();
            var user = {name:name,age:age,position:position};
            console.log(user);
            try {
                axios.post("http://localhost:8080/employees",user)
            .then(()=>{
                alert("User created");
                window.location.href = "/";
            })
            .catch((error)=>{
                console.log(error);
            })
            } catch (error) {
                console.log(error);
            }
        }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
        <div className='shadow-md border-2 flex flex-col w-1/2 h-auto p-2'>
            <div className='mb-2 text-center text-7xl font-bold'>
                <h1>Add Details</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit} className='flex flex-col  items-center'>
                <div className='flex-col flex mb-2 justify-center w-1/2'>
                    <label className='text-2xl mb-2'>Name</label>
                    <input onChange={handleName} value={name} className='p-1 h-10 rounded-md border-2 border-indigo-400' type="text" placeholder='enter name' />
                </div>
                <div className='flex-col flex mb-2 justify-center w-1/2'>
                    <label className='text-2xl mb-2'>Age</label>
                    <input onChange={handleAge} value={age} className='p-1 h-10 rounded-md border-2 border-indigo-400' type="text" placeholder='enter age' />
                </div>
                {/* <div className='flex-col flex mb-2 justify-center w-1/2'>
                    <label className='text-2xl mb-2'>Position</label>
                    <input onChange={handleSelect} value={position} className='p-1 h-10 rounded-md border-2 border-indigo-400' type="text" placeholder='enter position' />
                </div> */}
                <Select className='w-6/12 mt-4 mb-10' onChange={handleSelect} options={positions} value={position}  />
                <button className='w-40 rounded-lg h-10 text-lg bg-indigo-500 shadow-md  hover:bg-indigo-700' type='submit'>Create</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default CreatePage