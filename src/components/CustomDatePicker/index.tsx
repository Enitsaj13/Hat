import { useState } from "react";
import { Button } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors } from "@theme/index";
import dayjs from "dayjs";
import { i18n } from "@i18n/index";

interface CustomDatePickerProps {
  value: Date;
  onDateChange: (selectedDate: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

function CustomDatePicker({
  value,
  onDateChange,
  minDate,
  maxDate,
}: CustomDatePickerProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const handleConfirm = (date: Date) => {
    setDatePickerVisibility(false);
    setTimeout(() => onDateChange(date), 0);
  };

  const buttonTitle = dayjs(value, i18n.locale).format("LL");

  return (
    <>
      <Button
        mode="text"
        textColor={colors.midNight}
        onPress={() => setDatePickerVisibility(true)}
        labelStyle={{ fontSize: 16 }}
      >
        {buttonTitle || "(MMM/dd/yyyy)"}
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={value}
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        minimumDate={minDate}
        maximumDate={maxDate}
      />
    </>
  );
}

export default CustomDatePicker;
