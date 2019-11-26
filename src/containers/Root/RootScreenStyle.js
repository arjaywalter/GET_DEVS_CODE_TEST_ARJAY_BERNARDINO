import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  activityIndicator: {flex: 1, padding: 20},
  listContainer: {padding: 16},
  itemContainer: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  item: {
    padding: 8,
    fontSize: 18,
  },
  stretch: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
    borderRadius: 50 / 2,
    margin: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 12,
  },
});
