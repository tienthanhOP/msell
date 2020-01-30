import Realm from 'realm'
import { PROPERTIES_SCHEMA, databaseOptions } from './allSchemas'

export const insertProperties = (data) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                if (data && data.length != 0) {
                    data.forEach(element => {
                        realm.create(
                            PROPERTIES_SCHEMA,
                            {
                                key: element.key,
                                name: element.name,
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

export const getNamePropertyByKey = (key) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let name = realm.objectForPrimaryKey(PROPERTIES_SCHEMA, key)
            if (name) {
                resolve(name)
            } else {
                resolve(null)
            }
        }).catch(error => {
            reject(error)
        })
})

export const getAllProperties = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let result = realm.objects(PROPERTIES_SCHEMA)
            resolve(result)
        }).catch(error => {
            reject(error)
        })
})