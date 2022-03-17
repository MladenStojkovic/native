import React, { useState, useEffect } from 'react';
import {
  TextInput,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import LocationSuggestions from './LocationSuggestions'

import { getLocation } from '../api/location';
import { getWeather } from '../api/weather';

const SearchInput = ({ setLocationData }) => {
  const [input, setInput] = useState('');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState();
  const [selectedLocation, setSelectedLocation] = useState(false);

  const getWeatherHandler = async (locationData) => {
    setLocations([])
    setSelectedLocation(true)
    setLoading(true)
    setInput(locationData.title)
    setLoading(true);
    const weatherData = await getWeather(locationData.woeid);
    setLocationData(weatherData);
    setLoading(false);
  };

  useEffect(() => {
    if (input && !selectedLocation) {
      const fetchData = async () => {
        const data = await getLocation(input);
        setLocations(data)
      }

      let timer = setTimeout(() => {
          fetchData()
      }, 500);

      return () => {
        clearTimeout(timer)
      }
    }
    setSelectedLocation(false)
  }, [input])

  return (
    <View styles={styles.inputWrapper}>
      <TextInput
        placeholder="Enter city"
        value={input}
        onChangeText={(value) => setInput(value)}
        style={styles.textInput}
        placeholderTextColor={'white'}
      />
      {loading && (
        <View>
          <ActivityIndicator size={'large'} color="#000" />
        </View>
      )}
      {!!locations.length && !selectedLocation && (
        <LocationSuggestions locations={locations} onPressHandler={getWeatherHandler} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 5,
    padding: 2,
  },
  location: {
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
});

export default SearchInput;
