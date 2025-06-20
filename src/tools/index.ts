import {routePlannerTool} from './routePlanner.js';
import {Tool} from '@langchain/core/tools';

export const tools: Tool[] = [
    routePlannerTool
]

export const toolsMap: Record<string, Tool> = {
    route_planner: routePlannerTool
}