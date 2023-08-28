import { 
  ChakraProvider,
  Box,
  List,
  ListItem,
  Input,
  Container,
  Button,
  IconButton,
  Checkbox,
  useColorModeValue,
  Card,
  Flex
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { useState, useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const checkboxColor = useColorModeValue("green.500", "green.300");
  const trashIconColor = useColorModeValue("red.500", "red.300");

  function addTodo() {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, checked: false }]);
      setInputValue("");
    }

  }

  function toggleCheck(index) {
    const updatedTodos = [...todos];
    updatedTodos[index].checked = !updatedTodos[index].checked;
    setTodos(updatedTodos);
  }

  function removeTodo() {
    const updatedTodos = todos.filter((todo) => !todo.checked);
    setTodos(updatedTodos);
  }

  function countChecked() {
    return todos.filter((todo) => todo.checked).length;
  }

  return (
    <div className="todo-list-page">
      <div className="container">
        <div className="flex-column">
          <h1>Chores ToDo List</h1>
          <List spacing={2} maxWidth="90vh" width="100%">
            {todos.map((todo, index) => (
              <ListItem key={index} display="flex" alignItems="center">
              <Flex width="100%" alignItems="center">
                  <Checkbox
                      isChecked={todo.checked}
                      onChange={() => toggleCheck(index)}
                      colorScheme="green"
                      mr={2}
                      borderColor={checkboxColor}
                  />
                  <Box
                      minWidth="0"
                      width="calc(100% - 50px)"
                      overflowWrap="break-word"
                      wordWrap="break-word">
                      {todo.text}
                  </Box>
                  <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => removeTodo()}
                      colorScheme="red"
                      variant="outline"
                      borderColor={trashIconColor}
                      color={trashIconColor}
                  />
              </Flex>
          </ListItem>
            ))}
          </List>
          <h1>Done: {countChecked()}</h1>
          <Input
            maxWidth="100%"
            overflow="hidden"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add todo"
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <Button onClick={addTodo} mt={2}>Add</Button>
        </div>
      </div>
    </div>
  );
}

function Counter() {
  const [counter, setCounter] = useState(0);
  const CountDisplay = ({ children }) => (
    <div className="count-display">{children}</div>
  );

  useEffect(() => {
    document.title = `Counter: ${counter}`;
  }, [counter]);

    return (
    <div className="counter-page">
      <div className="container">
        <div className="flex-column">
          <div className="flex-row">
            <Button onClick={() => setCounter(counter + 1)}>+</Button>
            <CountDisplay>{counter}</CountDisplay>
            <Button onClick={() => setCounter(counter - 1)}>-</Button>
          </div>
          <a href="/">Go back to home</a>
        </div>
      </div>
    </div>

  );
}

function App() {
  return (
  <ChakraProvider>
    <Router>
        <Routes>
            <Route path="/counter" element={<Counter />} />
            <Route path="/todolist" element={<TodoList />} />
            <Route path="/" element={
              <>
                <Link to="/counter">Go to Counter</Link>
                <Link to="/todolist">Go to Todo List</Link>
              </>
            } />
        </Routes>
    </Router>
    </ChakraProvider>
  );
}


export default App;