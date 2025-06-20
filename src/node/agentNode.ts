import {AIMessage, BaseMessage, SystemMessage} from '@langchain/core/messages';
import {llm} from '../llm/client.js';
import {parseToolCall} from '../utils/parseToolCall.js';
import {REACT_SYSTEM_PROMPT} from '../prompts/react.js';
import {AgentState} from '../agent/state.js';

export async function agentNode(state: typeof AgentState.State) {
    const {messages, currentStep, maxSteps} = state;

    if (currentStep >= maxSteps) {
        return {
            messages: [new AIMessage('达到最大步骤，无法继续推理')],
            finalAnswer: '达到最大步骤，无法继续推理'
        }
    }

    const systemMessage: SystemMessage = new SystemMessage(REACT_SYSTEM_PROMPT);

    const allMessages: BaseMessage[] = [systemMessage, ...messages];

    try {
        const response = await llm.stream(allMessages);
        let fullContent: string = "";

        for await (const chunk of response) {
            const content = chunk.content as string || "";
            if (content) {
                fullContent += content;
                process.stdout.write(content);
            }

        }

        console.log()

        const needTool = fullContent.includes('Action:');
        if (needTool) {
            const toolCall = parseToolCall(fullContent);
            if (toolCall) {
                return {
                    messages: [new AIMessage(fullContent)],
                    currentStep: currentStep + 1,
                    toolCalls: [toolCall]
                }
            }
        }

         // 检查是否是最终答案
        if (fullContent.includes("Final Answer:")) {
            const finalAnswer = fullContent.split("Final Answer:")[1]?.trim();
            return {
                messages: [new AIMessage(fullContent)],
                finalAnswer: finalAnswer || fullContent,
                currentStep: currentStep + 1
            };
        }

        return {
            messages: [new AIMessage(fullContent)],
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