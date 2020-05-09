import { writeToCache, readFromCache } from '../localCache/LocalCache';

export const findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const location = JSON.stringify(position);
            writeToCache("loc", location)
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
};

