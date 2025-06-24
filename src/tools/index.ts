import {routePlannerTool} from './routePlanner.js';
import {Tool} from '@langchain/core/tools';
import {summarizer} from './summarize';

export const tools: Tool[] = [
    routePlannerTool,
    summarizer
]

export const toolsMap: Record<string, Tool> = {
    route_planner: routePlannerTool,
    summarizer: summarizer
}