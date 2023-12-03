// Define a constant object for an assignment with properties
const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

// An array of todo items, each with an id, title, and completion status
const todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

// Main function to setup routes in the Express app for Lab5
const Lab5 = (app) => {
  // Route to display a welcome message for Assignment 5
  app.get("/a5/welcome", (req, res) => {
    res.send("Welcome to Assignment 5");
  });

  // Route to add two numbers and return the sum
  app.get("/a5/add/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const sum = parseInt(a) + parseInt(b);
    res.send(sum.toString());
  });

  // Route to subtract two numbers and return the result
  app.get("/a5/subtract/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const difference = parseInt(a) - parseInt(b);
    res.send(difference.toString());
  });

  // Route for a basic calculator that supports add and subtract operations
  app.get("/a5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    let result;
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  });

  // Route to return the current assignment object
  app.get("/a5/assignment", (req, res) => {
    res.json(assignment);
  });

  // Route to return only the title of the current assignment
  app.get("/a5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });

  // Route to update the title of the current assignment
  app.get("/a5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });

  // Route to update the score of the current assignment
  app.post('/a5/assignment/score/:newScore', (req, res) => {
    const newScore = parseInt(req.params.newScore);
    assignment.score = newScore;
    res.json(assignment);
  });

  // Route to return todos, filtered by completion status if specified
  app.get("/a5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === 'true';
      const completedTodos = todos.filter(t => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });

  // Route to update the completion status of the current assignment
  app.post('/a5/assignment/completed/:newCompleted', (req, res) => {
    const newCompleted = req.params.newCompleted === 'true'; // Convert to boolean
    assignment.completed = newCompleted;
    res.json(assignment);
  });

  // Route to return a specific todo item by id
  app.get("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });

  // Route to add a new todo item
  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(), // Assign a unique id based on current time
    };
    todos.push(newTodo);
    res.json(newTodo);
  });

  // Route to delete a todo item by id
  app.delete("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(index, 1);
    res.sendStatus(200);
  });

  // Route to update the title of a specific todo item
  app.get("/a5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) {
      todo.title = title;
    }
    res.json(todos);
  });

  // Route to update the description of a specific todo item
  app.patch('/todos/:id/description', (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const todo = todos.find(t => t.id === parseInt(id));
    if (todo) {
      todo.description = description;
      res.send(todo);
    } else {
      res.status(404).send('Todo not found');
    }
  });

  // Route to update the completion status of a specific todo item
  app.patch('/todos/:id/completed', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const todo = todos.find(t => t.id === parseInt(id));
    if (todo) {
      todo.completed = completed;
      res.send(todo);
    } else {
      res.status(404).send('Todo not found');
    }
  });

  // Route to update a specific todo item with new data
  app.put("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.due = req.body.due;
    todo.completed = req.body.completed;
    res.sendStatus(200);
  });
};

// Export the Lab5 function for use in other parts of the application
export default Lab5;