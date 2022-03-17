import React, {useState, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const LocationSuggestions = ({locations, onPressHandler}) => {

const renderItem = location => (
  <TouchableWithoutFeedback
    style={styles.listItem}
    onPress={() => {
      onPressHandler(location.item);
    }}
    key={location.woeid}>
      <Text>{location.item.title}</Text>
  </TouchableWithoutFeedback>
)

  return (
      <View>
        <FlatList
        style={styles.listContainer}
        data={locations}
        keyExtractor={(item) => item.woeid}
        renderItem={renderItem}
      />
      </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 0,
    maxHeight: 60,
    marginHorizontal: 20,
    backgroundColor: '#fff'
  }
});

export default LocationSuggestions;
