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
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log("Error fetching data:", error));
  }, []);

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditedUser(user);
  }

  const handleSave = (id) => {
    // Here you can update the user data, e.g., send a PUT request to an API
    setUsers(prevUsers => prevUsers.map(user => user.id === id ? editedUser : user));
    setEditingId(null);
    setEditedUser({});
  }

  const handleCancel = () => {
    setEditingId(null);
    setEditedUser({});
  }

  const handleDelete = (id) => {
    console.log("Deleting ID:", id);
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  }

  const handleChange = (e, field) => {
    setEditedUser(prevUser => ({ ...prevUser, [field]: e.target.value }));
  }

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>
                {editingId === user.id ? (
                  <input 
                    value={editedUser.name} 
                    onChange={e => handleChange(e, "name")} 
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                  />
                ) : (
                  user.name
                )}
              </Td>
              <Td>
                {editingId === user.id ? (
                  <input 
                    value={editedUser.username} 
                    onChange={e => handleChange(e, "username")} 
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                  />
                ) : (
                  user.username
                )}
              </Td>
              <Td>
                {editingId === user.id ? (
                  <input 
                    value={editedUser.email} 
                    onChange={e => handleChange(e, "email")} 
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                  />
                ) : (
                  user.email
                )}
              </Td>
              <Td>
                {editingId === user.id ? (
                  <>
                    <Button size="sm" colorScheme="green" onClick={() => handleSave(user.id)} mr={2}>
                      Save
                    </Button>
                    <Button size="sm" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" colorScheme="blue" onClick={() => handleEdit(user)} mr={2}>
                      Edit
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

function Stopwatch() {
  useEffect(() => {
    document.title = `Stopwatch`;
  }, []);

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
    <Container 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
    >
      <Card 
        border="1px solid" 
        borderRadius="20px" 
        padding="20px"
        boxShadow="xl"
      >
        <Flex direction="column" gap={3} alignItems="center">
          <Box fontSize="2xl">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </Box>
          <Flex gap={2}>
            <Button onClick={start} colorScheme="green">Start</Button>
            <Button onClick={stop} colorScheme="red">Stop</Button>
            <Button onClick={reset}>Reset</Button>
          </Flex>
          <Link to="/">Go back to home</Link>
        </Flex>
      </Card>
    </Container>
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
      <Link to="/">Go back to home</Link>
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

function HomePage() {
    const [searchInput, setSearchInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const allPages = [
        { path: "/counter", name: "Counter" },
        { path: "/todolist", name: "ToDo List" },
        { path: "/stopwatch", name: "Stopwatch" },
        { path: "/usertable", name: "User Table" },
    ];
    const [filteredPages, setFilteredPages] = useState(allPages);

    const wrapperRef = useRef(null);
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        setFilteredPages(allPages.filter(page => page.name.toLowerCase().includes(value.toLowerCase())));
    };

    return (
        <div ref={wrapperRef} style={{ backgroundColor: "white", border: "1px solid #ccc", borderRadius: "5px" }}>
            <Input 
                placeholder="Search pages..."
                value={searchInput}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                style={{ borderBottom: "1px solid #ccc" }}
            />
            {isFocused && (
                <List>
                    {filteredPages.map(page => (
                        <ListItem key={page.path}>
                            <Link to={page.path}>{page.name}</Link>
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
}

function Home() {

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
            <HomePage />
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
            <Route path="/usertable" element={<UserTable />} />
            <Route path="/" element={<Home />} />
        </Routes>
    </Router>
    </body>
    </ChakraProvider>
  );
}


export default App;