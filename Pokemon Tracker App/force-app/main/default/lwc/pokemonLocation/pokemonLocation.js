import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const NAME_FIELD = 'Pokemon__c.Name';
const LATITUDE_FIELD = 'Pokemon__c.Location__Latitude__s';
const LONGITUDE_FIELD = 'Pokemon__c.Location__Longitude__s';

const pokemonFields = [NAME_FIELD, LATITUDE_FIELD, LONGITUDE_FIELD];

export default class PokemonLocation extends LightningElement {

    @api recordId;

    mapMarkers = [];
    name;
    cardTitle;

    @wire(getRecord, { recordId: '$recordId', fields: pokemonFields })
    getPokemons({ error, data }) {
        if (error) {
            console.error('error:' + JSON.stringify(error));
        } else if (data) {
            this.name = getFieldValue(data, NAME_FIELD);
            this.cardTitle = this.name;

            const latitude = getFieldValue(data, LATITUDE_FIELD);
            const longitude = getFieldValue(data, LONGITUDE_FIELD);

            this.mapMarkers = [{
                location: {
                    Latitude: latitude,
                    Longitude: longitude
                },
                title: this.name,
                description: `Coords : ${latitude}, ${longitude}`
            }];

            console.log("this.mapMarkers:", JSON.stringify(this.mapMarkers));
        }
    }
}
