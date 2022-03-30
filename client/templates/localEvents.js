import { View, Text, Image, Pressable, StyleSheet, Dimensions, Linking } from 'react-native';

export const LocalEventObj = (event) => {
  const dateFormatterLocal = (timestamp) => {
    return `${new Date(timestamp * 1000)}`.slice(0, 21);
  };
  const date = dateFormatterLocal(event.startDate.seconds);
  return {
    id: event.id,
    name: event.name,
    date: date,
    visible: event.visibleUntil,
    venue: {
      name: event.venueName,
      address: event.venueAddress,
      extended_address: event.city || '',
      location: {
        lat: event.location.lat,
        lon: event.location.lon,
      },
    },
    imageUrl: event.imageUrl,
    type: event.type,
    eventUrl: event.url ? event.url : "none",
    hostId: event.hostId,
  };
};

export const LocalEventView = (event) => {
  return (
    <View style={styles.container}>

      <Pressable
        onPress={() => props.handlePress(null)}
        style={{ alignSelf: "flex-end", margin: 10 }}
      >
        <Text>{"[close x]"}</Text>
      </Pressable>

      <Text style={{ fontSize: 25, fontWeight: "bold" }}>{event.name}</Text>
      <Text style={{ fontSize: 20 }}>{dateFormatter(event.date)}</Text>
      <Text style={{ fontSize: 16 }}>({event.type})</Text>

      <Image source={{ uri: event.imageUrl }} style={styles.image} />

      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {event.venue.name}
      </Text>

      <Text
        style={{ marginBottom: 10 }}
      >{`${event.venue.address}, ${event.venue.extended_address}`}
      </Text>

      <Pressable
        style={{ ...styles.button, backgroundColor: "#FF6B6B" }}
        onPress={handleSaveEvent}
      >
        <Text>Save Event</Text>
      </Pressable>

      <Pressable style={{ ...styles.button, backgroundColor: "#4D96FF" }}>
        <Text>More Details</Text>
      </Pressable>

    </View>
  );
};

