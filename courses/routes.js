import Database from "../Database/index.js";
const express = require('express');
const app = express();

app.use(express.json()); 
function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });

  app.post("/api/courses", (req, res) => {
    console.log("Adding new course: ", req.body);
    const newCourse = {
       ...req.body,
       _id: new Date().getTime().toString(),
    }
      Database.courses.unshift(newCourse);
      res.json(newCourse);
    });
    
  

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses
      .filter((c) => c._id !== id);
    res.sendStatus(204);
  });
app.put("/api/courses/:id", (req, res) => {
  const { id } = req.params;
  const updatedCourse = req.body;
  let found = false;

  Database.courses = Database.courses.map((c) => {
    if (c._id === id) {
      found = true;
      return { ...c, ...updatedCourse };
    }
    return c;
  });

  if (found) {
    console.log("course updated: ", updatedCourse);
    res.sendStatus(204);
  } else {
    res.status(404).send("Course not found");
  }
});


  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = Database.courses
      .find((c) => c._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });

}
export default CourseRoutes;