import { LightningElement, api, wire } from 'lwc';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';
import TRAINER_FIELD from '@salesforce/schema/Trainer__c.Name';

const pokemonFields = [TRAINER_FIELD];

export default class Trainerdetailform extends LightningElement {
    @api recordId;

    trainerName;

    @wire(getRecord, { recordId: '$recordId', fields: pokemonFields })
    getTrainer({ error, data }) {
        if (error) {
            console.error('error:' + JSON.stringify(error));
        } else if (data) {
            this.trainerName = getFieldValue(data, TRAINER_FIELD);
        }
    }
}