/**
 * @file 工具节点
 */

import { toolsMap } from '../tools/index.js';
import { ToolMessage } from '@langchain/core/messages';
import {AgentState} from '../agent/state.js';

export async function toolNode(state: typeof AgentState.State) {
    const { toolCalls, messages } = state;
    
    if (!toolCalls || toolCalls.length === 0) {
        return { 
            messages: [],
            toolCalls: [] // 清空工具调用
        };
    }
    
    const lastToolCall = toolCalls[toolCalls.length - 1];
    const tool = toolsMap[lastToolCall.name];
    
    if (!tool) {
        return {
            messages: [new ToolMessage({
                content: `错误：未找到工具 ${lastToolCall.name}`,
                tool_call_id: lastToolCall.id || "unknown"
            })],
            toolCalls: [] // 清空工具调用
        };
    }
    
    try {
        const result = await tool.func(lastToolCall.input);
        return {
            messages: [new ToolMessage({
                content: `Observation: ${result}`,
                tool_call_id: lastToolCall.id || "tool_result"
            })],
            toolCalls: [] // 清空工具调用
        };
    } catch (error) {
        return {
            messages: [new ToolMessage({
                content: `工具执行错误: ${error.message}`,
                tool_call_id: lastToolCall.id || "error"
            })],
            toolCalls: [] // 清空工具调用
        };
    }
}
