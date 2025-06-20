import { HumanMessage } from "@langchain/core/messages";
import { createAgentGraph } from "./agent/graph.js";
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    const graph = createAgentGraph();
    
    console.log("🚗 路线规划助手已启动！");
    console.log("您可以询问如何从一个地点到另一个地点的路线规划。");
    console.log("例如：'我想从北京站到天安门，请帮我规划路线'\n");
    
    // 示例对话
    const examples = [
        "我想从北京站到天安门广场，请帮我规划一下路线，地铁出行"
    ];

    for (const query of examples) {
        console.log(`\n🔍 用户询问: ${query}`);
        console.log("=" .repeat(50));
        
        try {
            const result = await graph.invoke({
                messages: [new HumanMessage(query)],
                currentStep: 0,
                maxSteps: 10
            });
            
            console.log("\n📋 对话历史:");
            result.messages.forEach((msg, index) => {
                const role = msg.constructor.name;
                console.log(`${index + 1}. [${role}]: ${msg.content}`);
            });
        
        if (result.finalAnswer) {
            console.log(`\n✅ 最终答案: ${result.finalAnswer}`);
        }
        
        } catch (error) {
            console.error("❌ 执行错误:", error);
        }
        
        console.log("\n" + "=".repeat(80));
    }
}

// 运行示例
main().catch(console.error);