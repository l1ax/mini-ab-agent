/**
 * @file 定义graph中流转的state
 */

import {Annotation} from '@langchain/langgraph';

export const AgentState = Annotation.Root({
    /* 消息列表 */
    messages: Annotation({
        reducer: (x, y) => x.concat(y),
        default: () => []
    }),
    /* 工具调用列表 */
    toolCalls: Annotation({
        reducer: (x, y) => x.concat(y),
        default: () => []
    }),
    /* 最终答案 */
    finalAnswer: Annotation({
        reducer: (x, y) => y,
        default: () => null
    }),
    currentStep: Annotation({
        reducer: (x, y) => y,
        default: () => 0
    }),
    maxSteps: Annotation({
        reducer: (x, y) => y,
        default: () => 10
    })
})