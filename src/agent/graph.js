import { StateGraph, END } from "@langchain/langgraph";
import { AgentState } from "./state.js";
import { agentNode, toolNode } from "../node/index.js";
import { shouldContinue } from "../edge/shouldContinue.js";

export function createAgentGraph() {
    const workflow = new StateGraph(AgentState);
    
    // 添加节点
    workflow.addNode("agent", agentNode);
    workflow.addNode("tools", toolNode);
    
    // 设置入口点
    workflow.addEdge("__start__", "agent");
    
    // 添加条件边
    workflow.addConditionalEdges(
        "agent",
        shouldContinue,
        {
            "tools": "tools",
            "end": END,
            "agent": "agent"
        }
    );

    // 工具执行后回到agent
    workflow.addEdge("tools", "agent");
    
    return workflow.compile();
}