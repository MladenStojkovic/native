/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  ImageBackground,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import SearchInput from './components/SearchInput';
const App = () => {
  const [city, setCity] = useState();
  const [description, setDescription] = useState();
  const [temperature, setTemperature] = useState();

  const backgroundImg = require('./assets/background.jpg');

  const setLocationData = (locationData) => {
    setCity(locationData.title);
    setDescription(locationData.consolidated_weather[0].weather_state_name);
    setTemperature(Math.round(locationData.consolidated_weather[0].the_temp));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImg} resizeMode="cover" style={styles.image}>
        {city && (
          <View>
            <Text style={styles.locationInfo}>{city}</Text>
            <Text style={styles.locationInfo}>{description}</Text>
            <Text style={styles.locationInfo}>{temperature}C</Text>
          </View>
        )}
        <SearchInput setLocationData={setLocationData} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
  },

  locationInfo: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default App;
