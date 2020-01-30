import { call, fork, all } from 'redux-saga/effects'

import { watchGetProducts } from './map/GetDataToMap'
import { watchSearch } from './search/Search'
import { watchSearchProject } from './product/SearchProjects'
import { watchGetsProjectByLocation } from './product/GetProjectsByLocationId'
import { watchUploadImage } from './product/UploadImages';
import { watchAddProduct } from './product/AddProduct';
import { watchAddProductToList } from './product/AddProductToList'
import { watchDeleteProductPosted } from './product/DeleteProductPosted';
import { watchGetDetailProductByProductId } from './product/GetDetailProduct';
import { watchUpdateProduct } from './product/UpdateProduct';
import { watchGetProductPosted } from './product/GetProductsPosted';
import { watchUpdateProductToList } from './product/UpdateProductToList';
import { watchRegister } from './user/Register';
import { watchActiveAccount } from './user/ActiveAccount';
import { watchSendEmail } from './user/SendEmail';
import { watchLogin } from './user/Login';
import { watchLogout } from './user/Logout';
import { watchGetUserInfo } from './user/GetUserInfo';
import { watchUpdateUserInfo } from './user/UpdateUserInfo';
import { watchForgotPassword } from './user/ForgotPassword';
import { watchGetProductFavourite } from './product/GetProductsFavourite';

export default function* rootSaga() {
    yield [
        all([
            watchGetProducts(),
            watchSearch(),
            watchSearchProject(),
            watchGetsProjectByLocation(),
            watchUploadImage(),
            watchAddProduct(),
            watchAddProductToList(),
            watchGetProductPosted(),
            watchDeleteProductPosted(),
            watchGetDetailProductByProductId(),
            watchUpdateProduct(),
            watchUpdateProductToList(),
            watchRegister(),
            watchActiveAccount(),
            watchSendEmail(),
            watchLogin(),
            watchLogout(),
            watchGetUserInfo(),
            watchUpdateUserInfo(),
            watchForgotPassword(),
            watchGetProductFavourite()
        ])
    ]
}