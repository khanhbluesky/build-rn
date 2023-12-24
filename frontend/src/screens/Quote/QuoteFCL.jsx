import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View} from 'react-native';
import api from '../../core/api';
import DropdownBox from '../../common/SearchableDropdown';
import Button from '../../common/Button';
import DateTimePicker from '../../common/DateTimePicker';

export default function QuoteFCL({navigation}) {
  const [dataPortofDeparture, setDataPortofDeparture] = useState([]);
  const [dataDestinationPort, setDataDestinationPort] = useState([]);
  const [dataContainer, setDataContainer] = useState([]);
  const [selectedItemPortofDeparture, setSelectedItemPortofDeparture] =
    useState([]);
  const [selectedItemDestinationPort, setSelectedItemDestinationPort] =
    useState([]);
  const [selectedItemContainer, setSelectedItemContainer] = useState([]);
  const [isDropdownVisiblePort, setDropdownVisiblePort] = useState(false);
  const [isDropdownVisibleDestination, setDropdownVisibleDestination] =
    useState(false);
  const [isDropdownVisibleContainer, setDropdownVisibleContainer] =
    useState(false);
  const [selectedDateFrom, setSelectedDateFrom] = useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = useState(new Date());

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //   });
  // }, []);

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

  // const onItemSelectContainer = item => {
  //   const isItemSelected = selectedItemContainer.some(
  //     selectedItem => selectedItem.name === item.name,
  //   );

  //   if (isItemSelected) {
  //     const updatedItems = selectedItemContainer.filter(
  //       selectedItem => selectedItem.name === item.name,
  //     );
  //     setSelectedItemContainer(updatedItems);
  //   } else {
  //     setSelectedItemContainer([...selectedItemContainer, item]);
  //   }
  // };

  const onItemSelectContainer = item => {
    const isItemSelected = selectedItemContainer.findIndex(
      selectedItem => selectedItem.name === item.name,
    );

    if (isItemSelected === -1) {
      setSelectedItemContainer([...selectedItemContainer, item]);
    } else {
      const updatedItems = [...selectedItemContainer];
      updatedItems.splice(isItemSelected, 1);
      setSelectedItemContainer(updatedItems);
    }
  };

  const onClearAllPortofDeparture = () => {
    setSelectedItemPortofDeparture([]);
  };
  const onClearAllDestinationPort = () => {
    setSelectedItemDestinationPort([]);
  };
  const onClearAllContainer = () => {
    setSelectedItemContainer([]);
  };

  return (
    <View style={{paddingHorizontal: 20}}>
      <DropdownBox
        title={'Port of Departure'}
        onPress={() => {
          setDropdownVisiblePort(!isDropdownVisiblePort);
          setDropdownVisibleDestination(false); // Đặt các dropdown khác thành false
          setDropdownVisibleContainer(false);
        }}
        onItemSelect={item => setSelectedItemPortofDeparture(item)}
        items={dataPortofDeparture.map(item => ({
          id: item.id,
          name: item.ten_kho,
        }))}
        placeholder={'Select Port of Departure'}
        selectedItem={selectedItemPortofDeparture}
        textInputProps={{
          value: selectedItemPortofDeparture
            ? selectedItemPortofDeparture.name
            : '', // Đặt giá trị vào ô tìm kiếm
        }}
        onClearAll={onClearAllPortofDeparture}
        iconName={'chevron-down'}
      />

      <DropdownBox
        title={'Destination Port'}
        onPress={() => {
          setDropdownVisibleDestination(!isDropdownVisibleDestination);
          setDropdownVisiblePort(false); // Đặt các dropdown khác thành false
          setDropdownVisibleContainer(false);
        }}
        onItemSelect={item => setSelectedItemDestinationPort(item)}
        items={dataDestinationPort.map(item => ({
          id: item.id,
          name: item.ten_kho,
        }))}
        placeholder={'Select Destination Port'}
        selectedItem={selectedItemDestinationPort}
        textInputProps={{
          value: selectedItemDestinationPort
            ? selectedItemDestinationPort.name
            : '', // Đặt giá trị vào ô tìm kiếm
        }}
        onClearAll={onClearAllDestinationPort}
        iconName={'chevron-down'}
      />

      <DropdownBox
        title={'Container'}
        onPress={() => {
          setDropdownVisibleContainer(!isDropdownVisibleContainer);
          setDropdownVisiblePort(false); // Đặt các dropdown khác thành false
          setDropdownVisibleDestination(false);
        }}
        onItemSelect={item => onItemSelectContainer(item)}
        onRemoveItem={(item, index) => {
          const updatedItems = [...selectedItemContainer];
          updatedItems.splice(index, 1);
          setSelectedItemContainer(updatedItems);
        }}
        items={dataContainer.map(item => ({
          id: item.ma_cong,
          name: item.ten_cong,
        }))}
        placeholder={'Select Container'}
        selectedItem={selectedItemContainer}
        textInputProps={{
          value: selectedItemContainer.map(item => item.name).join(', '),
        }}
        onClearAll={onClearAllContainer}
        searchable={false}
        iconName={'boxes-stacked'}
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
          onPress={() => {}}
          width={150}
          backgroundColor={'#d78430'}
          borderRadius={13}
          color={'white'}
        />
      </View>
    </View>
  );
}
