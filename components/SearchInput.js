import React, {useState, useEffect} from 'react';
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

import {getLocation} from '../api/location';

const SearchInput = () => {
  const [input, setInput] = useState('');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);

  const fetchDataHandler = () => {
    setLoading(true);
    const data = getLocation(input)
    setLocations(data)
    setLoading(false);
  };

  const clickHandler = (id) => {
    console.log(id)
  }

  return (
    <View styles={styles.inputWrapper}>
      <TextInput
        placeholder="Enter city"
        value={input}
        onChangeText={value => setInput(value)}
        onSubmitEditing={fetchDataHandler}
        style={styles.textInput}
        placeholderTextColor={'white'}
      />
      {locations.length > 0 && (
        <View>
          {locations.map(city => (
            <TouchableOpacity style={styles.location} onPress={() => clickHandler(city.woeid)} key={city.woeid}>
              <Text>{city.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {loading && (
        <View>
          <ActivityIndicator size={'large'} color="#000" />
        </View>
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
    marginHorizontal: 20
  }
});

export default SearchInput;
