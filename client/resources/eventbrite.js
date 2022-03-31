const axios = require('axios');
import { EVENTBRITE_KEY } from '@env';

const getEventsFromEventbrite = async (eventId) => {
    try {
        const key = EVENTBRITE_KEY;
        const { data } = await axios.get(`https://www.eventbriteapi.com/v3/events/${eventId}/?expand=venue,category`, {
            headers: {
                Authorization: `Bearer ${key}`
            }
        });
        // console.log('EVENTBRITE ---->', data);
        return data;
    } catch (err) {
        console.log('error', err);
    }
}

module.exports = getEventsFromEventbrite;
