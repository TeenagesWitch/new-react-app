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
  Flex,
  Select
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate
} from "react-router-dom";
import { useState, useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

function Stopwatch() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const start = () => {
    if (!isActive) {
      const id = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            setMinutes(prevMinutes => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
      setIntervalId(id);
      setIsActive(true);
    }
  };

  const stop = () => {
    if (isActive && intervalId) {
      clearInterval(intervalId);
      setIsActive(false);
    }
  };

  const reset = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setMinutes(0);
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <Flex direction="column" gap={3} alignItems="center">
      <Box fontSize="2xl">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Box>
      <Flex gap={2}>
        <Button onClick={start} colorScheme="green">Start</Button>
        <Button onClick={stop} colorScheme="red">Stop</Button>
        <Button onClick={reset}>Reset</Button>
      </Flex>
    </Flex>
  );
}

function TodoList() {
  useEffect(() => {
    document.title = `ToDo List`;
  }, []);

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
    <ChakraProvider>
    <body style={{backgroundColor: "#eebc17", height: "100vh"}}>
    <Container display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
    <Card 
    border="1px solid white" 
    borderRadius="20px" 
    padding="20px" 
    maxHeight="90vh"
    overflow="auto"
    display="flex"
    flexDirection="column"
    css={{
        '&::-webkit-scrollbar': {
            width: '0px',
            background: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'transparent'
        }
    }}>
      <Box>
          <h1 style={{fontSize: "xx-large", textAlign: "center", fontWeight: "bold"}}>Chores ToDo List</h1>
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
                      onClick={() => removeTodo(index)} 
                      colorScheme="red" 
                      variant="outline" 
                      borderColor={trashIconColor}
                      color={trashIconColor}
                  />
              </Flex>
          </ListItem>          
            ))}
          </List>
          <h1 style={{textAlign: "center", fontWeight:"bold"}}>Done: {countChecked()}</h1>
          <Input 
            maxWidth="100%"
            overflow="hidden"
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Add todo" 
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <Button onClick={addTodo} mt={2}>Add</Button>
      </Box>
      </Card>
    </Container>
    </body>
    </ChakraProvider>
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
      <Container
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Flex
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={10}
        >
          <Flex 
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap={10}  
          >
            <Button onClick={() => setCounter(counter + 1)}>+</Button>
            <CountDisplay>{counter}</CountDisplay>
            <Button onClick={() => setCounter(counter - 1)}>-</Button>
          </Flex>
          <Link to="/">Go back to home</Link>
        </Flex>
      </Container>

  );
}

function Home() {
  const navigate = useNavigate();

  const [selectedComponent, setSelectedComponent] = useState("");

  const navigateToComponent = () => {
    if (selectedComponent) {
      navigate(`/${selectedComponent.startsWith("/") ? selectedComponent.slice(1) : selectedComponent}`);
    }
  };

  return (
    useEffect(() => {
      document.title = `Home`;
    }, []),
    <>
      <main>
            <Container
              display="flex" 
              flexDirection="column" 
              justifyContent="center" 
              alignItems="center" 
              height="100vh"
              width="100vw" 
            >
            <Flex justifyContent="center" alignItems="center" height="100vh" direction="column" gap={3}>
            <img src="https://picsum.photos/200/300" style={{borderRadius: '20px'}}alt="random" />
            <h1>Welcome to My Page!</h1>
            <Select 
              placeholder="Go to..."
              value={selectedComponent}
              background="white"
              onChange={(e) => setSelectedComponent(e.target.value)}
              >
              <option value="/counter">Counter</option>
              <option value="/todolist">ToDo List</option>
              <option value="/stopwatch">Stopwatch</option>
            </Select>
            <Button onClick={navigateToComponent}>Go!</Button>
            </Flex>
            </Container> 
      </main>
    </>
  );
}

function App() {
  return (
  <ChakraProvider>
    <body style={{backgroundColor: "#eebc17", height: "100vh"}}>
    <Router>
        <Routes>
            <Route path="/counter" element={<Counter />} />
            <Route path="/todolist" element={<TodoList />} />
            <Route path="/stopwatch" element={<Stopwatch />} />
            <Route path="/" element={<Home />} />
        </Routes>
    </Router>
    </body>
    </ChakraProvider>
  );
}


export default App;