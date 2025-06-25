/**
 * @file 处理推理的节点
 */

import {AgentState} from '../agent/state.js';
import {llm} from '../llm/client.js';
import {AIMessage, AIMessageChunk, SystemMessage} from '@langchain/core/messages';
import {REASONING_PROMPT} from '../prompts/reasoning.js';
import {ThoughtEvent} from '../event/thoughtEvent.js';
import {EventStatus} from '../event/types.js';

const reasoningNode = async (state: typeof AgentState.State) => {
    const {messages} = state;

    const thoughtEvent = new ThoughtEvent(state.eventId.toString());

    const systemMessage = new SystemMessage(REASONING_PROMPT);

    const allMessages = [systemMessage, ...messages];

    const response: AIMessageChunk = await llm.invoke(allMessages);

    // 得到的推理内容，加入到messages中
    const reasoningContent = response.content;
    thoughtEvent.outputs.text = reasoningContent as string;
    thoughtEvent.event_status = EventStatus.COMPLETED;

    const newMessages = [...messages, new AIMessage(reasoningContent as string)];

    return {
        ...state,
        messages: newMessages,
        events: [thoughtEvent],
        eventId: state.eventId + 1
    }

}

export default reasoningNode;