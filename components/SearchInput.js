import React, { useState, useEffect } from 'react';
import {
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { getLocation } from '../api/location';
import { getWeather } from '../api/weather';

const SearchInput = ({ setLocationData }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState();

  const fetchDataHandler = async () => {
    if (!input) {
      return
    }
    setLoading(true);
    const data = await getLocation(input);
    if (!data) {
      setLoading(false);
      return;
    }
    const location = data.find((city) => city.title.toLowerCase() === input.toLowerCase());
    if (!location) {
      setLoading(false);
      return;
    }
    const weatherData = await getWeather(location.woeid);
    setLocationData(weatherData);
    setLoading(false);
  };

  return (
    <View styles={styles.inputWrapper}>
      {loading && (
        <View>
          <ActivityIndicator size={'large'} color="#000" />
        </View>
      )}
      <TextInput
        placeholder="Enter city"
        value={input}
        onChangeText={(value) => setInput(value)}
        onSubmitEditing={fetchDataHandler}
        style={styles.textInput}
        placeholderTextColor={'white'}
      />
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
