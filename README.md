# API自动化测试框架示例

这是一个基于Mocha、Chai和SuperTest的API自动化测试框架示例项目。该框架提供了一个结构化的方式来编写和执行API测试，支持测试报告生成，并包含了常用的测试工具和实用函数。

## 技术栈

- Mocha: JavaScript测试框架
- Chai: 断言库
- SuperTest: HTTP测试库
- Mochawesome: 测试报告生成器

## 环境要求

- Node.js (建议 12.x 或更高版本)
- npm (Node.js包管理器)

## 安装

```bash
npm install
```

## 目录结构

```
├── config/                 # 配置文件目录
│   └── test.config.js      # 测试配置文件
├── test/                   # 测试文件目录
│   ├── api/               # API测试用例
│   │   └── posts.test.js  # Posts接口测试示例
│   └── utils/             # 测试工具类
│       └── testUtils.js   # 测试工具函数
├── mochawesome-report/    # 测试报告输出目录
├── package.json           # 项目依赖配置
└── README.md             # 项目说明文档
```

## 配置说明

### test.config.js

配置文件包含以下内容：

- baseUrl: API基础URL
- timeout: 请求超时时间
- endpoints: API端点配置

## 测试工具类 (testUtils.js)

测试工具类提供以下功能：

- HTTP请求方法 (GET, POST, PUT, DELETE)
- 响应验证
- 数据模式验证

### 主要方法

```javascript
// HTTP请求
get(endpoint, params)      // GET请求
post(endpoint, data)       // POST请求
put(endpoint, data)        // PUT请求
delete(endpoint)           // DELETE请求

// 验证方法
validateResponse(response, expectedStatus)  // 验证响应状态
validateSchema(data, schema)                // 验证数据结构
```

## 编写测试用例

测试用例使用Mocha的BDD风格语法编写。示例：

```javascript
describe('Posts API Tests', () => {
    it('should return all posts', async () => {
        const response = await testUtils.get(config.endpoints.posts);
        const posts = testUtils.validateResponse(response);
        expect(posts).to.be.an('array');
    });
});
```

## 运行测试

### 运行所有测试

```bash
npm test
```

### 生成测试报告

```bash
npm run test:report
```

运行后可在 `mochawesome-report` 目录下查看HTML格式的测试报告。

## 测试报告

测试报告包含以下信息：

- 测试用例执行结果
- 测试覆盖率
- 测试执行时间
- 错误和失败详情

## 最佳实践

1. 保持测试用例独立性
2. 使用合适的断言进行验证
3. 合理组织测试套件结构
4. 适当使用钩子函数（before, after等）
5. 保持测试代码的可维护性

## 注意事项

1. 确保测试环境的网络连接正常
2. 注意API的访问限制和频率限制
3. 定期更新依赖包版本
4. 妥善保管测试配置信息