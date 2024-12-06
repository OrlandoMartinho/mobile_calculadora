import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function App() {
  const [theme, setTheme] = useState("light"); 
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handlePress = (value) => {
    if (value === "=") {
      try {
        setResult(eval(input).toString()); 
      } catch {
        setResult("Erro");
      }
    } else if (value === "AC") {
      setInput("");
      setResult("");
    } else {
      setInput(input + value);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, theme === "dark" ? styles.darkTheme : styles.lightTheme]}
    >
      <View style={styles.resultContainer}>
        <Text style={[styles.inputText, theme === "dark" ? styles.darkText : styles.lightText]}>
          {input || "0"}
        </Text>
        <Text style={[styles.resultText, theme === "dark" ? styles.darkText : styles.lightText]}>
          {result || ""}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {[
          ["AC", "/", "%", "x"],
          ["7", "8", "9", "-"],
          ["4", "5", "6", "+"],
          ["1", "2", "3", "="],
          ["0", ".", null, null],
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button, buttonIndex) => (
              button && (
                <TouchableOpacity
                  key={buttonIndex}
                  style={[
                    styles.button,
                    button === "="
                      ? [styles.equalsButton, theme === "dark" ? styles.darkEquals : styles.lightEquals]
                      : theme === "dark"
                      ? styles.darkButton
                      : styles.lightButton,
                  ]}
                  onPress={() => handlePress(button === "x" ? "*" : button)}
                >
                  <Text style={[styles.buttonText, theme === "dark" ? styles.darkText : styles.lightText]}>
                    {button}
                  </Text>
                </TouchableOpacity>
              )
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={() => setTheme(theme === "light" ? "dark" : "light")}>
        <Text style={styles.switchText}>
          {theme === "light" ? "Mudar para o tema escuro" : "Mudar para o tema claro"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  lightTheme: {
    backgroundColor: "#f9f9f9",
  },
  darkTheme: {
    backgroundColor: "#121212",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  inputText: {
    fontSize: 36,
    textAlign: "right",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 28,
    textAlign: "right",
    color: "#6c757d",
  },
  buttonContainer: {
    flex: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  button: {
    flex: 1,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    marginHorizontal: 5,
  },
  lightButton: {
    backgroundColor: "#e0e0e0",
  },
  darkButton: {
    backgroundColor: "#2c2c2c",
  },
  equalsButton: {
    backgroundColor: "#4caf50",
  },
  lightEquals: {
    backgroundColor: "#4caf50",
  },
  darkEquals: {
    backgroundColor: "#ff9800",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  lightText: {
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
  switchText: {
    textAlign: "center",
    marginVertical: 10,
    color: "#007bff",
  },
});
