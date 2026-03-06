const benchmarks = [
  {
    name: 'Toolathlon',
    summary:
      '关注“工具调用能力”的综合评测，评估 agent 在多工具选择、参数规划、失败恢复与跨工具协作上的表现。支持一键配置自定义大模型 API，执行 5 道题并自动展示模型轨迹与验证器判断过程。',
    datasetLink: 'https://huggingface.co/datasets/AgentEval/ToolAthlon',
    tutorialLink: 'https://huggingface.co/datasets/AgentEval/ToolAthlon',
    supportsRunner: true,
    examples: [
      {
        question: '从网页抓取产品价格后在表格中计算同比变化并生成摘要。',
        tools: 'browser tool、HTTP API、Python pandas、计算器工具。',
        validator: '答案字段与标准 JSON 对齐；数值误差在容忍范围内。'
      },
      {
        question: '调用地图与天气 API 规划最优出行窗口。',
        tools: '地理编码 API、天气 API、时间转换工具。',
        validator: '对比 reference route 与时间窗口规则，检查约束满足度。'
      },
      {
        question: '跨文档检索后生成带引用的结论。',
        tools: '向量检索、浏览器、文档解析器。',
        validator: '引用可追溯性校验 + 事实一致性打分。'
      }
    ]
  },
  {
    name: 'SWE Bench Pro',
    summary:
      '面向真实 GitHub Issue 修复的代码代理评测；任务通常要求在大型仓库内定位缺陷并提交补丁。SWE Bench Pro 是在 SWE-bench 基础上更高质量、去噪和更接近生产使用的子集。',
    datasetLink: 'https://www.swebench.com/',
    tutorialLink: 'https://github.com/SWE-bench/SWE-bench',
    examples: [
      {
        question: 'django__django-11099：修复 QuerySet 在特定聚合场景中的回归行为。',
        tools: 'Python 3.x、pytest、git、Linux shell、仓库级静态搜索工具（ripgrep）。',
        validator: '通过官方 harness 在隔离容器中运行目标测试集合；以 test pass/fail 判定。'
      },
      {
        question: 'sympy__sympy-20590：处理符号化简后输出不一致的问题。',
        tools: 'Python、SymPy 测试套件、patch 应用工具、日志分析。',
        validator: '比较补丁前后回归测试结果并执行 issue 相关测试。'
      },
      {
        question: 'matplotlib__matplotlib-23476：修复特定绘图参数下的渲染异常。',
        tools: 'Python、matplotlib 测试框架、headless 渲染环境。',
        validator: '目标测试 + 全量关键模块测试，确保无新回归。'
      }
    ]
  },
  {
    name: 'Terminal Bench 2.0',
    summary:
      '以终端原生任务为核心的 agent 评测，强调命令行工具链编排、脚本编写、文件系统操作与复现能力。',
    datasetLink: 'https://github.com/laude-institute/terminal-bench',
    tutorialLink: 'https://github.com/laude-institute/terminal-bench#readme',
    examples: [
      {
        question: '在大型日志目录中定位异常请求并生成按服务聚合的统计报表。',
        tools: 'bash、awk/sed、jq、coreutils、GNU parallel。',
        validator: '对输出文件做哈希/结构比对，并检查关键字段精确匹配。'
      },
      {
        question: '修复 shell 脚本中的竞态条件，确保并发执行结果稳定。',
        tools: 'bash、Makefile、shellcheck、timeout、diff。',
        validator: '多轮重复执行 + golden output 对比，验证幂等性。'
      },
      {
        question: '完成多步 CLI 数据清洗并导出满足 schema 的 CSV。',
        tools: 'python/csvkit、grep、sort、uniq、临时文件管理。',
        validator: 'schema 校验脚本 + 行数/聚合值断言。'
      }
    ]
  },
  {
    name: 'BrowseComp',
    summary:
      '面向复杂网页浏览与信息整合任务的 benchmark，强调多跳检索、证据引用、网页交互和事实核验。',
    datasetLink: 'https://openai.com/index/browsecomp/',
    tutorialLink: 'https://github.com/openai/simple-evals',
    examples: [
      {
        question: '在多个官网与文档站中定位某项政策的最新生效日期。',
        tools: '浏览器自动化、页面内搜索、链接跟踪。',
        validator: '要求提交最终答案 + 可点击证据链接。'
      },
      {
        question: '比较三家服务商的定价条款并输出结构化对照。',
        tools: '网页抓取、表格整理、文本对齐工具。',
        validator: '关键字段完整率与引用正确率联合评分。'
      },
      {
        question: '多轮网页跳转后识别论文发布版本与勘误说明。',
        tools: '浏览器、PDF 阅读器、引用抽取器。',
        validator: '人工/程序联合核验：版本号、日期、来源一致。'
      }
    ]
  },
  {
    name: 'Remote Labor Index',
    summary:
      '通过可远程完成的知识工作任务衡量模型/Agent 的经济替代能力，覆盖数据处理、文档生产、沟通与运营类工作流。',
    datasetLink: 'https://www.remotelaborindex.com/',
    tutorialLink: 'https://www.remotelaborindex.com/methodology',
    examples: [
      {
        question: '整理客户访谈纪要并输出可执行行动项列表。',
        tools: '文档编辑器、总结工具、任务跟踪模板。',
        validator: '依据 rubric 评估完整性、可执行性与优先级合理性。'
      },
      {
        question: '根据销售流水构建周报并生成异常解释。',
        tools: 'Spreadsheet、SQL/BI 查询、图表工具。',
        validator: '数字准确性 + 文本解释与数据一致性审查。'
      },
      {
        question: '编写多轮客户邮件草案并保持上下文一致。',
        tools: '邮件客户端、CRM 摘要、模板库。',
        validator: '人工偏好评估 + 规则校验（语气、事实、承诺）。'
      }
    ]
  },
  {
    name: 'OSWorld-Verified',
    summary:
      '桌面操作智能体评测集，覆盖真实 OS GUI 操作（文件管理、办公软件、系统设置、开发工具使用）；Verified 版本提供更稳定、可复验任务。',
    datasetLink: 'https://github.com/xlang-ai/OSWorld',
    tutorialLink: 'https://github.com/xlang-ai/OSWorld#quick-start',
    examples: [
      {
        question: '在 Ubuntu 桌面中完成文件重命名、压缩并上传到指定目录。',
        tools: '虚拟机桌面、鼠标键盘控制器、文件管理器。',
        validator: '检查目标路径文件状态、命名规则与哈希值。'
      },
      {
        question: '在电子表格中完成公式填充并导出指定格式报告。',
        tools: 'Office 套件（Calc/Excel 类）、GUI 自动化代理。',
        validator: '读取导出文件并运行单元格断言。'
      },
      {
        question: '配置系统网络选项并验证命令行连通性。',
        tools: '系统设置面板、终端、网络诊断命令。',
        validator: '脚本检测配置项 + 连通性测试结果。'
      }
    ]
  }
];

const toolathlonEvalSet = [
  {
    id: 'TA-01',
    prompt: '请输出一个 JSON，包含 fields: product, yoy_change。product=CameraX，yoy_change=12.5%。',
    expectedKeywords: ['json', 'product', 'camerax', 'yoy_change', '12.5']
  },
  {
    id: 'TA-02',
    prompt: '根据 weather=rain, traffic=heavy, 输出最佳出行时间段并说明原因。',
    expectedKeywords: ['rain', 'traffic', '时间', '原因']
  },
  {
    id: 'TA-03',
    prompt: '给出结论并至少包含2个可追溯引用（格式如 [1] [2]）。',
    expectedKeywords: ['结论', '[1]', '[2]']
  },
  {
    id: 'TA-04',
    prompt: '将三条搜索结果归纳成两点建议，每点不超过20字。',
    expectedKeywords: ['建议', '1', '2']
  },
  {
    id: 'TA-05',
    prompt: '返回一个含 action 与 args 的工具调用计划 JSON，至少两个步骤。',
    expectedKeywords: ['json', 'action', 'args', '步骤']
  }
];

const root = document.getElementById('benchmarks');
const template = document.getElementById('benchmarkTemplate');
const searchInput = document.getElementById('searchInput');
const resultCount = document.getElementById('resultCount');

function scoreAnswer(answer, expectedKeywords) {
  const content = answer.toLowerCase();
  const hits = expectedKeywords.map((keyword) => ({ keyword, hit: content.includes(keyword.toLowerCase()) }));
  const hitCount = hits.filter((item) => item.hit).length;
  const score = Math.round((hitCount / expectedKeywords.length) * 100);
  return {
    score,
    pass: score >= 60,
    trace: `命中关键词 ${hitCount}/${expectedKeywords.length}：${hits
      .map((item) => `${item.keyword}=${item.hit ? '✔' : '✘'}`)
      .join('，')}`
  };
}

async function callCustomModel(config, prompt) {
  const endpoint = `${config.baseUrl.replace(/\/$/, '')}/chat/completions`;
  const payload = {
    model: config.model,
    messages: [
      { role: 'system', content: '你是一个 Toolathlon 解题 agent，请直接给出任务答案。' },
      { role: 'user', content: prompt }
    ]
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`API 调用失败: HTTP ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  return {
    content,
    trace: [`请求端点: ${endpoint}`, `模型: ${config.model}`, `Prompt: ${prompt}`, `响应片段: ${(content || '').slice(0, 180)}`].join('\n')
  };
}

function createToolathlonRunner(container) {
  container.innerHTML = `
    <div class="runner-panel">
      <h3 class="runner-title">Toolathlon 一键运行与自动评测（5题）</h3>
      <p class="runner-note">配置自定义大模型 API（OpenAI 兼容接口），点击“运行并评分”后将执行 5 道题，并展示模型轨迹与验证器判断过程。</p>
      <div class="runner-grid runner-grid-3">
        <input id="apiBaseUrl" placeholder="Base URL (如 https://api.openai.com/v1)" value="https://api.openai.com/v1" />
        <input id="apiModel" placeholder="Model (如 gpt-4o-mini)" value="gpt-4o-mini" />
        <input id="apiKey" placeholder="API Key" type="password" />
      </div>
      <div class="runner-actions">
        <button id="runEvalBtn">运行并评分</button>
        <button id="resetEvalBtn">清空结果</button>
      </div>
      <div id="runnerStatus" class="runner-status">状态：待运行</div>
      <div id="runnerScoreboard"></div>
      <div id="runnerTrace"></div>
    </div>
  `;

  const runBtn = container.querySelector('#runEvalBtn');
  const resetBtn = container.querySelector('#resetEvalBtn');
  const status = container.querySelector('#runnerStatus');
  const scoreboard = container.querySelector('#runnerScoreboard');
  const traceEl = container.querySelector('#runnerTrace');

  runBtn.addEventListener('click', async () => {
    const config = {
      baseUrl: container.querySelector('#apiBaseUrl').value.trim(),
      model: container.querySelector('#apiModel').value.trim(),
      apiKey: container.querySelector('#apiKey').value.trim()
    };

    if (!config.baseUrl || !config.model || !config.apiKey) {
      status.textContent = '状态：请完整填写 Base URL、Model、API Key。';
      return;
    }

    runBtn.disabled = true;
    status.textContent = '状态：运行中（依次请求模型并自动评分）...';

    const rows = [];
    const traces = [];

    for (const task of toolathlonEvalSet) {
      const stepTitle = `${task.id} | ${task.prompt}`;
      try {
        const modelResult = await callCustomModel(config, task.prompt);
        const evalResult = scoreAnswer(modelResult.content, task.expectedKeywords);

        rows.push({ id: task.id, score: evalResult.score, pass: evalResult.pass });
        traces.push({
          id: task.id,
          modelTrace: modelResult.trace,
          validatorTrace: evalResult.trace,
          answer: modelResult.content
        });
      } catch (error) {
        rows.push({ id: task.id, score: 0, pass: false });
        traces.push({
          id: task.id,
          modelTrace: `${stepTitle}\n调用失败：${error.message}`,
          validatorTrace: '验证器判定：请求失败，计 0 分。',
          answer: ''
        });
      }
      status.textContent = `状态：已完成 ${rows.length}/${toolathlonEvalSet.length}`;
    }

    const total = Math.round(rows.reduce((acc, row) => acc + row.score, 0) / rows.length);
    scoreboard.innerHTML = `
      <div class="scoreboard">
        <strong>总分：${total} / 100</strong>
        <ol class="score-list">
          ${rows
            .map((row) => `<li>${row.id}: ${row.score} 分 <span class="${row.pass ? 'tag-pass' : 'tag-fail'}">${row.pass ? '通过' : '未通过'}</span></li>`)
            .join('')}
        </ol>
      </div>
    `;

    traceEl.innerHTML = `
      <div class="trace-wrap">
        <h4>模型工作轨迹 & 验证器判断过程</h4>
        ${traces
          .map(
            (trace) => `
              <details class="trace-item">
                <summary>${trace.id}</summary>
                <pre class="trace-block"><strong>模型轨迹</strong>\n${trace.modelTrace.replace(/</g, '&lt;')}</pre>
                <pre class="trace-block"><strong>模型答案</strong>\n${(trace.answer || '(空)').replace(/</g, '&lt;')}</pre>
                <pre class="trace-block"><strong>验证器过程</strong>\n${trace.validatorTrace.replace(/</g, '&lt;')}</pre>
              </details>
            `
          )
          .join('')}
      </div>
    `;

    status.textContent = '状态：评测完成。';
    runBtn.disabled = false;
  });

  resetBtn.addEventListener('click', () => {
    scoreboard.innerHTML = '';
    traceEl.innerHTML = '';
    status.textContent = '状态：待运行';
  });
}

function render(items) {
  root.innerHTML = '';

  items.forEach((bench) => {
    const node = template.content.cloneNode(true);
    node.querySelector('h2').textContent = bench.name;
    node.querySelector('.summary').textContent = bench.summary;

    const datasetLink = node.querySelector('.dataset-link');
    datasetLink.href = bench.datasetLink;

    const tutorialLink = node.querySelector('.tutorial-link');
    tutorialLink.href = bench.tutorialLink;

    const runnerContainer = node.querySelector('.runner-container');
    if (bench.supportsRunner) {
      createToolathlonRunner(runnerContainer);
    }

    const tbody = node.querySelector('tbody');
    bench.examples.forEach((example) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${example.question}</td>
        <td>${example.tools}</td>
        <td>${example.validator}</td>
      `;
      tbody.appendChild(tr);
    });

    root.appendChild(node);
  });

  resultCount.textContent = `共 ${items.length} 个 benchmark`;
}

function filterBenchmarks(keyword) {
  const q = keyword.trim().toLowerCase();
  if (!q) {
    render(benchmarks);
    return;
  }

  const filtered = benchmarks.filter((bench) => {
    const blob = [
      bench.name,
      bench.summary,
      bench.examples.map((e) => `${e.question} ${e.tools} ${e.validator}`).join(' ')
    ]
      .join(' ')
      .toLowerCase();

    return blob.includes(q);
  });

  render(filtered);
}

searchInput.addEventListener('input', (event) => filterBenchmarks(event.target.value));
render(benchmarks);
