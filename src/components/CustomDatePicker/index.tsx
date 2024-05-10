import { useState } from 'react';
import { Button } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { colors } from '@theme/index';

interface CustomDatePickerProps {
    initialDate: Date;
    onDateChange: (selectedDate: Date) => void;
}

function CustomDatePicker({ initialDate, onDateChange }: CustomDatePickerProps) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(initialDate);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date: Date) => {
        setSelectedDate(date);
        onDateChange(date);
        hideDatePicker();
    };

    const buttonTitle = selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <>
            <Button mode='text' textColor={colors.midNight} onPress={showDatePicker} labelStyle={{ fontSize: 16 }}>
                {buttonTitle || "(MMM/dd/yyyy)"}
            </Button>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={selectedDate}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </>
    );
};

export default CustomDatePicker;
