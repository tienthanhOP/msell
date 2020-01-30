import Realm from 'realm'
import { CITYS_SCHEMA, databaseOptions } from './allSchemas'
import Utilities from '../utils/Utilities';

export const insertCitys = (data) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                if (data && data.length != 0) {
                    data.forEach(element => {
                        realm.create(
                            CITYS_SCHEMA,
                            {
                                name: element.name,
                                code: element.code,
                                locations: JSON.stringify(element.locations)
                            },
                            true
                        )
                    });
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

export const getAllCitys = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let result = realm.objects(CITYS_SCHEMA)
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
})

export const getLocationCityByCode = (code) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let result = realm.objectForPrimaryKey(CITYS_SCHEMA, code)
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
})