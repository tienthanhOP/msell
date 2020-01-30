const linkApi = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const key = "AIzaSyASEmDYmweUJHJRtJC2aIpoZuCdBPhL6G0";

export default class GetApi {
    static async getLocation(latitude, longitude) {
        try {
            let response = await fetch(linkApi + latitude + "," + longitude + "&key=" + key);
            return await response.json();
        } catch (error) {
            
        }
    }
}