import {
  Image,
  Modal,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState, useRef, useMemo} from 'react';

import styles from './styles';

import Voice from '@react-native-voice/voice';

const SpeechRecognitionModal = ({isModalVisible = false}) => {
  const resultsRef = useRef('');
  const timeoutRef = useRef(null);

  const [pitch, setPitch] = useState(0);
  const [results, setResults] = useState('');
  const [recognized, setRecognized] = useState(false);

  let iconSource = require('../../images.png');

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        startRecognizing();
      }, 200);
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (isModalVisible && Platform.OS === 'ios') {
      setTimeout(() => {
        if (pitch > 4 && recognized) {
          const result = resultsRef.current;
          // send data

          setTimeout(() => {
            onCloseModal();
          }, 5);
        }
      }, 3000);
    }
  }, [pitch, isModalVisible, recognized]);

  useEffect(() => {
    try {
      function onSpeechStart(e) {}

      function onSpeechResults(e) {
        setResults(e.value[0]?.trim());
        resultsRef.current = e.value[0];
      }

      function onSpeechEnd(e) {
        if (Platform.OS === 'android') {
          setTimeout(() => {
            // send data
            onCloseModal();
          }, 300);
        }
      }

      function onSpeechError(e) {
        console.log('onSpeechError: ', e);
      }

      function onSpeechRecognized(e) {
        console.log('onSpeechRecognized: ', e);
        // if user speak something then it return -> onSpeechRecognized:  {"isFinal": false}
        setRecognized(true);
      }

      function onSpeechVolumeChanged(e) {
        console.log('onSpeechVolumeChanged: ', e);
        setPitch(e.value);
      }

      Voice.onSpeechEnd = onSpeechEnd;
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechStart = onSpeechStart;
      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechRecognized = onSpeechRecognized;
      Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
      if (Platform.OS === 'android') {
        Voice.onSpeechPartialResults = onSpeechResults;
      }
    } catch (error) {}

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onCloseModal = () => {
    clearTimeout(timeoutRef.current);

    destroyRecognizer();
    
  };

  const startRecognizing = async () => {
    setRecognized(false);
    setPitch(0);
    setResults('');
    resultsRef.current = '';

    try {
      await Voice.start('en-US');
    } catch (e) {}
  };

  const destroyRecognizer = () => {
    Voice.destroy().then(Voice.removeAllListeners);
    setRecognized(false);
    setPitch(0);
    setResults('');
    resultsRef.current = '';
  };

  const showResult = useMemo(() => {
    if (results?.length > 0) {
      return results;
    }
    return '';
  }, [results]);

  return (
    <Modal
      animationType="fade"
      supportedOrientations={['portrait']}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={onCloseModal}>
      <TouchableWithoutFeedback onPress={onCloseModal}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.voiceIconContainer}>
                <Image style={styles.voice} source={iconSource} />
              </View>

              {recognized ? null : (
                <Text style={styles.subHeadingTextStyle}>
                  {'Trying saying something'}
                </Text>
              )}

              <Text
                style={[
                  styles.subHeadingTextStyle,
                  {textAlign: 'center', marginVertical: 20},
                ]}>
                {showResult}
              </Text>
              <Text style={styles.subHeadingTextStyle}>{'English'}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SpeechRecognitionModal;
