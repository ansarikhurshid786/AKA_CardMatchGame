import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface Props {
    onRestart(): void,
    totalOpenCard: number
}

const Header = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.resetBtn}>
                <Button
                    title="Restart"
                    onPress={() => { props.onRestart(); }}
                />
            </View>
            <View style={styles.score}>
                <Text>STEPS: <Text style={styles.scorText}>{props.totalOpenCard}</Text></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    score: {
        flex: 1, justifyContent: "center", alignItems: "flex-end"
    },
    scorText: {
        color: "#87CEEB", fontSize: 25
    },
    resetBtn: {
        flex: 1, justifyContent: "flex-start"
    }
});

export { Header };