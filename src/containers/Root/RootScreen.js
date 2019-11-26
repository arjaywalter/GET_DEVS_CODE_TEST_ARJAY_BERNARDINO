import React, {Component} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import styles from './RootScreenStyle';

class RootScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount() {
    return fetch('https://api.github.com/users')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderItem = ({item}) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image style={styles.stretch} source={{uri: item.avatar_url}} />
      <Text style={styles.item}>{item.login}</Text>
    </View>
  );

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <SafeAreaView>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            paddingHorizontal: 16,
          }}
          // onChangeText={text => onChangeText(text)}
          // value={value}
        />
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={({id}, index) => id}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default RootScreen;
