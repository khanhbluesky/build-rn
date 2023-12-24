import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const MutiItemListModalCenter = ({
  title,
  data,
  iconName,
  onSelectItem,
  selectedItems,
  updateSelectedItems,
}) => {
  const [searchText, setSearchText] = useState('');
  const normalizedSearchText = searchText.toLowerCase();

  // const [selectedItems, setSelectedItems] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  // const toggleItemSelection = itemId => {
  //   const isItemSelected = selectedItems.includes(itemId);

  //   setSelectedItems(prevSelectedItems =>
  //     isItemSelected
  //       ? prevSelectedItems.filter(item => item !== itemId)
  //       : [...prevSelectedItems, itemId],
  //   );
  // };
  const toggleItemSelection = itemId => {
    onSelectItem(itemId);
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
      onPress={() => toggleItemSelection(item.name)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{marginBottom: 20}}>
      <Text style={{fontSize: 16, marginBottom: 5}}>{title}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        }}>
        <TouchableOpacity
          style={{flex: 0.8}}
          onPress={() => setModalVisible(true)}>
          <TextInput
            style={{color: '#222', padding: 10}}
            placeholder="Select an option"
            value={
              Array.isArray(selectedItems)
                ? selectedItems.join(', ')
                : selectedItems
            }
            // value={selectedItems.join(', ')}
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
          style={{
            flex: 0.1, // 10% chiều rộng
            textAlign: 'center',
          }}
        />
      </View>

      <Modal
        visible={isModalVisible}
        transparent={false}
        animationType="slide" // slide hoặc fae
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              width: '80%',
              maxHeight: 400,
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              }}>
              <TextInput
                placeholder="Search..."
                value={searchText}
                onChangeText={text => setSearchText(text)}
                style={{
                  color: '#222',
                  padding: 10,
                  flex: 0.8,
                }}
              />
              <TouchableOpacity onPress={onClearValue}>
                <FontAwesome6 name="times-circle" size={16} color={'#ccc'} />
              </TouchableOpacity>

              <FontAwesome6
                name={'magnifying-glass'}
                size={20}
                color={'#065956'}
                style={{
                  flex: 0.1, // 10% chiều rộng
                  textAlign: 'center',
                }}
              />
            </View>

            <Text>List of Items</Text>
            <FlatList
              data={data.filter(item =>
                item.name.toLowerCase().includes(normalizedSearchText),
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{textAlign: 'center', marginTop: 10, color: 'blue'}}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MutiItemListModalCenter;
