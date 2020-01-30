import Realm from 'realm'
import { PRODUCT_FAVOURITE_SCHEMA, databaseOptions } from './allSchemas'
import Utilities from '../utils/Utilities';

export const insertProductFavourite = (product) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                if (product) {
                    realm.create(
                        PRODUCT_FAVOURITE_SCHEMA,
                        {
                            product_id: product.product_id,
                            create_date: new Date().getTime(),
                            data: JSON.stringify(product),
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
});

export const checkProductLikeToExist = (product_id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let name = realm.objectForPrimaryKey(PRODUCT_FAVOURITE_SCHEMA, product_id)
            if (name) {
                resolve(true)
            } else {
                resolve(false)
            }
        }).catch(error => {
            reject(error)
        })
});

export const dislikeProductByProductId = (product_id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let name = realm.objectForPrimaryKey(PRODUCT_FAVOURITE_SCHEMA, product_id)
            realm.write(() => {
                realm.delete(name)
            })
            resolve(true)
        }).catch(error => {
            reject(error)
        })
});


export const getProductFavourites = (skip) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let all = realm.objects(PRODUCT_FAVOURITE_SCHEMA);
            let arrSort = all.sorted("create_date", true);
            let arr = arrSort.slice(skip, skip + 10);
            let result = [];
            arr.forEach(element => {
                let item = JSON.parse(element.data);
                result.push(item)
            });

            resolve(result)
        }).catch(error => {
            reject(error)
        })
})