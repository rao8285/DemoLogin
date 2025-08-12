import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Router from './src/Navigation/Router';
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  const [task, settask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editindex, seteditIndex] = useState(null);
  const handleTaskAdd = () => {
    if (task.trim() === '') return;

    if (editindex !== null) {
      const updated = [...tasks];
      updated[editindex] = task;
      setTasks(updated);
      seteditIndex(null);
    } else {
      setTasks([task, ...tasks]);
    }

    settask('');
  };
  const handaldelete = index => {
    const updatetask = tasks.filter((_, i) => i !== index);

    setTasks(updatetask);
  };
  const updateTask = index => {
    settask(tasks[index]);
    seteditIndex(index);
  };
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <View
    //     style={{
    //       flex: 1,
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       marginTop: 300,
    //     }}
    //   >
    //     <Text>To DO List</Text>

    //     <TextInput
    //       value={task}
    //       onChangeText={settask}
    //       style={{
    //         width: 200,
    //         height: 50,
    //         borderRadius: 10,
    //         borderColor: 'red',
    //         borderWidth: 1,
    //       }}
    //     />
    //     <TouchableOpacity
    //       onPress={() => {
    //         handleTaskAdd();
    //       }}
    //     >
    //       <Text>Add</Text>
    //     </TouchableOpacity>
    //     <FlatList
    //       data={tasks}
    //       // keyExtractor={(_,index)}
    //       renderItem={({ item, index }) => {
    //         return (
    //           <TouchableOpacity
    //             onPress={() => {
    //               handaldelete(index);
    //             }}
    //           >
    //             <Text>{item}</Text>;
    //             <TouchableOpacity
    //               onPress={() => {
    //                 updateTask(index);
    //               }}
    //             >
    //               <Text>Update</Text>
    //             </TouchableOpacity>
    //           </TouchableOpacity>
    //         );
    //       }}
    //     />
    //   </View>
    // </SafeAreaView>
    <>
    
      <AuthProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </AuthProvider>
    </>
  );
};

export default App;
