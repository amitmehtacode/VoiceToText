import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SpeechRecognitionModal from './src/SpeechRecognitionModal';

const App = () => {
  const [result, setResult] = useState('');
  const [isModalVisible, setModalVisible] = useState(false)
  return (
    <SafeAreaView>
      <Text style={styles.heading}>Voice to Text conversion</Text>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.micContainer}>
        <Image style={styles.micImage} source={require('./mic.png')} />
      </TouchableOpacity>

      <Text>{result}</Text>
      <SpeechRecognitionModal isModalVisible={isModalVisible}   />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 22,
    marginTop: 20,
    fontWeight: '600',
  },
  micContainer: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  micImage: {
    height: '100%',
    width: '100%',
  },
});
