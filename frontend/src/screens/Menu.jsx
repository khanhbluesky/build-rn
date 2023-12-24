import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import NumericInput from '../common/NumericInput';
import ItemListModal from '../common/ItemListModal';
import api from '../core/api';
import DateTimePicker from '../common/DateTimePicker';
import Button from '../common/Button';

const Menu = () => {
  const [dataPortofDeparture, setDataPortofDeparture] = useState([]);
  const [dataDestinationPort, setDataDestinationPort] = useState([]);
  const [weightValue, setWeightValue] = useState(0);
  const [totalBlockValue, setTotalBlockValue] = useState(0);

  const [selectedPortofDepartureItem, setSelectedPortofDepartureItem] =
    useState([]);
  const [selectedDestinationPortItem, setSelectedDestinationPortItem] =
    useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = useState(new Date());

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData('/dmkhobai', setDataPortofDeparture);
    fetchData('/dmkhobai', setDataDestinationPort);
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
  };
  const handleDestinationPortSelect = item => {
    const isItemSelected = selectedDestinationPortItem.includes(item);
    setSelectedDestinationPortItem(prevSelectedItems =>
      isItemSelected
        ? prevSelectedItems.filter(itemId => itemId !== item)
        : [item],
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
      <ItemListModal
        title={'Port of Departure'}
        data={dataPortofDeparture.map(item => ({
          id: item.id,
          name: item.ten_kho,
        }))}
        iconName={'chevron-down'}
        onVisible={false}
        onSelectItem={handlePortofDepartureSelect}
        selectedItems={selectedPortofDepartureItem}
        updateSelectedItems={setSelectedPortofDepartureItem}
      />

      <ItemListModal
        title={'Destination Port'}
        data={dataDestinationPort.map(item => ({
          id: item.id,
          name: item.ten_kho,
        }))}
        iconName={'chevron-down'}
        onVisible={false}
        onSelectItem={handleDestinationPortSelect}
        selectedItems={selectedDestinationPortItem}
        updateSelectedItems={setSelectedDestinationPortItem}
      />

      <NumericInput
        title={'Weight'}
        value={weightValue}
        setValue={setWeightValue}
      />

      <NumericInput
        title={'Weight'}
        value={totalBlockValue}
        setValue={setTotalBlockValue}
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
            Selected Item: {weightValue}
          </Text>
          <Text style={{marginTop: 20, fontSize: 16}}>
            Selected Item: {totalBlockValue}
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

export default Menu;
