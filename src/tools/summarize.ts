/**
 * @file 总结工具
 */

import {DynamicTool} from '@langchain/core/tools';

export const summarizer = new DynamicTool({
    name: 'summarizer',
    description: '当你认为当前的上下文已经足够给出最终答案时，请调用这个工具总结内容',
    func: async (context: string) => {
        return Promise.resolve(context);
    }
})