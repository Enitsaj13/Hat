import React, { useState } from "react";
import { TextInput, View, Modal, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { colors } from "@theme/index";

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
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.characterCount}>{characterCount}/{maxLength}</Text>
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
              labelStyle={{ color: colors.textColor }}
            >
              {saveTitle}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.textColor,
    width: "80%",
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    shadowColor: colors.midNight,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
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
    borderWidth: 0.4,
    borderColor: colors.cadetGrey,
    paddingHorizontal: 10,
    height: 100,
    textAlignVertical: "top",
    backgroundColor: colors.textColor,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    marginTop: 10,
    width: "45%",
  },
  saveButton: {
    marginTop: 10,
    width: "45%",
    backgroundColor: colors.bgColor,
  },
  characterCount: {
    textAlign: "right",
    fontSize: 12,
    color: "gray",
  },
});

export default NoteModal;
