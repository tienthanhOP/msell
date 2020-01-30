import React, { Component } from 'react'
import {
    Text, View,
    TouchableOpacity
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Actions, Scene, Router, Stack, ActionConst, Tabs } from 'react-native-router-flux';

import TabMap from '../containers/map/MainScreen';
import TabNotification from './notification/MainScreen';
import TabFavourite from '../containers/favourite/MainScreen';
import TabPerson from '../containers/person/MainScreen';
import LoginOptions from '../containers/person/LoginOptions';
import DetailProduct from '../containers/detail_product/DetailScreen';
import ZoomMapInDetail from './detail_product/ZoomMapInDetail'
import FilterMap from '../containers/map/Filter'
import Search from '../containers/search/MainScreen'
import SaveFilter from './map/SaveFilter'
import SignUp from '../containers/person/SignUp'
import ForgotPassword from '../containers/person/ForgotPassword'
import SendEmail from '../containers/person/SendEmail'
import UserInfo from '../containers/person/UserInfo'
import PreviewImage from './detail_product/PreviewImage'
// import Splash from './Splash'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import Utilities from '../utils/Utilities';
import AddProduct from '../containers/add_product/MainScreen';
import TabPost from '../containers/post/MainScreen';
import ActiveAccount from '../containers/person/ActiveAccount';
import ChangePassword from '../containers/person/ChangePassword';
import About from './person/About';
import SupportCenter from './person/SupportCenter';

class BottomBar extends Component {

    _jumpKey(key) {
        if (String(Actions.currentScene).includes(key)) return;
        Actions.jump(key)
        this.setState({
            activeKey: key
        })
    }

    state = {
        activeKey: 'tabMap'
    }

    render() {
        return (
            <View style={{
                paddingBottom: getBottomSpace(),
                height: 56 + getBottomSpace(),
                flexDirection: 'row',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                shadowOffset: { width: 0, height: -1 },
                shadowRadius: 2,
                shadowOpacity: 0.2,
                elevation: 5
            }}>
                {
                    this.props.navigation.state.routes.map(item => {

                        let actived = String(item.key).includes(this.state.activeKey);
                        let badge = null;
                        let icon = null;
                        let title = '';
                        switch (item.key) {
                            case "tabMap":
                                title = "Bản đồ"
                                icon = <FontAwesome
                                    name={actived ? "map" : "map-o"}
                                    size={20}
                                    color={actived ? 'black' : 'rgba(0,0,0,0.5)'} />
                                break;
                            case "tabNotification":
                                title = "Nhà mới"
                                icon = <FontAwesome
                                    name={actived ? "bell" : "bell-o"}
                                    size={20}
                                    color={actived ? 'black' : 'rgba(0,0,0,0.5)'} />
                                break;
                            case "tabPerson":
                                title = "Tài khoản"
                                icon = <FontAwesome
                                    name={actived ? "user" : "user-o"}
                                    size={20}
                                    color={actived ? 'black' : 'rgba(0,0,0,0.5)'} />
                                break;
                            case "tabFavourite":
                                title = "Yêu thích"
                                icon = <FontAwesome
                                    name={actived ? "heart" : "heart-o"}
                                    size={20}
                                    color={actived ? 'black' : 'rgba(0,0,0,0.5)'} />
                                break;
                            case "tabPost":
                                title = "Tin đăng"
                                icon = <FontAwesome
                                    name={actived ? "pencil-square" : "pencil-square-o"}
                                    size={20}
                                    color={actived ? 'black' : 'rgba(0,0,0,0.5)'} />
                                break;
                            default:
                                icon = null;
                                break;
                        }
                        // if (item.key == 'tabPerson') badge = global.countNotification > 0 ? <View style={{
                        //     position: 'absolute', width: 10, height: 10, top: Dimensions.get('window').width / 64,
                        //     right: Dimensions.get('window').width / 16, borderRadius: 10,
                        //     backgroundColor: 'black'
                        // }}></View> : null

                        return (
                            <TouchableOpacity activeOpacity={0.9}
                                onPress={() => this._jumpKey(item.key)}
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                {icon}
                                {badge}
                                <Text style={{
                                    marginTop: 2,
                                    fontSize: 10,
                                    color: actived ? 'black' : 'rgba(0,0,0,0.5)',
                                    bottom: Utilities.checkIphoneX() ? 0 : 0
                                }}>{title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
}

const AppNavigator = Actions.create(
    <Router>
        <Stack key="root" hideNavBar
            transitionConfig={() => ({
                screenInterpolator: (props) => {
                    const { scene } = props
                    switch (scene.route.routeName) {
                        // case "directMessage": return StackViewStyleInterpolator.forHorizontal(props);
                        // case "friendDetail": return StackViewStyleInterpolator.forHorizontal(props);
                        default:
                            return StackViewStyleInterpolator.forFade(props)
                    }
                }
            })}>

            <Scene
                tabs
                key="tabMain"
                routeName="tabMap"
                lazy
                backToInitial
                tabBarPosition="bottom"
                // swipeEnabled={true}
                tabBarComponent={BottomBar}
                type={ActionConst.REPLACE}>

                <Scene key="tabMap" tabBarLabel='Home' component={TabMap} hideNavBar />
                {/* <Scene key="tabNotification" tabBarLabel='News' component={TabNotification} hideNavBar  /> */}
                <Scene key="tabFavourite" tabBarLabel='Favourite' component={TabFavourite} hideNavBar />
                <Scene key="tabPost" tabBarLabel='Post' component={TabPost} hideNavBar />
                <Scene key="tabPerson" tabBarLabel='Person' component={TabPerson} hideNavBar />
            </Scene>

            <Scene key="addProduct" tabBarLabel='Add Product' component={AddProduct} hideNavBar />
            <Scene key="detailProduct" hideNavBar component={DetailProduct} />
            <Scene key="zoomMapInDetail" hideNavBar component={ZoomMapInDetail} />
            <Scene key="filterMap" hideNavBar component={FilterMap} />
            <Scene key="search" hideNavBar component={Search} />
            <Scene key="saveFilter" hideNavBar component={SaveFilter} />
            <Scene key="signUp" hideNavBar component={SignUp} />
            <Scene key="forgotPassword" hideNavBar component={ForgotPassword} />
            <Scene key="sendEmail" hideNavBar component={SendEmail} />
            <Scene key="loginOptions" hideNavBar component={LoginOptions} />
            {/* <Scene key="tabPerson" hideNavBar component={TabPerson} /> */}
            <Scene key="userInfo" hideNavBar component={UserInfo} />
            <Scene key="previewImage" hideNavBar component={PreviewImage} />
            <Scene key="activeAccount" hideNavBar component={ActiveAccount} />
            <Scene key="changePassword" hideNavBar component={ChangePassword} />
            <Scene key="about" hideNavBar component={About} />
            <Scene key="supportCenter" hideNavBar component={SupportCenter} />
        </Stack>
    </Router >
);

export default AppNavigator;