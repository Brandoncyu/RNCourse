import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([])

  function startAddGoalHandler() {
    setModalIsVisible(true)
  }

  function endGoalHandler() {
    setModalIsVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(courseGoals => [
      ...courseGoals,
      { text: enteredGoalText, key: Math.random().toString() }
    ])
    endGoalHandler();
  };

  function deleteGoalHandler(id){
    setCourseGoals(currentCoureGoals =>{
      return currentCoureGoals.filter((goal) => goal.id !== id)
    });
  }

  return (
    <>
    <StatusBar style="light"/>
    <View style={styles.appContainer}>
      <Button 
        title='Add New Goal' 
        color="#a065ec" 
        onPress={startAddGoalHandler} 
      />
      <GoalInput 
        visible={modalIsVisible}
        onAddGoal={addGoalHandler}
        onCancel={endGoalHandler}
      />
      <View style={styles.goalsContainer}>
        <FlatList 
          data={courseGoals}  
          renderItem={(itemData) =>{
            return(
              <GoalItem 
                text={itemData.item.text} 
                id={itemData.item.id} 
                onDeleteItem={deleteGoalHandler} 
              />
            )
          }}
          alwaysBounceVertical={false} />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 5,
  },
});
