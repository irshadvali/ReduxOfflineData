import React, { Component } from 'react';
import { View, Text, ScrollView, NetInfo, ActivityIndicator, ListView, TouchableOpacity } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { StackNavigator, NavigationActions } from "react-navigation";
import { fetchUserList, connectionState } from '../action/userList.action';
import { addUserByUrl } from '../action/adduser.action';
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id
});
class UserList extends Component {

  static navigationOptions = {
    title: 'User List',
  };

  //fetch the userlist
  componentWillMount() {
    this.props.dispatch(fetchUserList());
  }

  //listener for internet connection
  componentDidMount() {
    NetInfo.addEventListener('change', this._handleConnectionChange);

    NetInfo.isConnected.fetch().done(
      (isConnected) => {
        this._handleConnectionChange
      }
    );
  }

  //check the props values and update the list
  componentWillReceiveProps(nextProps) {
    this.props.dispatch(fetchUserList());
  }

  //remove the internet listener 
  componentWillUnmount() {
    NetInfo.removeEventListener('change', this._handleConnectionChange);
  }

   //handle the action when the internet connetion changes
  _handleConnectionChange = (isConnected) => {

    const { dispatch, actionQueue } = this.props;
    dispatch(connectionState({ status: isConnected }));

    if (isConnected && actionQueue.length > 0) {
      actionQueue.forEach((url) => {
        this.props.dispatch(addUserByUrl({ url }));
      });

    }
  };

  //on click of floating button navigate to add user
  AddNewUser = () => {
    var { navigate } = this.props.navigation;
    navigate("AddUser", {});
  };

  render() {
    if (this.props.User != undefined && this.props.User.length != 0) {
      return (
        <View style={{ flex: 1 }}>
          <ListView
            dataSource={ds.cloneWithRows(this.props.User)}
            style={{ backgroundColor: "#ffffff" }}
            renderRow={rowData => (
              <TouchableOpacity style={{
                height: 35,
                justifyContent: "center",
                marginLeft: 15,
                marginRight: 15,
                marginTop: 5,
                padding: 15,
                backgroundColor: "#dddddd",
                borderRadius: 3
              }}
                activeOpacity={0.7}
                throttleTime={2000}>
                <View>
                  <Text style={{
                    color: "#000000",
                    fontSize: 14
                  }}>
                    {rowData.username}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />

          <Icon
            raised
            name={this.props.isConnected ? 'add' : 'alarm-add'}
            color='#51b9d3'
            reverse
            containerStyle={{ position: 'absolute', right: 20, bottom: 20 }}
            onPress={this.AddNewUser}
          />
        </View>
      );
    }
    else {

      return (
        <View>
          <ActivityIndicator>

          </ActivityIndicator>
        </View>
      );

    }
  }
}

const mapStateToProps = (state) => {
  return {
    User: state.userList.User,
    error: state.userList.error,
    isConnected: state.userList.isConnected,
    actionQueue: state.adduser.actionQueue,
  };
};

export default connect(mapStateToProps)(UserList);
