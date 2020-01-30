import Realm from 'realm'

export const CITYS_SCHEMA = 'tblCitys'
export const DISTRICTS_SCHEMA = 'tblDistricts'
export const WARDS_SCHEMA = 'tblWards'
export const STREETS_SCHEMA = 'tblStreets'
export const CATEGORIES_SCHEMA = 'tblCategories'
export const PROPERTIES_SCHEMA = 'tblProperties'
export const PRODUCT_FAVOURITE_SCHEMA = 'tblProductFavourites'
export const PRODUCT_POSTED_SCHEMA = 'tblProductPosted'

const TBL_CITYS = {
    name: CITYS_SCHEMA,
    primaryKey: 'code',
    properties: {
        name: 'string',
        code: 'string',
        locations: 'string'
    }
}

const TBL_PRODUCT_FAVOURITES = {
    name: PRODUCT_FAVOURITE_SCHEMA,
    primaryKey: 'product_id',
    properties: {
        product_id: 'string',
        create_date: 'int',
        data: 'string',
    }
}

const TBL_DISTRICTS = {
    name: DISTRICTS_SCHEMA,
    primaryKey: 'code',
    properties: {
        code: 'string',
        name: 'string',
        parent_code: 'string',
        locations: 'string'
    }
}

const TBL_WARDS = {
    name: WARDS_SCHEMA,
    primaryKey: 'code',
    properties: {
        code: 'string',
        name: 'string',
        parent_code: 'string',
        locations: 'string'
    }
}

const TBL_STREETS = {
    name: STREETS_SCHEMA,
    primaryKey: 'code',
    properties: {
        code: 'string',
        streets: 'string'
    }
}

const TBL_CATEGORIES = {
    name: CATEGORIES_SCHEMA,
    primaryKey: 'category_id',
    properties: {
        category_id: 'string',
        category_name: 'string',
        level: 'int',
        parent_id: 'string',
        type_of_post: 'int?'
    }
}

const TBL_PROPERTIES = {
    name: PROPERTIES_SCHEMA,
    primaryKey: 'key',
    properties: {
        key: 'string',
        name: 'string'
    }
}

const TBL_PRODUCT_POSTED = {
    name: PRODUCT_POSTED_SCHEMA,
    primaryKey: 'post_code',
    properties: {
        post_code: 'string',
        create_date: 'int',
        data: 'string'
    }
}

export const databaseOptions = {
    path: 'msell.realm',
    schema: [
        TBL_CITYS,
        TBL_DISTRICTS,
        TBL_WARDS,
        TBL_STREETS,
        TBL_CATEGORIES,
        TBL_PROPERTIES,
        TBL_PRODUCT_FAVOURITES,
        TBL_PRODUCT_POSTED
    ],
    schemaVersion: 7
}

export default new Realm(databaseOptions)