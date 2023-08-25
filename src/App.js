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
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

function App() {
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

  function removeTodo(index) {
    const updatedTodos = todos.filter((_, i) => i !== index);
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

export default App;