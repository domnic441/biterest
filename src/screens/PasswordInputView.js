import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput,View, Text, TouchableHighlight ,StyleSheet,Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");


export default class PasswordInputView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            icEye: 'visibility-off', // default icon to show that password is currently hidden
            password: '', // actual value of password entered by the user
            showPassword: true // boolean to show/hide the password

        }
    }

    changePwdType = () => {
        let newState;
        if (this.state.showPassword) {
            newState = {
                icEye: 'visibility',
                showPassword: false,
                password: this.state.password
            }
        } else {
            newState = {
                icEye: 'visibility-off',
                showPassword: true,
                password: this.state.password
            }
        }
        // set new state value
        this.setState(newState)
    };
    handlePassword = (password) => {
        let newState = {
            icEye: this.state.icEye,
            showPassword: this.state.showPassword,
            password: password
        }
        this.setState(newState);
        this.props.callback(password); // used to return the value of the password to the caller class, skip this if you are creating this view in the caller class itself
    };



    render() {
        return (
            <TouchableHighlight>
                <View style={styles.passwordViewContainer}>
                 <Icon style={styles.icon}
                                        name={this.state.icEye}
                                        size={30}
                                        color={componentColors.password_icon_color}
                                        onPress={this.changePwdType}
                                    />
                    <TextInput
                        placeholder={this.props.label}
                        label={this.props.label}
                        value={this.state.password}
                        onChangeText={this.handlePassword}
                        secureTextEntry={this.state.showPassword}
                        width={wp('70%')}
                        height={hp('6%')}
                        labelActiveColor={componentColors.password_icon_color}
                        labelColor={componentColors.password_icon_color}
                        placeholderColor={componentColors.password_icon_color}
                        underlineColor={componentColors.password_icon_color}
                        underlineActiveColor={componentColors.password_icon_color}
                        underlineActiveHeight={2}
                        underlineHeight={1}
                    >
                    </TextInput>

                </View>
            </TouchableHighlight>
        );
    }
}

export const styles = StyleSheet.create({
    passwordViewContainer: {
        flexDirection: 'row',
        marginTop:5

    },
    icon: {
        marginLeft:20,
        marginRight:10
    }

});
export const componentColors = {
    password_icon_color:'black',
};
