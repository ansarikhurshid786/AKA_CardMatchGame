import React, { useEffect, useReducer, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, Pressable, View, FlatList, Dimensions, Alert } from "react-native";
import { State, Action, PreviousState } from "./types/index";
import { Header } from "./components/Header";

const { height } = Dimensions.get("screen");
const boxHeight = height / 4 - 40;


const initialState: Array<State> = [
  { value: 43, isShown: false, isDone: false },
  { value: 59, isShown: false, isDone: false },
  { value: 74, isShown: false, isDone: false },
  { value: 43, isShown: false, isDone: false },
  { value: 99, isShown: false, isDone: false },
  { value: 24, isShown: false, isDone: false },
  { value: 99, isShown: false, isDone: false },
  { value: 29, isShown: false, isDone: false },
  { value: 24, isShown: false, isDone: false },
  { value: 59, isShown: false, isDone: false },
  { value: 29, isShown: false, isDone: false },
  { value: 74, isShown: false, isDone: false }
];

function reducer(state: Array<State>, action: Action): Array<State> {
  switch (action.type) {
    case "showCardByIndex":
      return state.map((item, index) => {
        if (index == action.payload?.index) {
          return { ...item, isShown: !action.payload.isShown };
        }
        return item;
      });
    case "setDoneByIndex":
      return state.map((item, index) => {
        if (index == action.payload?.index) {
          return { ...item, isDone: true };
        }
        return item;
      });
    case "restart":
      return initialState;
    default:
      throw new Error();
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [total, setTotal] = useState(0);
  const _previousSelected = useRef<PreviousState>();

  useEffect(() => {
    const totalOpen = state.filter((item) => item.isShown == true).length;
    if (totalOpen === 12) {
      const msg = `You win this game by ${total} steps!`;
      Alert.alert("Congradulations!", msg, [{ text: "Try another round", onPress: () => dispatch({ type: "restart" }) }]);
    }
  }, [state]);

  const reset = () => {
    dispatch({ type: "restart" });
  }

  const checkCondition = () => {
    const preSelect = _previousSelected.current;
    if (preSelect) {
      state.forEach((item, index) => {
        if (preSelect.value == item.value && preSelect.index != index && item.isShown) {
          dispatch({ type: "setDoneByIndex", payload: { index } });
          dispatch({ type: "setDoneByIndex", payload: { index: preSelect.index } });
        }

        if (!item.isDone && preSelect.value != item.value && item.isShown) {
          dispatch({ type: "showCardByIndex", payload: { index, isShown: item.isShown } });
          dispatch({ type: "showCardByIndex", payload: { index: preSelect.index, isShown: item.isShown } });
        }
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header onRestart={reset} totalOpenCard={total} />

      <FlatList
        data={state}
        horizontal={false}
        numColumns={3}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              style={{ ...styles.box, backgroundColor: item.isShown ? "white" : "#87CEEB" }}
              key={index}
              onPress={() => {
                _previousSelected.current = { ...state[index], index };
                dispatch({ type: "showCardByIndex", payload: { index, isShown: item.isShown } });
                let totalVal = total + 1;
                setTotal(totalVal);
                setTimeout(() => {
                  checkCondition();
                }, 1000);
              }}
            >
              <Text key={index} style={styles.boxText}>{item.isShown ? item.value : "?"}</Text>
            </Pressable>
          );
        }}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "red"
  },
  box: {
    flex: 1,
    height: boxHeight,
    alignItems: "center",
    justifyContent: "space-around",
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    borderRadius: 20
  },
  boxText: {
    fontSize: 20
  }
});

export default App;