/**
 * @file 路由决策函数
 */

export function shouldContinue(state) {
    const { finalAnswer, currentStep, maxSteps, toolCalls } = state;
    
    // 如果有最终答案或达到最大步数，结束执行
    if (finalAnswer || currentStep >= maxSteps) {
        return "end";
    }
    
    // 如果有工具调用，执行工具
    if (toolCalls && toolCalls.length > 0) {
        return "tools";
    }
    
    // 否则继续让 agent 思考
    return "agent";
}