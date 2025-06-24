/**
 * @file 路由决策函数
 */

import {AgentState} from '../agent/state.js';

export function actingEdge(state: typeof AgentState.State) {
    const { finalAnswer, currentStep, maxSteps, toolCalls } = state;
    
    // 如果有最终答案或达到最大步数，结束执行
    if (finalAnswer || currentStep >= maxSteps) {
        return "end";
    }

    return "reasoning";
}