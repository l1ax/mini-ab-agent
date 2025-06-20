/**
 * @file 路径规划工具
 */

import { DynamicTool } from '@langchain/core/tools';

export const routePlannerTool = new DynamicTool({
    name: 'route_planner',
    description: `
        规划两地之间的路线。输入格式：{"from": "起点", "to": "终点", "mode": "交通方式"}
        交通方式可选：driving(驾车), walking(步行), transit(公交), cycling(骑行)
        返回路线信息包括距离、时间和路径描述。
    `,
    func: async (input) => {
        try {
            const params = JSON.parse(input);
            const {from, to, mode = 'driving'} = params;

            if (!from || !to) {
                return JSON.stringify({
                    error: '起点和终点不能为空'
                })
            }

            // Mock 路线规划结果
            const mockRoutes = {
                driving: {
                    distance: "15.2公里",
                    duration: "25分钟",
                    route: [
                        "从起点出发，沿主干道向东行驶",
                        "在第二个红绿灯处右转进入环城路",
                        "直行8公里后左转进入目标街道",
                        "继续直行500米到达终点"
                    ],
                    traffic: "当前路况良好",
                    estimatedCost: "约15元油费"
                },
                walking: {
                    distance: "12.8公里",
                    duration: "2小时30分钟",
                    route: [
                        "从起点步行至最近的人行道",
                        "沿人行道向东步行至公园路口",
                        "穿过公园，走绿道约6公里",
                        "出公园后沿街道步行至终点"
                    ],
                    calories: "约消耗600卡路里",
                    difficulty: "中等难度"
                },
                transit: {
                    distance: "16.5公里",
                    duration: "45分钟",
                    route: [
                        "步行5分钟至公交站A",
                        "乘坐123路公交车(15站)",
                        "在中转站换乘地铁2号线",
                        "乘坐地铁6站后出站",
                        "步行3分钟到达终点"
                    ],
                    cost: "公交2元 + 地铁4元 = 6元",
                    transfers: 1
                },
                cycling: {
                    distance: "13.5公里",
                    duration: "50分钟",
                    route: [
                        "从起点骑行至自行车道",
                        "沿自行车专用道向东骑行",
                        "经过两个主要路口",
                        "最后500米为普通道路到达终点"
                    ],
                    difficulty: "轻松",
                    bikeStations: "起点和终点附近都有共享单车"
                }
            }

            const result = mockRoutes[mode];

            return JSON.stringify({
                from,
                to,
                mode,
                ...result,
                timestamp: new Date().toISOString(),
                status: 'success'
            })

        } catch (error) {
            return JSON.stringify({
                error: `路线规划失败: ${error.message}`,
                status: "error"
            })
        }
    }
})