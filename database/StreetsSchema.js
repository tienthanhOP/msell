import Realm from 'realm'
import { STREETS_SCHEMA, databaseOptions } from './allSchemas'
import Utilities from '../utils/Utilities';

export const insertStreets = (data) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                if (data && data.length != 0) {
                    data.forEach(element => {
                        realm.create(
                            STREETS_SCHEMA,
                            {
                                code: element.code,
                                streets: JSON.stringify(element.streets)
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

export const getAllStreetsInDistrictByCode = (code) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let result = realm.objectForPrimaryKey(STREETS_SCHEMA, code)
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
})