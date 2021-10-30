import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

import { Task } from "../pages/Home";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/images/logo/edit.png";

import Icon from "react-native-vector-icons/Feather";

interface EditTaskArgs {
  taskId: number;
  taskNewTitle: string;
}

interface TasksItemProps {
  tasks: Task;
  tasksEdited: EditTaskArgs;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;

  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TaskItem({
  toggleTaskDone,
  removeTask,
  tasks,
  tasksEdited,
  editTask,
}: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(tasks.title);
  const TextInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(taskNewTitleValue);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: tasks.id, taskNewTitle: taskNewTitleValue });
    setIsEditing(false);
  }

  useEffect(() => {
    if (TextInputRef.current) {
      if (isEditing) {
        TextInputRef.current.focus();
      } else {
        TextInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.tasksButton}
          onPress={() => toggleTaskDone(tasks.id)}

          //TODO - use onPress (toggle task) prop
        >
          <View
            style={tasks ? styles.tasksMarkerDone : styles.tasksMarker}
            //TODO - use style prop
          >
            {tasks.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {/* <Text
            style={tasks.done ? styles.tasksTextDone : styles.tasksText}
            //TODO - use style prop
          >
            {tasks.title}
          </Text> */}
          <TextInput
            value={taskNewTitleValue}
            onChangeText={setTaskNewTitleValue}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={tasks.done ? styles.tasksTextDone : styles.tasksText}
            ref={TextInputRef}
          />
        </TouchableOpacity>
      </View>

      <View>
        {isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
            style={{ paddingHorizontal: 24 }}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
            style={{ paddingHorizontal: 24 }}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        onPress={() => removeTask(tasks.id)}
        style={{ paddingHorizontal: 24 }}
        disabled={isEditing}
      >
        <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 1,
  },
  tasksButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  tasksMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  tasksText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  tasksMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  tasksTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
