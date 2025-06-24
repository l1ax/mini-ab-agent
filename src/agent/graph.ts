import { StateGraph, END } from "@langchain/langgraph";
import { AgentState } from "./state.js";
import { agentNode, toolNode } from "../node/index.js";
import { shouldContinue } from "../edge/shouldContinue.js";
import actingNode from '../node/actingNode.js';
import reasoningNode from '../node/reasoningNode.js';
import {actingEdge} from '../edge/actingEdge.js';

export function createAgentGraph() {
    const workflow = new StateGraph(AgentState)
        .addNode("reasoning", reasoningNode)
        .addNode("acting", actingNode)
        .addEdge("__start__", "reasoning")
        .addEdge("reasoning", "acting")
        .addConditionalEdges("acting", actingEdge, {
            "reasoning": "reasoning",
            "end": END,
        })
        .compile();

    return workflow;
}