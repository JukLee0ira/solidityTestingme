const axios = require('axios');
const fs = require('fs');
const path = require('path');

// ================= 配置区域 =================

// Geth 节点的 RPC 地址
const RPC_URL = 'https://earpc.xinfin.network/';

// 结果保存目录 (第一次跑改为 './results_pr', 第二次跑改为 './results_base')
const OUTPUT_DIR = './results_pr';

// 需要测试的区块号列表 (建议包含一些交易复杂的区块)
const BLOCK_NUMBERS = [
    5000000, 
    5000011,
    // 你可以添加更多，或者写个循环生成连续的块
];

// 测试的方法列表
const METHODS = [
    'debug_traceBlockByNumber',
    // 'debug_traceBlockByHash' // 如果需要可以解开
];

// Tracer 配置 (通常用 callTracer 测试调用栈，或者留空用默认的 struct logs)
const TRACER_CONFIG = { tracer: 'callTracer' }; 
// const TRACER_CONFIG = {}; // 使用默认 tracer (struct logs)

// ===========================================

// 确保目录存在
if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runTest() {
    console.log(`开始测试，结果将保存至: ${OUTPUT_DIR}`);
    console.log(`连接节点: ${RPC_URL}`);

    for (const blockNum of BLOCK_NUMBERS) {
        const hexBlockNum = '0x' + blockNum.toString(16);
        
        for (const method of METHODS) {
            console.log(`正在 Trace 区块 [${blockNum}] 使用方法 [${method}]...`);
            
            try {
                const payload = {
                    jsonrpc: '2.0',
                    method: method,
                    params: [hexBlockNum, TRACER_CONFIG],
                    id: 1
                };

                // 发送请求
                const response = await axios.post(RPC_URL, payload);

                if (response.data.error) {
                    console.error(`RPC 错误 (Block ${blockNum}):`, response.data.error);
                    continue;
                }

                const result = response.data.result;

                // 构造文件名: block_12345_debug_traceBlockByNumber.json
                const filename = path.join(
                    OUTPUT_DIR, 
                    `block_${blockNum}_${method}.json`
                );

                // 写入文件，使用 2 格缩进方便 diff
                fs.writeFileSync(filename, JSON.stringify(result, null, 2));
                
            } catch (error) {
                console.error(`请求失败 (Block ${blockNum}):`, error.message);
            }
        }
    }
    console.log('测试完成！');
}

runTest();