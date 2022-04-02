import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import getEventsFromEventbrite from './resources/eventbrite';
import { db } from '../firebase';
import { collection, query, getDocs, addDoc, where } from 'firebase/firestore';

const SeedEventbrite = () => {
    const [eventbriteEvents, setEventbriteEvents] = useState([]);
    const [isSeeded, setIsSeeded] = useState(false);
    const eventIds = [];
    // componentDidMount
    useEffect(async () => {
        const eventIDArrs = [158952760987, 272127539797];
        saveNYCLocalEventsToDB(eventIDArrs);
    }, []);

    // useEffect(() => {
    //     console.log('EVENTBRITE IN SEED ----->', eventbriteEvents);
    // }, [eventbriteEvents]);
    
    const saveNYCLocalEventsToDB = async (eventIDArr) => {
        for (let i = 0; i < eventIDArr.length; i++) {
            let currentID = eventIDArr[i];
            let event = await getEventsFromEventbrite(currentID);
            let eventToBeSaved = {
                city: 'NYC',
                description: event.description.text,
                end: new Date(event.end.utc),
                hostId: `EB_HOST_${event.organization_id}`,
                id: `EB_${event.id}`,
                imageUrl: event.logo.original.url,
                isFree: event.is_free,
                location: {
                    lat: Number(event.venue.latitude),
                    lon: Number(event.venue.longitude),
                },
                name: event.name.text,
                startDate: new Date(event.start.utc),
                type: event.category.name.toLowerCase(),
                venueAddress: event.venue.address.localized_address_display,
                venueName: event.venue.name,
                visibleUntil: new Date(event.end.utc)
            }
            setEventbriteEvents([...eventbriteEvents, eventToBeSaved]);

            let q = query(collection(db, "LocalEvents"), where("id", "==", event.id));
            let qSnap = await getDocs(q);

            if (qSnap.docs.length !== 0) {
                return;
            } else {
                await addDoc(collection(db, "LocalEvents"), eventToBeSaved);
            }
        }
    }

    // if (true) {
        return (
            <View>
                <Text>Events Seeded</Text>
            </View>
        )
    // }


}


export default SeedEventbrite;
