import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleAddTask(newTaskTitle: string) { 
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    if (tasks.find((tasks) => tasks.title === newTaskTitle)) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    } else {
      setTasks((oldState) => [...oldState, newTask]);
      setNewTaskTitle("");
    }
  }

  function handleToggleTaskDone(id: number) {
    const updateTask = tasks.map((task) => ({ ...task }));

    const findItem = updateTask.find((item) => item.id === id);

    if (!findItem) return;

    findItem.done = !findItem.done;
    setTasks(updateTask);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },

        {
          text: "Sim",
          onPress: () => {
            const updateTask = tasks.filter((tasks) => tasks.id !== id);
            setTasks(updateTask);
          },
        },
      ]
    );
  }

  function handleEditTask({id, title}: Task) {
    const updateTask = tasks.map((task) => ({ ...task }));

    const taskToBeUpdated = updateTask.find((item) => item.id === id);

    if (!taskToBeUpdated) return;

    taskToBeUpdated.title = newTaskTitle

    setTasks(updateTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
