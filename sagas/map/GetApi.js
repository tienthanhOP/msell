import * as CONSTANTS from '../../constants/Constants'
import Utilities from '../../utils/Utilities';

function* getProducts(
    zoomlevel,
    viewport,
    category,
    citys_id,
    districts_id,
    wards_id,
    streets_id,
    project_id,
    type_of_post,
    min_price,
    max_price,
    min_beds,
    max_beds,
    min_floors,
    max_floors,
    min_acreage,
    max_acreage,
    min_toilets,
    max_toilets,
    group,
    is_draw,
    poly_draw,
    limit,
    skip) {

    try {
        const response = yield fetch(CONSTANTS.BASE_URL
            + "viewmap?zoomlevel=" + zoomlevel
            + "&viewport=" + viewport
            + "&category=" + category
            + "&citys_id=" + citys_id
            + "&districts_id=" + districts_id
            + "&wards_id=" + wards_id
            + "&streets_id=" + streets_id
            + "&project_id=" + project_id
            + "&type_of_post=" + type_of_post
            + "&min_price=" + min_price
            + "&max_price=" + max_price
            + "&min_beds=" + min_beds
            + "&max_beds=" + max_beds
            + "&min_floors=" + min_floors
            + "&max_floors=" + max_floors
            + "&min_acreage=" + min_acreage
            + "&max_acreage=" + max_acreage
            + "&min_toilets=" + min_toilets
            + "&max_toilets=" + max_toilets
            + "&group=" + group
            + "&is_draw=" + is_draw
            + "&poly_draw=" + poly_draw
            + "&limit=" + limit
            + "&skip=" + skip
        )

        const result = yield response.status === 200 ? yield response.json() : null
        return result
    } catch (error) {
        return null
    }
}

export const GetApi = {
    getProducts
}