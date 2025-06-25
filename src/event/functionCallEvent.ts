import {IBaseEvent} from './baseEvent.js';
import {EventStatus} from './types.js';

export class FunctionCallEvent implements IBaseEvent<{tool_name: string, tool_args: Record<string, any>}> {
    event_id: string;
    event_type: string;
    event_status: EventStatus;
    content_type: string;
    outputs: {tool_name: string, tool_args: Record<string, any>};

    constructor(event_id: string) {
        this.event_id = event_id;
        this.event_type = 'function_call';
        this.event_status = EventStatus.RUNNING;
        this.content_type = 'text';
        this.outputs = {tool_name: '', tool_args: {}};
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