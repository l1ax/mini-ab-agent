# 需求
- 实现React Agent，提供mock route planning工具，在路线规划场景，agent能够进行思考、function call ✅ 
- 规范化输出，产出类似ab消息结构的输出 ✅
- 流式输出（目前langchain/chatDeepSeek在使用withStructuredOutputs时会报错实例化过深，暂时无法实现，理论上模型支持以JSON格式流式输出，如OPENAI系）
- 增加会话维度，增加memory