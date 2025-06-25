import {EventStatus} from './types';

export class BaseEvent<T> implements IBaseEvent<T> {
    /** 事件ID */
    event_id: string;

    /** 事件类型 */
    event_type: string;

    /** 事件状态 */
    event_status: EventStatus = EventStatus.RUNNING;

    /** 事件内容类型 */
    content_type: string = 'text';

    outputs: T;

    constructor(event_id: string, event_type: string, outputs: T) {
        this.event_id = event_id;
        this.event_type = event_type;
        this.outputs = outputs;
    }
}

export interface IBaseEvent<T> {
    event_id: string;
    event_type: string;
    event_status: EventStatus;
    content_type: string;
    outputs: T;
}