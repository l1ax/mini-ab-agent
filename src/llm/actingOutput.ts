import {z} from 'zod';

export const ActingAgentOutputFormatter = z.object({
    name: z.string().describe('工具名称'),
    arguments: z.record(z.string(), z.string()).describe('工具参数')
})