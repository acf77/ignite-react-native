import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

interface Task {
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

    setTasks((oldState) => [...oldState, newTask]);
    setNewTaskTitle("");
  }

  function handleToggleTaskDone(id: number) {
    const updateTask = tasks.map(task => ({ ...task }));

    const findItem = updateTask.find(item => item.id === id);

    if (!findItem)
      return;
    
    findItem.done = !findItem.done;
    setTasks(updateTask);

  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const updateTask = tasks.filter((tasks) => tasks.id !== id);

    setTasks(updateTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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
