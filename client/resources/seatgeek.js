const axios = require('axios');

const getEventsFromSeatGeek = async (zipcode, maxRadius) => {
    const client_id = 'MjYxNDU5MDl8MTY0NzQ3OTE1NS4zNzEzMTE';
    try {
        const { data } = await axios.get(`https://api.seatgeek.com/2/events?geoip=${zipcode}&range=${maxRadius}mi&per_page=10&client_id=${client_id}`);
        // console.log('EVENTS:', events);
        return data.events;
    } catch (err) {
        console.log('error: ', err);
    }
}

module.exports = getEventsFromSeatGeek;
