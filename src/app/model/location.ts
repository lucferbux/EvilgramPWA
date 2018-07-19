import * as firebase from 'firebase/app'

export interface Location {
    timestamp: Date,
    name: string,
    geoposition: firebase.firestore.GeoPoint
}