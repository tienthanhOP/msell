import { Platform, Dimensions, PixelRatio, AsyncStorage } from 'react-native'
import Toast from 'react-native-root-toast';
import Moment from 'moment';
import * as Constants from '../constants/Constants';
require('moment/locale/vi');
const Categories = []

let height = PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height);
let width = PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').width);


export default class Utilities {

    static checkAndroidOS() {
        var isAndroid = Platform.select({
            ios: false,
            android: true
        });
        return isAndroid;
    }

    static checkIphoneX() {
        try {

            let check = this.checkAndroidOS();
            if (!check) {
                // Xs Max
                if (width == 1242 && height == 2688) {
                    return true;
                }
                if (width == 2688 && height == 1242) {
                    return true;
                }
                //XR
                if (width == 828 && height == 1792) {
                    return true;
                }
                if (width == 1792 && height == 828) {
                    return true;
                }
                // X, Xs
                if (width == 1125 && height == 2436) {
                    return true;
                }
                if (width == 2436 && height == 1125) {
                    return true;
                }
                return false;
            } else {
                return false
            }
        } catch (error) {
         //   alert(error)
            return false
        }
    }

    static isPointInPoly(point, polygons) {
        try {
            var x = point.latitude, y = point.longitude;

            var exitst = false

            for (let index = 0; index < polygons.length; index++) {
                const polys = polygons[index];
                for (let index2 = 0; index2 < polys.length; index2++) {
                    const poly = polys[index2];

                    var intersections = 0;
                    var ss = '';

                    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {


                        var xi = poly[i].latitude;
                        var yi = poly[i].longitude;
                        var xj = poly[j].latitude;
                        var yj = poly[j].longitude;

                        if (yj == yi && yj == y && x > Math.min(xj, xi) && x < Math.max(xj, xi)) {
                            return true;
                        }

                        if (y > Math.min(yj, yi) && y <= Math.max(yj, yi) && x <= Math.max(xj, xi) && yj != yi) {
                            ss = (y - yj) * (xi - xj) / (yi - yj) + xj;
                            if (ss == x) {
                                return true;
                            }

                            if (xj == xi || x <= ss) {
                                intersections++;
                            }
                        }
                    }

                    if (intersections % 2 != 0) {
                        return true
                    }
                }
            }

            return exitst
        } catch (error) {
            return false;
        }
    }

    static log(text) {
        try {
            if (__DEV__) {
                var Reactotron = require('reactotron-react-native');
                Reactotron.default.log(text)
            }
        } catch (error) {
        }

    }

    static showToast(message, backgroundColor, textColor) {
        try {
            let bg = backgroundColor ? backgroundColor : 'black';
            let txtColor = textColor ? textColor : 'white';

            Toast.show(message, {
                duration: Toast.durations.SHORT,
                position: -80,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                textColor: txtColor,
                backgroundColor: bg
            });

        } catch (error) {
        }
    }

    static xoa_dau(str) {
        str = str.trim()

        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");

        return str.trim();
    }

    static _handlePrice(min, max) {
        try {
            var price = ""
            if (max === "") {
                if (min === "") {
                    price = "Bất kỳ"
                } else {
                    price = "Trên " + (parseInt(min) < 1000 ? min + " triệu" : parseInt(min) / 1000 + " tỷ")
                }
            } else {
                if (min === "") {
                    price = "Dưới " + (parseInt(max) < 1000 ? max + " triệu" : parseInt(max) / 1000 + " tỷ")
                } else {
                    var minTemp = min
                    var maxTemp = max

                    if (parseInt(min) > parseInt(max)) {
                        minTemp = max
                        maxTemp = min
                    }

                    if (parseInt(minTemp) < 1000 && parseInt(maxTemp) < 1000) {
                        price = (parseInt(minTemp) === 0 ? "Dưới " : "Từ " + minTemp + " - ") + maxTemp + " triệu"
                    } else {
                        price = "Từ " + (parseInt(minTemp) >= 1000 ? parseInt(minTemp) / 1000 : minTemp + " triệu")
                            + " - " + parseInt(maxTemp) / 1000 + " tỷ";
                    }
                }
            }
            return price
        } catch (error) {
            return "Bất kỳ"
        }
    }

    static _handlePropertyFilter(min, max, strUnit) {
        var strResult = ""
        if (min === "") {
            if (max !== "") {
                strResult = "Dưới " + max + " " + strUnit
            } else {
                strResult = "Bất kỳ"
            }
        } else {
            if (max !== "") {
                strResult = "Từ " + min + " - " + max + " " + strUnit
            } else {
                strResult = "Trên " + min + " " + strUnit
            }
        }
        return strResult
    }

    static async getNameCategory(catId) {
        try {
            var result = ""
            Categories.forEach(element => {
                if (catId === element.category) {
                    result = element.category_name
                }
            });
            return result
        } catch (error) {
            return ""
        }
    }

    static formatPrice(str) {
        if (str === "") {
            return "Liên hệ"
        }
        var txtPrice = "";
        try {
            if (str == 0) {
                txtPrice = "Liên hệ"
            } else {
                if (str >= 1000000 && str < 1000000000) {
                    txtPrice = (str / 1000000).toFixed(2) + " tr"
                } else {
                    if (str >= 1000000000) {
                        txtPrice = (str / 1000000000).toFixed(2) + " tỷ"
                    } else {
                        txtPrice = str + " ₫"
                    }
                }
            }
        } catch (error) {
            txtPrice = "Liên hệ"
        }

        return txtPrice.replace(".00", "").replace("0 ", " ")
    }

    static randomCharacters(numberCharacters) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < numberCharacters; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static randomCharactersNumber(numberCharacters) {
        var result = '';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < numberCharacters; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static getTimeAgo(time) {
        Moment.locale('vi');
        var timeAgo = Moment(time).fromNow();
        return timeAgo;
    }

    static async getUserToken() {
        var result = await AsyncStorage.getItem(Constants.TOKEN)
        return result
    }

    static async getUserName() {
        var result = await AsyncStorage.getItem(Constants.USER_NAME)
        return result
    }

    static async getDisplayName() {
        var result = await AsyncStorage.getItem(Constants.DISPLAY_NAME)
        return result
    }

    static async getUserID() {
        var result = await AsyncStorage.getItem(Constants.USER_ID)
        return result
    }

    static async getUserEmail() {
        var result = await AsyncStorage.getItem(Constants.USER_EMAIL)
        return result
    }

    static async getUserPhone() {
        var result = await AsyncStorage.getItem(Constants.USER_PHONE)
        return result
    }

    static async getUserAvatar() {
        var result = await AsyncStorage.getItem(Constants.USER_AVATAR)
        return result
    }
}