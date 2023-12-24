import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ItemListModal = ({
  title,
  data,
  iconName,
  onVisible,
  onSelectItem,
  selectedItems,
  updateSelectedItems,
}) => {
  const [searchText, setSearchText] = useState('');
  const normalizedSearchText = searchText.toLowerCase();

  // const [selectedItems, setSelectedItems] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleItemSelect = item => {
    // onRequestClose(); // Đóng modal khi một mục được chọn
    // onSelectItem(item); // Gọi hàm onSelectItem với mục đã chọn

    setModalVisible(onVisible);
    onSelectItem(item);
  };

  const onClearItem = () => {
    updateSelectedItems([]);
  };

  const onClearValue = () => {
    setSearchText('');
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        {padding: 10, borderBottomWidth: 1, borderColor: '#ccc'},
        {
          backgroundColor: selectedItems.includes(item.name)
            ? 'lightblue'
            : 'white',
        },
      ]}
      onPress={() => handleItemSelect(item.name)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.dropDownContainer}>
      <Text style={styles.dropDownLabel}>{title}</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.inputTouch}
          onPress={() => setModalVisible(true)}>
          <TextInput
            style={styles.dropdownInputText}
            placeholder="Select an option"
            value={selectedItems.join(', ')}
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClearItem}>
          <FontAwesome6 name="times-circle" size={16} color={'#ccc'} />
        </TouchableOpacity>

        <FontAwesome6
          name={iconName}
          size={20}
          color={'#065956'}
          style={styles.inputIcon}
        />
      </View>

      <Modal
        visible={isModalVisible}
        transparent={false}
        animationType="slide" // slide hoặc fae
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalWithIcon}>
            <TextInput
              style={styles.modalInputText}
              placeholder="Search..."
              value={searchText}
              onChangeText={text => setSearchText(text)}
            />
            <TouchableOpacity onPress={onClearValue}>
              <FontAwesome6 name="times-circle" size={16} color={'#ccc'} />
            </TouchableOpacity>

            <FontAwesome6
              name={'magnifying-glass'}
              size={20}
              color={'#065956'}
              style={styles.inputIcon}
            />
          </View>

          <View style={styles.modalFlatlist}>
            <Text>List of Items</Text>
            <FlatList
              data={data.filter(
                item => item.name.toLowerCase().includes(normalizedSearchText), // && data.indexOf(item) < visibleItems,
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ItemListModal;

const styles = StyleSheet.create({
  dropDownContainer: {
    marginBottom: 20,
  },
  dropDownLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  inputTouch: {flex: 0.8},
  dropdownInputText: {
    color: '#222',
    padding: 10,
  },
  inputIcon: {
    flex: 0.1, // 10% chiều rộng
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  modalWithIcon: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  modalInputText: {
    color: '#222',
    padding: 10,
    flex: 0.8,
  },
  modalFlatlist: {
    flex: 1,
    // paddingVertical: 20,
    marginTop: 20,
  },
  modalInput: {
    padding: 2,
  },
  items: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#ddd',
    borderColor: '#bbb',
    borderBottomWidth: 1,
    borderRadius: 5,
  },
  closeButton: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#202020',
    fontWeight: 'bold',
  },
});
