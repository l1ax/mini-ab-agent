import {IBaseEvent} from './baseEvent.js';
import {EventStatus} from './types.js';

export class ThoughtEvent implements IBaseEvent<{text: string}> {

    event_id: string;
    event_type: string;
    event_status: EventStatus;
    content_type: string;
    outputs: {text: string};

    constructor(event_id: string) {
        this.event_id = event_id;
        this.event_type = 'thought';
        this.event_status = EventStatus.RUNNING;
        this.content_type = 'text';
        this.outputs = {text: ''};
    }

    toJSON() {
        return {
            event_id: this.event_id,
            event_type: this.event_type,
            event_status: this.event_status,
            content_type: this.content_type,
            outputs: this.outputs
        }
    }
}