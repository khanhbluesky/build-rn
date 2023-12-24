import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default function DropdownBox({
  title,
  onPress,
  onItemSelect,
  onRemoveItem,
  items,
  placeholder,
  selectedItem,
  textInputProps,
  onClearAll,
  iconName,
}) {
  return (
    <View style={styles.dropDownContainer}>
      <Text style={styles.dropDownLabel}>{title}</Text>
      <TouchableOpacity style={styles.dropDownWithIcon} onPress={onPress}>
        <SearchableDropdown
          onItemSelect={onItemSelect}
          onRemoveItem={onRemoveItem}
          containerStyle={styles.dropDownInput}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderBottomWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{color: '#222'}}
          itemsContainerStyle={{maxHeight: 200}}
          items={items}
          defaultIndex={2}
          placeholder={placeholder}
          resetValue={false}
          underlineColorAndroid="transparent"
          selectedItem={selectedItem}
          textInputProps={textInputProps}
          onClearAll={onClearAll}
        />
        <TouchableOpacity onPress={onClearAll}>
          <FontAwesome6
            name="times-circle"
            size={16}
            color={'#ccc'}
          />
        </TouchableOpacity>

        <FontAwesome6
          name={iconName}
          size={20}
          color={'#065956'}
          style={styles.dropDownIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dropDownContainer: {
    marginBottom: 20,
  },
  dropDownLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropDownWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropDownInput: {
    flex: 0.8, // 80% chiều rộng
    padding: 6,
  },
  dropDownIcon: {
    flex: 0.1, // 10% chiều rộng
    textAlign: 'center',
  },
});
