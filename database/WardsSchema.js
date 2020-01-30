import Realm from 'realm'
import { WARDS_SCHEMA, databaseOptions } from './allSchemas'

export const insertWards = (data) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                if (data && data.length != 0) {
                    data.forEach(element => {
                        realm.create(
                            WARDS_SCHEMA,
                            {
                                code: element.code,
                                name: element.name,
                                parent_code: element.parent_code,
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

export const getLocationWardsByCode = (code) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let result = realm.objectForPrimaryKey(WARDS_SCHEMA, code)
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
})

export const getAllWardsInDistrictByCode = (code) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let result = realm.objects(WARDS_SCHEMA).filtered('parent_code == "' + code + '"')
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
})