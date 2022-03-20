const axios = require('axios');

const getEventsFromTicketmaster = async (zipcode, maxRadius, key) => {
    try {
        const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${zipcode}&radius=${maxRadius}&endDateTime=2022-03-27T12:00:00Z&apikey=${key}`);
        // console.log('EVENTS:', data['_embedded'].events.length);
        return data['_embedded'].events;
    } catch (err) {
        console.log('error: ', err);
    }
}

// getEventsFromTicketMaster('10002', 1);
module.exports = getEventsFromTicketmaster;
