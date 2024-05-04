import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { Button, Modal, Text, Portal } from "react-native-paper";
import { colors } from "@theme/index";
import { createStyleSheet } from "react-native-unistyles";

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
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
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
          <Button
            mode="contained"
            onPress={onClose}
            style={styles.cancelButton}
          >
            {cancelTitle}
          </Button>
          <Button
            mode="contained"
            onPress={handleSaveNote}
            style={styles.saveButton}
            labelStyle={{ color: "white" }}
          >
            {saveTitle}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = createStyleSheet({
  modalContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: colors.midNight,
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
    marginTop: 10,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: colors.bgColor,
  },
  characterCount: {
    textAlign: "right",
    fontSize: 12,
    color: "gray",
  },
});

export default NoteModal;
