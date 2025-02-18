const mongoose = require("mongoose");
const express=require("express")
const cors = require("cors");

const { initializerDb } = require("./Database/db.connect");
const { Student } = require("./models/students.model");
const Teachers = require("./models/teacher.models");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: "*", credentials: true, optionSuccessStatus: 200 }));
app.use(express.json());


// Initialize Database Connection
initializerDb();
app.get("/", (req, res) => {
    res.send("Hello, Express!");
  });
  
  app.get("/students", async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.post("/students", async (req, res) => {
    
  
    try {
      const student = new Student(req.body);
      await student.save();
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  app.put("/students/:id", async (req, res) => {
    const studentId = req.params.id;
    const updatedStudentData = req.body;
  
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        updatedStudentData,
        { new: true },
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.status(200).json(updatedStudent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.delete("/students/:id", async (req, res) => {
    const studentId = req.params.id;
  
    try {
      const deletedStudent = await Student.findByIdAndDelete(studentId);
  
      if (!deletedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      res
        .status(200)
        .json({
          message: "Student deleted successfully",
          student: deletedStudent,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  const addNewData=async (dataToBePosted) => {
    try {
      const teacher=new Teachers(dataToBePosted)
      const saveData=await teacher.save()
      return saveData
    } catch (error) {
      throw error
    }
  }
  app.post("/teachers",async(req,res)=>{
    try {
      const teacherData=await addNewData(req.body)
      if(teacherData){
        res.status(200).json(teacherData)
      }
    } catch (error) {
      res.status(500).json({error:"Failed to post teachers data"})
    }
  })
  const readAllTeachersData=async()=>{
    try {
      const data=await Teachers.find()
      return data
    } catch (error) {
      throw error
    }
  }
  app.get("/teachers",async(req,res)=>{
    try {
      const data=await readAllTeachersData()
      if(data && data.length>0){
res.status(200).json(data)
      }else{
        res.status(404).json({error:"Data not found"})
      }
    } catch (error) {
      res.status(500).json({error:"Failed to get teachers data"})
    }
  })
  const deleteTeachersdata=async (teachersId) => {
    try {
      const deletedData=await Teachers.findByIdAndDelete(teachersId)
      return deletedData
    } catch (error) {
      throw error
    }
  }
  app.delete("/teachers/:id",async(req,res)=>{
    try {
      const deletedData=await deleteTeachersdata(req.params.id)
      if(deletedData){
        res.status(200).json({message:"Data deleted successfully",teacher:deletedData})
      }else{
        res.status(404).json({error:"Data not found"})
      }
    } catch (error) {
      res.status(500).json({error:"Failed to delete teachers data"})
    }
  })
  const updateTeacherData=async (teacherId,dataToBeUpdated) => {
    try {
      const updatedData=await Teachers.findByIdAndUpdate(teacherId,dataToBeUpdated,{new:true})
      return updatedData
    } catch (error) {
      throw error
    }
  }
  app.put("/teachers/:id",async(req,res)=>{
    try {
      const updatedData=await updateTeacherData(req.params.id,req.body)
      if(updatedData){
res.status(200).json({message:"Data updated successfully",updatedData:updatedData})
      }else{
        res.status(404).json({error:"Data not found"})
      }
    } catch (error) {
      res.status(500).json({error:"Failed to update teachers data"})
    }
  })
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

app.use(express.json())