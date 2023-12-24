import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Text, View} from 'react-native';
import api from '../../core/api';
import ItemListModal from '../../common/ItemListModal';

const QuoteLCL = ({navigation}) => {
  const [dataPortofDeparture, setDataPortofDeparture] = useState([]);
  const [dataDestinationPort, setDataDestinationPort] = useState([]);
  const [dataContainer, setDataContainer] = useState([]);

  const [selectedPortofDepartureItem, setSelectedPortofDepartureItem] =
    useState([]);
  const [selectedDestinationPortItem, setSelectedDestinationPortItem] =
    useState([]);
  const [selectedContainerItem, setSelectedContainerItem] = useState([]);

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

  // Dùng cho ItemListModalCenter không có includes
  // const handlePortofDepartureSelect = item => {
  //   setSelectedPortofDepartureItem(item.name);
  // };
  // const handleDestinationPortSelect = item => {
  //   setSelectedDestinationPortItem(item.name);
  // };
  // const handleContainerSelect = item => {
  //   const isItemSelected = selectedContainerItem.includes(item);

  //   setSelectedContainerItem(prevSelectedItems =>
  //     isItemSelected
  //       ? prevSelectedItems.filter(itemId => itemId !== item)
  //       : [...prevSelectedItems, item],
  //   );
  // };

  const handlePortofDepartureSelect = item => {
    const isItemSelected = selectedContainerItem.includes(item);
    setSelectedPortofDepartureItem(prevSelectedItems =>
      isItemSelected
        ? prevSelectedItems.filter(itemId => itemId !== item)
        : [item],
    );

    // setSelectedPortofDepartureItem(item.name); // Dùng cho ItemListModalCenter không có includes
  };
  const handleDestinationPortSelect = item => {
    const isItemSelected = selectedContainerItem.includes(item);
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

      <ItemListModal
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

      {/* <ItemListModalCenter
        title={'Container'}
        data={dataContainer.map(item => ({
          id: item.id,
          name: item.ten_cong,
        }))}
        onVisible={true}
        onSelectItem={handleContainerSelect}
        selectedItems={selectedContainerItem}
        updateSelectedItems={setSelectedContainerItem}
      /> */}

      <Text style={{marginTop: 20, fontSize: 16}}>
        Selected Item: {selectedPortofDepartureItem}
      </Text>
      <Text style={{marginTop: 20, fontSize: 16}}>
        Selected Item: {selectedDestinationPortItem}
      </Text>
      <Text style={{marginTop: 20, fontSize: 16}}>
        Selected Item: {selectedContainerItem.join(', ')}
      </Text>
    </View>
  );
};

export default QuoteLCL;
