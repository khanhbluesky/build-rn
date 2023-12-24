import React, {useState, useEffect} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import api from '../../core/api';
import ItemListModalCenter from '../../common/ItemListModalCenter';
import Button from '../../common/Button';
import DateTimePicker from '../../common/DateTimePicker';

const QuoteAIR = () => {
  const [dataPortofDeparture, setDataPortofDeparture] = useState([]);
  const [dataDestinationPort, setDataDestinationPort] = useState([]);
  const [dataContainer, setDataContainer] = useState([]);

  const [selectedPortofDepartureItem, setSelectedPortofDepartureItem] =
    useState([]);
  const [selectedDestinationPortItem, setSelectedDestinationPortItem] =
    useState([]);
  const [selectedContainerItem, setSelectedContainerItem] = useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = useState(new Date());

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData('/dmkhobai', setDataPortofDeparture);
    fetchData('/dmkhobai', setDataDestinationPort);
    fetchData('/dmcong', setDataContainer);
  }, []);

  const fetchData = async (endpoint, setDataFunction) => {
    try {
      const response = await api.get(endpoint);
      setDataFunction(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePortofDepartureSelect = item => {
    const isItemSelected = selectedPortofDepartureItem.includes(item);
    setSelectedPortofDepartureItem(prevSelectedItems =>
      isItemSelected
        ? prevSelectedItems.filter(itemId => itemId !== item)
        : [item],
    );

    // setSelectedPortofDepartureItem(item.name); // Dùng cho ItemListModalCenter không có includes
  };
  const handleDestinationPortSelect = item => {
    const isItemSelected = selectedDestinationPortItem.includes(item);
    setSelectedDestinationPortItem(prevSelectedItems =>
      isItemSelected
        ? prevSelectedItems.filter(itemId => itemId !== item)
        : [item],
    );

    // setSelectedDestinationPortItem(item.name); // Dùng cho ItemListModalCenter không có includes
  };
  const handleContainerSelect = itemId => {
    const isItemSelected = selectedContainerItem.includes(itemId);

    setSelectedContainerItem(prevSelectedItems =>
      isItemSelected
        ? prevSelectedItems.filter(item => item !== itemId)
        : [...prevSelectedItems, itemId],
    );
  };

  const toggleModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{marginHorizontal: 20}}>
      <ItemListModalCenter
        title={'Port of Departure'}
        data={dataPortofDeparture.map(item => ({
          id: item.id,
          name: item.ten_kho,
        }))}
        onVisible={false}
        onSelectItem={handlePortofDepartureSelect}
        selectedItems={selectedPortofDepartureItem}
        updateSelectedItems={setSelectedPortofDepartureItem}
      />

      <ItemListModalCenter
        title={'Destination Port'}
        data={dataDestinationPort.map(item => ({
          id: item.id,
          name: item.ten_kho,
        }))}
        onVisible={false}
        onSelectItem={handleDestinationPortSelect}
        selectedItems={selectedDestinationPortItem}
        updateSelectedItems={setSelectedDestinationPortItem}
      />

      <ItemListModalCenter
        title={'Container'}
        data={dataContainer.map(item => ({
          id: item.id,
          name: item.ten_cong,
        }))}
        onVisible={true}
        onSelectItem={handleContainerSelect}
        selectedItems={selectedContainerItem}
        updateSelectedItems={setSelectedContainerItem}
      />

      <DateTimePicker
        title={'Time From'}
        selectedItems={selectedDateFrom}
        updateSelectedItems={setSelectedDateFrom}
      />

      <DateTimePicker
        title={'Time To'}
        selectedItems={selectedDateTo}
        updateSelectedItems={setSelectedDateTo}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Button
          title={'Quote Now'}
          onPress={() => {}}
          width={150}
          backgroundColor={{}}
          borderRadius={26}
          color={'#00918d'}
        />
        <Button
          title={'Search Price'}
          onPress={toggleModal}
          width={150}
          backgroundColor={'#d78430'}
          borderRadius={13}
          color={'white'}
        />
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fae"
        onRequestClose={closeModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 22,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          <Text style={{marginTop: 20, fontSize: 16}}>
            Selected Item: {selectedPortofDepartureItem}
          </Text>
          <Text style={{marginTop: 20, fontSize: 16}}>
            Selected Item: {selectedDestinationPortItem}
          </Text>
          <Text style={{marginTop: 20, fontSize: 16}}>
            Selected Item: {selectedContainerItem.join(', ')}
          </Text>
          <Text style={{marginTop: 20, fontSize: 16}}>
            Selected Item:{' '}
            {`${selectedDateFrom.getDate()}/${
              selectedDateFrom.getMonth() + 1
            }/${selectedDateFrom.getFullYear()}`}
          </Text>
          <Text style={{marginTop: 20, fontSize: 16}}>
            Selected Item:{' '}
            {`${selectedDateTo.getDate()}/${
              selectedDateTo.getMonth() + 1
            }/${selectedDateTo.getFullYear()}`}
          </Text>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={closeModal}>
            <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 16}}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default QuoteAIR;
