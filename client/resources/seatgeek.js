const axios = require('axios');
import { SEAT_GEEK_KEY } from '@env';

const getEventsFromSeatGeek = async (eventTypes, lat, lon, maxRadius) => {
    try {
        const key = SEAT_GEEK_KEY;
        const typesArr = eventTypes.map(type => `taxonomies.name=${type}`);
        const types = typesArr.join('&');
        const { data } = await axios.get(`https://api.seatgeek.com/2/events?${types}&lat=${lat}&lon=${lon}&range=${maxRadius}mi&per_page=10&client_id=${key}`);
        // const { data } = await axios.get(`https://api.seatgeek.com/2/events?taxonomies.name=concert&lat=${lat}&lon=${lon}&range=${maxRadius}mi&per_page=10&client_id=${key}`);
        
        // set filter for events happening within the next 10 days
        const filteredEvents = data.events.filter(event => {
            const milliseconds = 864000000; // 10 days = 864000000 ms
            const currentDateValue = new Date().valueOf();
            const eventDateValue = new Date(event.datetime_utc).valueOf();
            if (eventDateValue - currentDateValue <= milliseconds) return event;
        });
        
        return filteredEvents;
    } catch (err) {
        console.log('error: ', err);
    }
}

module.exports = getEventsFromSeatGeek;
