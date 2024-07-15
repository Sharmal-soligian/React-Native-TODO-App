import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomText from "./components/CustomText";
import { useState } from "react";

/* DATA */
const data_ = [
  {
    id: 1,
    title: "Jogging",
    status: false,
  },
  {
    id: 2,
    title: "Clean dishes",
    status: false,
  },
  {
    id: 3,
    title: "Read",
    status: false,
  },
  {
    id: 4,
    title: "Sleep",
    status: false,
  },
];

export default function App() {
  /* STATES INIT */
  const [items, setItems] = useState(data_);
  const [term, setTerm] = useState("");

  /* ADD TODO */
  const addTodo = () => {
    let newTodo = {
      id: items.length + 1,
      title: term,
      status: false,
    };
    /* INCLUDE NEW TODO */
    setItems([...items, newTodo]);
    setTerm("");
  };

  /* CHANGE STATUS */
  const markItemCompleted = (item) => {
    const itemIndex = items.findIndex((val) => val?.id === item?.id);

    if (itemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[itemIndex] = { ...items[itemIndex], status: true };
      setItems(updatedItems);
    }
  };

  /* REMOVE TODO */
  const removeTodo = (id) => {
    const updatedData = items.filter((val) => val?.id !== id);
    setItems(updatedData);
  };

  const TodoItems = (props) => (
    <View style={styles.itemContainer}>
      {/* TODO DISPLAY */}
      <TouchableOpacity
        style={styles.item}
        onPress={() => markItemCompleted(props?.item)}
      >
        <CustomText style={styles.itemText}>{props?.item?.title} </CustomText>
        <CustomText style={styles.itemText}>
          {props?.item?.status ? "✔" : "x"}
        </CustomText>
      </TouchableOpacity>
      {/* REMOVE TODO */}
      <TouchableOpacity
        style={styles.itemDelete}
        onPress={() => removeTodo(props?.item?.id)}
      >
        <CustomText style={styles.itemText}>Remove </CustomText>
      </TouchableOpacity>
    </View>
  );
 
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <CustomText style={{ textAlign: "center" }}>TODO-APP</CustomText>
        <StatusBar style="auto" />
        <TextInput
          placeholder="Enter you task"
          placeholderTextColor={"#C0C0C0"}
          style={styles.input}
          onChangeText={setTerm}
          value={term}
        />
        {/* <Button title="Add Todo" onPress={addTodo} /> */}
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <CustomText style={styles.buttonText}>Add Todo! </CustomText>
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={styles.list}
          data={items}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => <TodoItems item={item} />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    padding: 10,
    borderColor: "gray",
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  itemContainer: {
    // flexDirection: 'row'
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#6DB6DD",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    marginBottom: 8,
  },
  itemDelete: {
    backgroundColor: "maroon",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  itemText: {
    color: "#FFF",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
});
