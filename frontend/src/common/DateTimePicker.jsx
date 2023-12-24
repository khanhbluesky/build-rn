import React, {useState} from 'react';
import {
  View,
  Platform,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

const MyDateTimePicker = ({
  title,
  onSelectItem,
  selectedItems,
  updateSelectedItems,
}) => {
  // const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedItems;
    setShow(Platform.OS === 'ios'); // On iOS, show the picker again after selecting a date
    updateSelectedItems(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.dateTimeContainer}>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedItems}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View>
        <Text style={styles.dateTimeLabel}>{title}</Text>
        <TouchableOpacity
          style={styles.dateTimeWithIcon}
          onPress={showDatepicker}>
          <TextInput
            style={styles.dateTimeInput}
            placeholder="Select"
            placeholderTextColor={'#c7c7c9'}
            value={`${selectedItems.getDate()}/${
              selectedItems.getMonth() + 1
            }/${selectedItems.getFullYear()}`}
            editable={false}
          />
          <FontAwesome
            name="calendar"
            size={20}
            color={'#065956'}
            style={styles.dateTimeIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyDateTimePicker;

const styles = StyleSheet.create({
  dateTimeContainer: {
    marginBottom: 20,
  },
  dateTimeLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  dateTimeWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dateTimeInput: {
    flex: 0.9, // 90% chiều rộng
    padding: 10,
    color: '#333',
  },
  dateTimeIcon: {
    flex: 0.1, // 10% chiều rộng
    textAlign: 'center',
  },
});
