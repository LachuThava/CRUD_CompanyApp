const express = require('express');
const router  = express.Router();
const Employee = require('../models/employee');

router.get('/',async(req,res) =>{
    try {
        const employee = await Employee.find();
        res.json(employee); 
    } catch (error) {
        res.send("error : ", error);
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const employee = await Employee.findById(req.params.id);
        res.send(employee);
    }
    catch(error){
        res.send(error);
    }
})

router.post('/',async(req,res)=>{
    const emp = new Employee({
        name:req.body.name,
        age:req.body.age,
        position:req.body.position
    })
    try {
        const e1 = await emp.save();
        console.log(emp);
        res.json(e1);

    } catch (error) {
        res.send(error);
    }
})


router.delete("/delete/:id",async(req,res)=>{
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
})


router.post('/update/:id',async (req, res) => {
    try {
        var name = req.body.name;
        var age = req.body.age;
        var position = req.body.position;
        console.log("name : ",name," age : ",age," position : ",position);
        await Employee.findByIdAndUpdate(req.params.id,{"name":name,"age":age,"position":position},
        (err,docs)=>{
            if(!err){
                console.log('Updated docs : ',docs);
            }else{
                console.log(err);
            }
        });

    } catch (error) {
        res.send(error);
    }
   });


module.exports = router;