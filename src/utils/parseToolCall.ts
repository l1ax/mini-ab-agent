/**
 * @file 解析工具调用
 */

export function parseToolCall(content: string) {
    try {
        const actionMatch = content.match(/Action:\s*(\w+)/);
        const inputMatch = content.match(/Action Input:\s*({.*?})/s);
        
        if (actionMatch && inputMatch) {
            return {
                id: `call_${Date.now()}`,
                name: actionMatch[1],
                input: inputMatch[1]
            };
        }
    } catch (error) {
        console.error("Parse tool call error:", error);
    }

    return null;
}