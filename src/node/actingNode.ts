/**
 * @file 处理行动的节点, 此处主要是处理function call
 */

import {AgentState} from '../agent/state.js';
import {llm} from '../llm/client.js';
import {AIMessage, AIMessageChunk, SystemMessage} from '@langchain/core/messages';
import {ACTING_PROMPT} from '../prompts/acting';
import {toolsMap} from '../tools/index.js';
import {ToolCall} from '@langchain/core/dist/messages/tool.js';

const actingNode = async (state: typeof AgentState.State) => {
    const {messages} = state;

    const systemMessage = new SystemMessage(ACTING_PROMPT);

    const allMessages = [systemMessage, ...messages];

    const response: AIMessageChunk= await llm.invoke(allMessages);
    const toolCallList: ToolCall[] | undefined = response.tool_calls;
    // 不兜底，这个节点必须有工具调用，否则失败
    if (!toolCallList || toolCallList.length === 0) {
        throw new Error('没有工具调用');
    }

    const toolData: ToolCall = toolCallList[0];

    const tool = toolsMap[toolData.name];

    if (!tool) {
        throw new Error(`工具${toolData.name}不存在`);
    }

    const result = await tool.invoke(toolData.args);

    let finalAnswer: string = '';

    if (tool.name === 'summarizer') {
        finalAnswer = result;
    }

    return {
        ...state,
        messages: [...messages, new AIMessage(result)],
        currentStep: state.currentStep + 1,
        finalAnswer
    }
}

export default actingNode;