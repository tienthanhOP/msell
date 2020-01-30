import { combineReducers } from 'redux';
import reducer from './initReducer';
import navReducer from './NavReducer';
import mainMap from './map/MainScreenReducer';
import detailProduct from './map/Detail'
import toolbarMainScreen from './map/ToolbarMap'
import eventClickItemSearch from './search/EventClickItemSearch'
import disableViewList from './map/DisableViewList'
import searchReducer from './search/SearchReducer'
import searchProjects from './product/SearchProjects';
import getProjectsByLocations from './product/GetProjectsByLocationId';
import uploadImages from './product/UploadImages';
import productPosted from './product/ProductPosted';
import register from './person/Register';
import activeAccount from './person/ActiveAccount';
import sendEmail from './person/SendEmail';
import userInfo from './person/UserInfo';
import forgotPassword from './person/ForgotPassword';
import productFavourite from './product/ProductFavourite';

const appReducer = combineReducers({
    nav: navReducer,
    reducer,
    mainMap,
    detailProduct,
    toolbarMainScreen,
    eventClickItemSearch,
    disableViewList,
    searchReducer,
    searchProjects,
    getProjectsByLocations,
    uploadImages,
    productPosted,
    register,
    activeAccount,
    sendEmail,
    userInfo,
    forgotPassword,
    productFavourite
});

export default appReducer