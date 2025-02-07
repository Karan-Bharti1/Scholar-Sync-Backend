const mongoose = require("mongoose");
const express=require("express")
const cors = require("cors");

const { initializerDb } = require("./Database/db.connect");
const { Student } = require("./models/students.model");

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
      const deletedStudent = await Student.findByIdAndRemove(studentId);
  
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
  
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

app.use(express.json())