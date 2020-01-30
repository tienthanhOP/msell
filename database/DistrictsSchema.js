import Realm from 'realm'
import { DISTRICTS_SCHEMA, databaseOptions } from './allSchemas'

export const insertDistricts = (data) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                if (data && data.length != 0) {
                    data.forEach(element => {
                        realm.create(
                            DISTRICTS_SCHEMA,
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

export const getLocationDistrictsByCode = (code) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let result = realm.objectForPrimaryKey(DISTRICTS_SCHEMA, code)
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
})

export const getAllDistrictsInCityByCode = (code) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let result = realm.objects(DISTRICTS_SCHEMA).filtered('parent_code == "' + code + '"')
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
})