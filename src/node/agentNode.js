import {AIMessage} from '@langchain/core/messages';
import {llm} from '../llm/client.js';
import {parseToolCall} from '../utils/parseToolCall.js';
import {REACT_SYSTEM_PROMPT} from '../prompts/react.js';

export async function agentNode(state) {
    const {messages, currentStep, maxSteps} = state;

    if (currentStep >= maxSteps) {
        return {
            messages: [new AIMessage('达到最大步骤，无法继续推理')],
            finalAnswer: '达到最大步骤，无法继续推理'
        }
    }

    const systemMessage = {
        role: "system",
        content: REACT_SYSTEM_PROMPT
    }

    const allMessages = [systemMessage, ...messages];

    try {
        const response = await llm.invoke(allMessages);
        const content = response.content;

        const needTool = content.includes('Action:');
        if (needTool) {
            const toolCall = parseToolCall(content);
            if (toolCall) {
                return {
                    messages: [new AIMessage(content)],
                    currentStep: currentStep + 1,
                    toolCalls: [toolCall]
                }
            }
        }

         // 检查是否是最终答案
        if (content.includes("Final Answer:")) {
            const finalAnswer = content.split("Final Answer:")[1]?.trim();
            return {
                messages: [new AIMessage(content)],
                finalAnswer: finalAnswer || content,
                currentStep: currentStep + 1
            };
        }

        return {
            messages: [new AIMessage(content)],
            currentStep: currentStep + 1
        }
    }
    catch (error) {
        console.error("Agent node error:", error);
        return {
            messages: [new AIMessage("发生错误，无法继续推理")],
            finalAnswer: "发生错误，无法继续推理"
        }
    }
}