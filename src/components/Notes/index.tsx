import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { Button, Modal, Text, Portal } from "react-native-paper";
import { colors } from "@theme/index";
import { createStyleSheet } from "react-native-unistyles";

interface NoteModalProps {
  value?: string;
  title: string;
  visible: boolean;
  onClose: () => void;
  onSave: (note: string | undefined) => void;
  cancelTitle: string;
  saveTitle: string;
  maxLength: number;
}

function NoteModal({
  value,
  visible,
  onClose,
  title,
  cancelTitle,
  saveTitle,
  maxLength,
  onSave,
}: NoteModalProps) {
  const [note, setNote] = useState(value);

  const handleSaveNote = () => {
    onSave(note);
    onClose();
  };

  const characterCount = note?.length || 0;
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
          onChangeText={setNote}
          multiline
          maxLength={maxLength}
          style={styles.noteInput}
          defaultValue={value}
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
