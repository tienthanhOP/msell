import Realm from 'realm'
import { PRODUCT_POSTED_SCHEMA, databaseOptions } from './allSchemas'
import Utilities from '../utils/Utilities';

export const insertProduct = (data) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                if (data) {
                    realm.create(
                        PRODUCT_POSTED_SCHEMA,
                        {
                            post_code: data.post_code,
                            create_date: new Date().getTime(),
                            data: JSON.stringify(data)
                        },
                        true
                    )
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
        .catch(error => {
            reject(error)
        })
})

export const updateProduct = (data) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                if (data) {
                    realm.create(
                        PRODUCT_POSTED_SCHEMA,
                        {
                            post_code: data.post_code,
                            create_date: new Date().getTime(),
                            data: JSON.stringify(data)
                        },
                        true
                    )

                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
        .catch(error => {
            reject(error)
        })
})

export const getAllProducts = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let result = realm.objects(PRODUCT_POSTED_SCHEMA).sorted("create_date", true)
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
})

export const deleteProductByPostCode = (post_code) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let product = realm.objectForPrimaryKey(PRODUCT_POSTED_SCHEMA, post_code)
            realm.write(() => {
                realm.delete(product)
            })
            resolve(true)
        })
        .catch(error => {
            reject(error)
        })
})