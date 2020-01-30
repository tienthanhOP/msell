import React, { Component } from 'react'
import {
  Text, StyleSheet, View, TouchableOpacity, AsyncStorage, Switch,
  ActivityIndicator, Alert
} from 'react-native'
import { Content } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LoginOptions from '../../containers/person/LoginOptions'
import { Actions } from 'react-native-router-flux';
import * as Constants from '../../constants/Constants';
import Utilities from '../../utils/Utilities';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
const Image = createImageProgress(FastImage);
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export default class MainScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      isLogged: false,
      avatar: null,
      displayName: "",
      email: ""
    }
  }

  async componentDidMount() {
    var isLogged = await AsyncStorage.getItem(Constants.IS_LOGGED)
    var avatar = await Utilities.getUserAvatar()
    var displayName = await Utilities.getDisplayName()
    var email = await Utilities.getUserEmail()

    this.setState({
      isLogged: isLogged ? isLogged : false,
      loading: false,
      avatar: avatar && avatar !== "" ? avatar : null,
      displayName: displayName ? displayName : "",
      email
    })
  }

  componentWillReceiveProps(nextProps) {
    try {
      this.setState({
        avatar: nextProps.userInfo.data ? nextProps.userInfo.data.avatar : null,
        displayName: nextProps.userInfo.data ? nextProps.userInfo.data.display_name : null,
        email: nextProps.userInfo.data ? nextProps.userInfo.data.email : null,
        isLogged: nextProps.userInfo.isLogged
      })
    } catch (error) {

    }
  }

  shouldComponentUpdate(nextStates, nextProps) {
    return nextStates !== this.state
  }

  render() {
    var isLogged = this.state.isLogged

    if (this.state.loading) {
      return (
        <View style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={{
          height: 130 + (Utilities.checkAndroidOS() ? 0 : getStatusBarHeight()),
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 2,
          shadowOpacity: 0.2,
          elevation: 2,
          zIndex: 9999,
          backgroundColor: 'white'
        }}>
          <View style={{
            position: 'absolute',
            bottom: 20,
            left: 16,
            right: 16,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <View style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 2,
                shadowOpacity: 0.2,
                elevation: 3,
                overflow: 'hidden'
              }}>
                {
                  this.state.avatar
                    ?
                    <Image style={{
                      height: 50,
                      width: 50,
                      backgroundColor: 'whitesmoke'
                    }}
                      source={{ uri: (Constants.IMAGES_URL + this.state.avatar) }}
                    />
                    :
                    <FontAwesome name="user-circle" color="black" size={50} />
                }
              </View>
              {
                isLogged
                  ?
                  <View>
                    <Text style={{
                      fontSize: 18,
                      marginStart: 10,
                      color: 'black',
                      fontWeight: 'bold'
                    }}>{this.state.displayName}</Text>
                    <Text style={{
                      fontSize: 14,
                      marginStart: 10,
                      color: 'black',
                      fontWeight: '400'
                    }}>{this.state.email}</Text>
                  </View>
                  :
                  null
              }

            </View>
            {
              isLogged
                ?
                null
                :
                <View style={{
                  flexDirection: 'row'
                }}>
                  <TouchableOpacity
                    onPress={() => Actions.loginOptions()}
                    style={{
                      height: 34,
                      width: 90,
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      shadowOffset: { width: 0, height: 1 },
                      shadowRadius: 2,
                      shadowOpacity: 0.2,
                      elevation: 2
                    }}>
                    <Text style={{
                      fontSize: 14,
                      color: 'white',
                      fontWeight: 'bold'
                    }}>Đăng nhập</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Actions.signUp()}
                    style={{
                      height: 34,
                      width: 90,
                      backgroundColor: 'transparent',
                      paddingHorizontal: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                      shadowOffset: { width: 0, height: 1 },
                      shadowRadius: 2,
                      shadowOpacity: 0.2,
                      elevation: 2,
                      marginStart: 10,
                      borderWidth: 1,
                      borderColor: 'black'
                    }}>
                    <Text style={{
                      fontSize: 14,
                      color: 'black',
                      fontWeight: 'bold'
                    }}>Đăng ký</Text>
                  </TouchableOpacity>
                </View>
            }
          </View>
        </View>
        <Content style={{ flex: 1, backgroundColor: 'whitesmoke' }}>
          <TouchableOpacity style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingEnd: 16,
            height: 50,
            backgroundColor: 'white'
          }}
            onPress={() => Actions.about()}
          >
            <MaterialCommunityIcons name="information-outline" size={24} color="red"
              style={{
                width: 50,
                textAlign: 'center'
              }} />
            <Text style={{
              flex: 1,
              fontSize: 15,
              color: 'black',
            }}>Giới thiệu</Text>
            <Ionicons name='ios-arrow-forward' size={24} color="rgba(0,0,0,0.5)" />
          </TouchableOpacity>
          <TouchableOpacity style={{
            marginTop: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingEnd: 16,
            height: 50,
            backgroundColor: 'white'
          }}
            onPress={() => Actions.supportCenter()}
          >
            <MaterialCommunityIcons name="help-circle-outline" size={24} color="royalblue"
              style={{
                width: 50,
                textAlign: 'center'
              }} />
            <Text style={{
              flex: 1,
              fontSize: 15,
              color: 'black'
            }}>Trung tâm hỗ trợ</Text>
            <Ionicons name='ios-arrow-forward' size={24} color="rgba(0,0,0,0.5)" />
          </TouchableOpacity>
          {
            isLogged
              ?
              <View>
                <TouchableOpacity style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingEnd: 16,
                  height: 50,
                  backgroundColor: 'white'
                }}
                  onPress={() => Actions.userInfo()}
                >
                  <Ionicons name="ios-contact" size={24} color="red"
                    style={{
                      width: 50,
                      textAlign: 'center'
                    }} />
                  <Text style={{
                    flex: 1,
                    fontSize: 15,
                    color: 'black'
                  }}>Thông tin tài khoản</Text>
                  <Ionicons name='ios-arrow-forward' size={24} color="rgba(0,0,0,0.5)" />
                </TouchableOpacity>
                <TouchableOpacity style={{
                  marginTop: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingEnd: 16,
                  height: 50,
                  backgroundColor: 'white'
                }}
                  onPress={() => Actions.changePassword()}
                >
                  <Ionicons name="md-key" size={23} color="royalblue"
                    style={{
                      width: 50,
                      textAlign: 'center'
                    }} />
                  <Text style={{
                    flex: 1,
                    fontSize: 15,
                    color: 'black'
                  }}>Đổi mật khẩu</Text>
                  <Ionicons name='ios-arrow-forward' size={24} color="rgba(0,0,0,0.5)" />
                </TouchableOpacity>
                <TouchableOpacity style={{
                  marginTop: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingEnd: 16,
                  height: 50,
                  backgroundColor: 'white'
                }}
                  onPress={() => Alert.alert("Đăng xuất",
                    "Bạn muốn đăng xuất tài khoản này?",
                    [
                      {
                        text: "Đồng ý",
                        onPress: () => {
                          this.props.logoutAction()
                        }
                      },
                      {
                        text: "Huỷ",
                        style: "cancel"
                      }
                    ],
                    {
                      cancelable: false
                    }
                  )}
                >
                  <Ionicons name="md-log-out" size={24} color="goldenrod"
                    style={{
                      width: 50,
                      textAlign: 'center'
                    }} />
                  <Text style={{
                    flex: 1,
                    fontSize: 15,
                    color: 'black'
                  }}>Đăng xuất</Text>
                  <Ionicons name='ios-arrow-forward' size={24} color="rgba(0,0,0,0.5)" />
                </TouchableOpacity>
              </View>
              : null
          }
        </Content>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})