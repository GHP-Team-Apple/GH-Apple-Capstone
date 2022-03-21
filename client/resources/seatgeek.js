const axios = require('axios');

const getEventsFromSeatGeek = async (zipcode, maxRadius, key) => {
    try {
        const { data } = await axios.get(`https://api.seatgeek.com/2/events?geoip=${zipcode}&range=${maxRadius}mi&per_page=10&client_id=${key}`);
        // console.log('EVENTS:', events);
        return data.events;
    } catch (err) {
        console.log('error: ', err);
    }
}

module.exports = getEventsFromSeatGeek;
