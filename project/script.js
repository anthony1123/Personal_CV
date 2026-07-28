const tickets = [
  {
    id: "MBC-QM-1842",
    title: "车辆状态页充电功率显示与需求定义不一致",
    severity: "Major",
    priority: "P1",
    owner: "PO Review",
    module: "Charging Status",
    epic: "EPIC-231",
    confidence: 82,
    summary:
      "QM 在回归测试中发现，插枪后车辆状态页展示的实时充电功率与后端返回值存在单位换算差异，疑似前端展示逻辑未按 REQ 验收标准处理。",
    meta: {
      stage: "QM Testing",
      source: "Jira Bug",
      assignee: "Unassigned",
      effort: "1-2 天",
    },
    contexts: {
      req: [
        {
          title: "REQ-774 充电状态展示规则",
          desc: "定义功率展示单位、刷新频率和异常值兜底规则。",
          match: "Epic link + keyword: charging power",
          score: "91%",
        },
        {
          title: "EPIC-231 车辆状态页改版",
          desc: "覆盖状态卡片、充电信息和远控入口的信息架构。",
          match: "Direct parent epic",
          score: "86%",
        },
      ],
      docs: [
        {
          title: "Confluence: Charging Display Spec",
          desc: "说明 kW/W 单位转换、保留位数和无效值展示策略。",
          match: "REQ reference + module name",
          score: "78%",
        },
        {
          title: "Confluence: Vehicle Status UX Rules",
          desc: "定义车辆状态页通用展示规范和边界状态。",
          match: "Page title similarity",
          score: "69%",
        },
      ],
      code: [
        {
          title: "vehicle-status/charging-card.tsx",
          desc: "渲染充电功率、剩余时间和充电状态标签。",
          match: "Component name + field mapping",
          score: "84%",
        },
        {
          title: "services/vehicle-status.mapper.ts",
          desc: "将接口字段映射为前端状态模型，包含 powerValue 字段。",
          match: "Field name hit",
          score: "81%",
        },
      ],
    },
    report: {
      relevance: "相关，本组负责车辆状态页展示逻辑。",
      analysis: "接口返回功率值与页面展示单位存在转换差异，优先检查 mapper 与组件格式化逻辑。",
      requirement: "REQ-774 要求充电功率以 kW 展示，并保留 1 位小数。",
      code: "候选模块为 charging-card.tsx 与 vehicle-status.mapper.ts，需 RD 确认最终改动点。",
      impact: "影响车辆状态页充电卡片；回归范围包含充电中、充电完成、异常断连。",
      effort: "1-2 天，主要包含字段转换修复、边界值处理和回归验证。",
    },
  },
  {
    id: "MBC-QM-1860",
    title: "远程空调开关状态同步延迟导致 UI 误判",
    severity: "Critical",
    priority: "P0",
    owner: "RD Confirm",
    module: "Remote Climate",
    epic: "EPIC-198",
    confidence: 76,
    summary:
      "QM 在弱网环境下复现远程空调开关后 UI 状态短时间回滚的问题，可能涉及状态轮询、命令回执和异常态展示策略。",
    meta: {
      stage: "QM Testing",
      source: "Jira Bug",
      assignee: "Frontend RD",
      effort: "2-3 天",
    },
    contexts: {
      req: [
        {
          title: "REQ-642 远程空调控制",
          desc: "定义远控命令发送、状态刷新和失败提示策略。",
          match: "Epic link + command status",
          score: "88%",
        },
        {
          title: "BUG-1732 远控状态回滚历史问题",
          desc: "历史问题中曾出现命令回执晚于 UI optimistic update。",
          match: "Similar symptom",
          score: "73%",
        },
      ],
      docs: [
        {
          title: "Confluence: Remote Command Lifecycle",
          desc: "说明命令 pending、success、failed、timeout 的状态机。",
          match: "Lifecycle terms",
          score: "82%",
        },
      ],
      code: [
        {
          title: "remote-control/climate-command.store.ts",
          desc: "维护空调远控命令状态和 UI 展示状态。",
          match: "Command store",
          score: "79%",
        },
        {
          title: "hooks/useRemoteCommandPolling.ts",
          desc: "处理命令发送后的状态轮询和超时逻辑。",
          match: "Polling hook",
          score: "74%",
        },
      ],
    },
    report: {
      relevance: "相关，本组负责远程空调控制链路的前端状态展示。",
      analysis: "弱网下命令回执与状态轮询存在竞态，UI 可能在 pending 阶段读取旧状态并回滚。",
      requirement: "REQ-642 要求 pending 期间保持操作态，超时后展示明确失败提示。",
      code: "候选模块为 climate-command.store.ts 与 useRemoteCommandPolling.ts。",
      impact: "影响远控空调开关、温度调整和弱网超时提示。",
      effort: "2-3 天，涉及状态机梳理、弱网测试和回归。",
    },
  },
  {
    id: "MBC-QM-1874",
    title: "车窗控制权限校验失败时缺少业务提示",
    severity: "Minor",
    priority: "P2",
    owner: "QA Verify",
    module: "Window Control",
    epic: "EPIC-205",
    confidence: 88,
    summary:
      "QM 提交车窗远控权限不足时仅展示通用错误码，未按需求展示可理解的业务提示，疑似错误码映射缺失。",
    meta: {
      stage: "QM Testing",
      source: "Jira Bug",
      assignee: "Mobile RD",
      effort: "0.5-1 天",
    },
    contexts: {
      req: [
        {
          title: "REQ-681 远控权限与错误提示",
          desc: "定义不同权限失败场景下的提示文案。",
          match: "Error code + permission",
          score: "94%",
        },
      ],
      docs: [
        {
          title: "Confluence: Remote Control Error Map",
          desc: "维护远控业务错误码到用户提示的映射。",
          match: "Error code table",
          score: "89%",
        },
      ],
      code: [
        {
          title: "remote-control/error-message.map.ts",
          desc: "错误码与提示文案映射表。",
          match: "Exact error code hit",
          score: "92%",
        },
      ],
    },
    report: {
      relevance: "相关，本组负责远控错误提示和权限失败展示。",
      analysis: "权限失败错误码命中通用兜底文案，缺少业务错误码映射。",
      requirement: "REQ-681 要求权限不足时展示具体原因和处理建议。",
      code: "明确命中 error-message.map.ts，需补充对应错误码映射。",
      impact: "影响车窗远控权限失败提示，技术影响范围较小。",
      effort: "0.5-1 天，包含文案映射、单测和 QA 回归。",
    },
  },
];

const workflowSteps = [
  ["读取 Bug Ticket", "拉取标题、描述、复现步骤、严重级别、评论和关联关系。"],
  ["理解问题现象", "总结异常表现、触发条件和缺失信息。"],
  ["判断需求归属", "关联 REQ/Epic 与 Confluence 业务规则。"],
  ["定位代码实现", "检索 GitLab 模块、文件和候选改动点。"],
  ["评估影响与工时", "输出影响范围、风险点和修复工时区间。"],
  ["生成分析报告", "形成可复制到 Jira 的结构化报告，并列出人工确认项。"],
];

let selectedTicketIndex = 0;
let activeTab = "req";
let running = false;

const ticketList = document.querySelector("#ticketList");
const ticketTitle = document.querySelector("#ticketTitle");
const ticketSeverity = document.querySelector("#ticketSeverity");
const ticketSummary = document.querySelector("#ticketSummary");
const ticketMeta = document.querySelector("#ticketMeta");
const workflow = document.querySelector("#workflow");
const workflowState = document.querySelector("#workflowState");
const contextList = document.querySelector("#contextList");
const contextCount = document.querySelector("#contextCount");
const reportBody = document.querySelector("#reportBody");
const topConfidence = document.querySelector("#topConfidence");
const reportStatus = document.querySelector("#reportStatus");
const runAnalysisBtn = document.querySelector("#runAnalysisBtn");
const copyReportBtn = document.querySelector("#copyReportBtn");
const toast = document.querySelector("#toast");

function renderTickets() {
  ticketList.innerHTML = tickets
    .map(
      (ticket, index) => `
        <button class="ticket-item ${index === selectedTicketIndex ? "active" : ""}" data-index="${index}">
          <strong>${ticket.id}</strong>
          <small>${ticket.title}</small>
        </button>
      `,
    )
    .join("");
}

function renderSelectedTicket() {
  const ticket = tickets[selectedTicketIndex];
  ticketTitle.textContent = `${ticket.id} · ${ticket.module}`;
  ticketSeverity.textContent = `${ticket.severity} / ${ticket.priority}`;
  ticketSummary.textContent = ticket.summary;
  topConfidence.textContent = `${ticket.confidence}%`;
  reportStatus.textContent = ticket.confidence >= 82 ? "usable" : "review";
  reportStatus.className = `pill ${ticket.confidence >= 82 ? "ok" : "warn"}`;

  ticketMeta.innerHTML = Object.entries({
    Epic: ticket.epic,
    Stage: ticket.meta.stage,
    Owner: ticket.owner,
    Effort: ticket.meta.effort,
  })
    .map(
      ([label, value]) => `
        <div class="meta-item">
          <span>${label}</span>
          <strong>${value}</strong>
        </div>
      `,
    )
    .join("");
}

function renderWorkflow(activeIndex = -1, doneAll = false) {
  workflow.innerHTML = workflowSteps
    .map(([title, desc], index) => {
      const stateClass = doneAll || index < activeIndex ? "done" : index === activeIndex ? "running" : "";
      const stateText = doneAll || index < activeIndex ? "done" : index === activeIndex ? "running" : "waiting";
      return `
        <div class="workflow-step ${stateClass}">
          <span class="step-index">${index + 1}</span>
          <div>
            <h4>${title}</h4>
            <p>${desc}</p>
          </div>
          <span class="step-state">${stateText}</span>
        </div>
      `;
    })
    .join("");
}

function renderContexts() {
  const ticket = tickets[selectedTicketIndex];
  const items = ticket.contexts[activeTab];
  const total = Object.values(ticket.contexts).reduce((sum, list) => sum + list.length, 0);
  contextCount.textContent = `${total} hits`;

  contextList.innerHTML = items
    .map(
      (item) => `
        <article class="context-item">
          <strong>${item.title}</strong>
          <p>${item.desc}</p>
          <div class="context-meta">
            <span>${item.match}</span>
            <span class="score">${item.score}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderReport() {
  const ticket = tickets[selectedTicketIndex];
  const report = ticket.report;
  const sections = [
    ["问题分析", [["现象", report.analysis], ["相关性", report.relevance]]],
    ["需求依据", [["需求定义", report.requirement], ["来源", `${ticket.epic} / Confluence`]]],
    ["代码定位", [["实现位置", report.code], ["置信度", `${ticket.confidence}%`]]],
    ["影响与工时", [["影响范围", report.impact], ["工时初评", report.effort]]],
    ["人工确认", [["PO", "确认需求归属与处理建议"], ["RD", "确认代码改动点与工时"], ["QA/QM", "确认复现和回归范围"]]],
  ];

  reportBody.innerHTML = sections
    .map(
      ([title, rows]) => `
        <section class="report-section">
          <h4>${title}</h4>
          <dl>
            ${rows.map(([key, value]) => `<dt>${key}</dt><dd>${value}</dd>`).join("")}
          </dl>
        </section>
      `,
    )
    .join("");
}

function renderAll() {
  renderTickets();
  renderSelectedTicket();
  renderWorkflow(-1, true);
  renderContexts();
  renderReport();
}

async function runAnalysis() {
  if (running) return;
  running = true;
  workflowState.textContent = "running";
  workflowState.className = "pill warn";
  runAnalysisBtn.classList.add("running");

  for (let index = 0; index < workflowSteps.length; index += 1) {
    renderWorkflow(index, false);
    await new Promise((resolve) => setTimeout(resolve, 420));
  }

  renderWorkflow(-1, true);
  workflowState.textContent = "completed";
  workflowState.className = "pill ok";
  runAnalysisBtn.classList.remove("running");
  running = false;
}

function copyReport() {
  const ticket = tickets[selectedTicketIndex];
  const report = ticket.report;
  const text = [
    `## QM Bug Ticket 智能分析报告`,
    `Issue: ${ticket.id}`,
    `标题: ${ticket.title}`,
    `相关性: ${report.relevance}`,
    `问题分析: ${report.analysis}`,
    `需求依据: ${report.requirement}`,
    `代码定位: ${report.code}`,
    `影响范围: ${report.impact}`,
    `工时初评: ${report.effort}`,
  ].join("\n");

  navigator.clipboard?.writeText(text);
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1400);
}

ticketList.addEventListener("click", (event) => {
  const button = event.target.closest(".ticket-item");
  if (!button) return;
  selectedTicketIndex = Number(button.dataset.index);
  renderAll();
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    activeTab = tab.dataset.tab;
    document.querySelectorAll(".tab").forEach((item) => item.classList.toggle("active", item === tab));
    renderContexts();
  });
});

document.querySelectorAll(".review-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".review-card").forEach((item) => item.classList.toggle("active", item === card));
  });
});

runAnalysisBtn.addEventListener("click", runAnalysis);
copyReportBtn.addEventListener("click", copyReport);

renderAll();
