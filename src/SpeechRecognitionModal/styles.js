import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#00000080',
  },
  modalView: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  confirmationTextStyle: {
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 22,
    marginBottom: 20,
  },
  voiceIconContainer: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: '#44815A',
    borderRadius: 50,
    marginTop: 20,
  },

  voice: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  subHeadingTextStyle: {
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: 12,
    fontSize: 14,
    color: '#333333',
    paddingBottom: 15,
  },
  retryContainer: {
    borderColor: '#888',
    borderWidth: 1,
    width: 100,
    alignSelf: 'center',
    paddingVertical: 6,
    marginHorizontal: 30,
    borderRadius: 4,
  },
});

export default styles;
