import Realm from 'realm'
import { CATEGORIES_SCHEMA, databaseOptions } from './allSchemas'
import Utilities from '../utils/Utilities';

export const insertCategories = (data) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                if (data && data.length != 0) {
                    data.forEach(element => {
                        realm.create(
                            CATEGORIES_SCHEMA,
                            {
                                category_id: element.category,
                                category_name: element.category_name,
                                level: element.level,
                                parent_id: element.parent_id,
                                type_of_post: element.type_of_post
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

export const getCategoriesByPostType = (postType) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            let result = realm.objects(CATEGORIES_SCHEMA).filtered('type_of_post == 0 OR type_of_post == ' + postType)
            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
})