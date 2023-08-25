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
    <Card border="1px solid white" borderRadius="5px" padding="20px">
      <Box  >
          <h1 style={{fontSize: "xx-large", textAlign: "center", fontWeight: "bold"}}>Chores ToDo List</h1>
          <List spacing={2} maxWidth="500px" width="100%">
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
                      width="calc(100% - 50px)"  // Assuming 50px as the combined width of Checkbox and DeleteIcon
                      textDecoration={todo.checked ? "line-through" : "none"} 
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