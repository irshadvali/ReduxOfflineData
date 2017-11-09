import React, { Component } from 'react';
import { View, Text, ScrollView, NetInfo, TextInput, TouchableOpacity } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { StackNavigator, NavigationActions } from "react-navigation";
import { addUser, addUserByUrl, connectionState, reset } from '../action/adduser.action';
import AddUserStyle from "../styles/AddUserStyle"

class AddUser extends Component {

    static navigationOptions = {
        title: 'Add User',
    };

    state = {
        username: "",
        password: "",
        email: "",
        firstName: "",
        LastName: "",
    };

    //reset the values
    componentWillMount() {
        this.props.dispatch(reset());
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

    //set the state (username,password,email,firstname,lastname)
    handleUsername = text => {
        this.setState({ username: text });
    };


    handlePassword = text => {
        this.setState({ password: text });
    };

    handleEmail = text => {
        this.setState({ email: text });
    };

    handleFirstName = text => {
        this.setState({ firstName: text });
    };


    handleLastName = text => {
        this.setState({ LastName: text });
    };

    //add user onClick of Button
    addNewUser = () => {
        this.props.dispatch(addUser(this.state.firstName, this.state.LastName, this.state.username, this.state.password, this.state.email));
    }

    //check the props values and go back to the previous page
    componentWillReceiveProps(nextProps) {
        const { goBack } = this.props.navigation;
        if (nextProps.result === 0) {
            this.props.dispatch(reset());
            alert("Added Successfully");
            goBack();
        }
        else if (nextProps.result == 'added offline') {
            this.props.dispatch(reset());
            alert("Data Added Offline once internet active data will sync");
            goBack();
        }
    }

    render() {
        return (
            <View style={AddUserStyle.container}>

                <Text style={AddUserStyle.textHeaderstyle}>Account Details</Text>

                <TextInput
                    style={AddUserStyle.InputStyle}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#74787f"
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={this.handleEmail}
                />
                <TextInput
                    style={AddUserStyle.InputStyle}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#74787f"
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={this.handlePassword}
                />

                <Text style={AddUserStyle.textHeaderstyle}> User Details</Text>

                <TextInput
                    style={AddUserStyle.InputStyle}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#74787f"
                    autoCapitalize="none"
                    placeholder="First Name"
                    onChangeText={this.handleFirstName}
                />
                <TextInput
                    style={AddUserStyle.InputStyle}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#74787f"
                    autoCapitalize="none"
                    placeholder="Last Name"
                    onChangeText={this.handleLastName}
                />

                <TextInput
                    style={AddUserStyle.InputStyle}
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#74787f"
                    autoCapitalize="none"
                    placeholder="User Name"
                    onChangeText={this.handleUsername}
                />

                <TouchableOpacity
                    style={AddUserStyle.Buttonstyle}
                    onPress={this.addNewUser}
                    underlayColor="red">
                    <Text style={AddUserStyle.textstyle}> Add User</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        actionQueue: state.adduser.actionQueue,
        isConnected: state.adduser.isConnected,
        result: state.adduser.result,
    };
};

export default connect(mapStateToProps)(AddUser);
