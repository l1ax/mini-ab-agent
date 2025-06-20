import { StateGraph, END } from "@langchain/langgraph";
import { AgentState } from "./state.js";
import { agentNode, toolNode } from "../node/index.js";
import { shouldContinue } from "../edge/shouldContinue.js";

export function createAgentGraph() {
    const workflow = new StateGraph(AgentState)
        .addNode("agent", agentNode)
        .addNode("tools", toolNode)
        .addEdge("__start__", "agent")
        .addConditionalEdges("agent", shouldContinue, {
            "tools": "tools",
            "end": END,
            "agent": "agent"
        })
        .addEdge("tools", "agent")
        .compile();

    return workflow;
}