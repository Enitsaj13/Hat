import React, { useState } from "react";
import { Modal, Text, View, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "@theme/index";

interface NoteModalProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  cancelTitle: string;
  saveTitle: string;
}

function NoteModal({
  visible,
  onClose,
  title,
  cancelTitle,
  saveTitle,
}: NoteModalProps) {
  const [note, setNote] = useState("");

  const handleSaveNote = () => {
    // Handle saving the note (you can pass it to a parent component or do something else)
    console.log("Note saved:", note);
    onClose(); // Close the modal after saving the note
  };

  const characterCount = note.length;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.characterCount}>{characterCount}/150</Text>
          <TextInput
            value={note}
            onChangeText={(text) => setNote(text)}
            multiline
            maxLength={150}
            style={styles.noteInput}
          />
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={onClose}>
              {cancelTitle}
            </Button>
            <Button
              mode="contained"
              style={styles.cancelButton}
              onPress={handleSaveNote}
              textColor="white"
            >
              {saveTitle}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    opacity: 0.9,
    borderRadius: 4,
    padding: 16,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  noteInput: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.steelGrey,
    paddingHorizontal: 10,
    height: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: colors.bgColor,
  },
  characterCount: {
    textAlign: "right",
    fontSize: 12,
    color: "gray",
  },
});

export default NoteModal;
