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
import _ from 'lodash';

class RootScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      completeSource: [],
      searchValue: '',
    };
  }

  componentDidMount() {
    return fetch('https://api.github.com/users')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
            completeSource: responseJson,
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

  onChangeText = text => {
    this.setState({searchValue: text});
    const completeSource = this.state.completeSource;
    if (_.isEmpty(text)) {
      this.setState({dataSource: completeSource});
    } else {
      let filterData = completeSource.filter(item =>
        item.login.toLowerCase().includes(text.toLowerCase()),
      );
      this.setState({dataSource: filterData});
    }
  };

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
          style={styles.input}
          onChangeText={text => this.onChangeText(text)}
          value={this.state.searchValue}
          placeholder={'Search'}
        />
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={({login}, index) => login}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default RootScreen;
