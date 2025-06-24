/**
 * @file 处理推理的节点
 */

import {AgentState} from '../agent/state.js';
import {llm} from '../llm/client.js';
import {AIMessage, AIMessageChunk, SystemMessage} from '@langchain/core/messages';
import {REASONING_PROMPT} from '../prompts/reasoning.js';

const reasoningNode = async (state: typeof AgentState.State) => {
    const {messages} = state;

    const systemMessage = new SystemMessage(REASONING_PROMPT);

    const allMessages = [systemMessage, ...messages];

    const response: AIMessageChunk = await llm.invoke(allMessages);

    // 得到的推理内容，加入到messages中
    const reasoningContent = response.content;

    const newMessages = [...messages, new AIMessage(reasoningContent as string)];

    return {
        ...state,
        messages: newMessages,
        currentStep: state.currentStep + 1
    }

}

export default reasoningNode;