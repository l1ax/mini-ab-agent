/**
 * @file 定义graph中流转的state
 */

import {BaseMessage} from '@langchain/core/messages';
import {Annotation, messagesStateReducer} from '@langchain/langgraph';
import {IBaseEvent} from '../event/baseEvent';

export const AgentState = Annotation.Root({
    /* 消息列表 */
    messages: Annotation<BaseMessage[]>({
        reducer: messagesStateReducer,
        default: () => []
    }),
    /* 工具调用列表 */
    toolCalls: Annotation({
        reducer: (x: any[], y: any[]) => x.concat(y),
        default: () => []
    }),
    /* 最终答案 */
    finalAnswer: Annotation({
        reducer: (x: any, y: any) => y,
        default: () => null
    }),
    currentStep: Annotation({
        reducer: (x: number, y: number) => y,
        default: () => 0
    }),
    maxSteps: Annotation({
        reducer: (x: number, y: number) => y,
        default: () => 10
    }),
    events: Annotation({
        reducer: (x: IBaseEvent<any>[], y: IBaseEvent<any>[]) => x.concat(y),
        default: () => []
    }),
    eventId: Annotation({
        reducer: (x: number, y: number) => y,
        default: () => 0
    })
})