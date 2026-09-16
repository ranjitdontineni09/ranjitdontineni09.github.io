const STACK = [
  { id: "react", layer: "INTERFACE", name: "React", note: "Ask/cite UIs and job-tracking dashboards on top of REST." },
  { id: "apis", layer: "INTERFACE", name: "REST APIs", note: "Submit–poll–webhook contracts for async loan and KYC flows." },
  { id: "rag", layer: "AGENTS", name: "RAG + Qdrant", note: "Chunk, retrieve, cite. Refuse the answer when retrieval is empty." },
  { id: "lora", layer: "AGENTS", name: "Llama · LoRA", note: "Open-weight adaptation instead of treating the model as a black box." },
  { id: "node", layer: "SERVICES", name: "Node.js · Lambda", note: "Comms platform and migrated BizTalk services on API Gateway." },
  { id: "java", layer: "SERVICES", name: "Java · Spring", note: "Kafka task mesh: submit, execute, track with PostgreSQL." },
  { id: "spark", layer: "STREAMS", name: "Spark · Iceberg", note: "Five-minute micro-batches, watermarks, hourly partitions." },
  { id: "kafka", layer: "STREAMS", name: "Kafka · Kinesis", note: "Async workers and Connect event streams." },
  { id: "aws", layer: "CLOUD", name: "AWS", note: "Lambda, SQS, DynamoDB, Step Functions, EMR Serverless, CI/CD." },
  { id: "docker", layer: "CLOUD", name: "Docker · CI/CD", note: "CodePipeline / CodeBuild / ECR for 50+ Lambdas." },
];

const SYSTEMS = [
  {
    id: "connect",
    title: "CONNECT STREAM",
    stages: [
      { id: "events", label: "SQS + Lambda", body: "Amazon Connect events land on queues with retries and DLQs before they ever hit the stream." },
      { id: "kinesis", label: "Kinesis", body: "Near-real-time event bus. Replaces a 24-hour batch so forecasting and agents see fresh telemetry." },
      { id: "spark", label: "Spark / EMR", body: "Structured Streaming every five minutes: dedup, watermarks, windowing on EMR Serverless." },
      { id: "iceberg", label: "Iceberg", body: "Hourly partitions, 15-minute buckets, queryable tables with hot-vs-cold validation." },
    ],
  },
  {
    id: "biztalk",
    title: "BIZTALK ? AWS",
    stages: [
      { id: "gw", label: "API Gateway", body: "REST edge for 8+ services reverse-engineered from 32 C# orchestrations." },
      { id: "lambda", label: "12 Lambdas", body: "Node.js services with submit–poll–webhook semantics for async business flows." },
      { id: "ddb", label: "DynamoDB", body: "NoSQL item collections plus a read-through cache that killed Teradata fan-out." },
      { id: "sfn", label: "Step Functions", body: "Daily cache refresh. Holdings latency moved from 2.8s to 350ms. 99.9% availability." },
    ],
  },
  {
    id: "agent",
    title: "GROUNDED Q&A AGENT",
    stages: [
      { id: "ui", label: "React UI", body: "Ask, cite, follow-up. The interface makes retrieval visible instead of hiding it." },
      { id: "api", label: "FastAPI", body: "Session + tools runtime. DeepSeek Harness plugins against a project knowledge base." },
      { id: "ret", label: "Qdrant RAG", body: "Indexed chunks. If retrieval is empty, the agent refuses rather than hallucinating." },
      { id: "model", label: "Llama + LoRA", body: "Open-weight checkpoint adapted on Hugging Face — inspect loss, do not only call an API." },
    ],
  },
];

const TIMELINE = [
  { when: "2019 — 2023", title: "VIT · B.Tech Computer Science", body: "CGPA 8.88/10. Systems and software foundation." },
  { when: "Jun 2023 — Jul 2025", title: "Aditya Birla Capital · SDE I", body: "10M+ msgs/day comms platform. BizTalk to AWS. 27M daily KYC/loan APIs. Execution Excellence." },
  { when: "Aug 2025 — May 2027", title: "Georgia State · MS CS + GRA", body: "Academic Affairs assessment. Mentoring Python/Java/DSA. Atlanta." },
  { when: "May — Aug 2026", title: "AWS Connect · SDE Intern", body: "Seattle. Streaming pipeline for Connect telemetry feeding ML and AI-agent workflows." },
  { when: "Next", title: "Full-time SDE / full-stack AI", body: "Open to roles that ship cloud services, data systems, and agents in production." },
];

const KPI_TO_SYSTEM = { comms: "biztalk", kyc: "biztalk", cache: "biztalk", connect: "connect" };

const logEl = document.getElementById("term-log");
const cmd = document.getElementById("cmd");
const clock = document.getElementById("clock");

function line(html) {
  const p = document.createElement("p");
  p.innerHTML = html;
  logEl.appendChild(p);
  logEl.scrollTop = logEl.scrollHeight;
}

const boot = [
  '<span class="dim">boot</span> agent runtime v2.6',
  '<span class="dim">load</span> stack topology · 10 nodes',
  '<span class="dim">load</span> production pipelines · connect / biztalk / rag',
  '<span class="out">whoami</span> Ranjit Dontineni · full-stack AI engineer',
  '<span class="dim">ready</span> type <span class="in">help</span>',
];
boot.forEach((item, i) => setTimeout(() => line(item), 280 * i));

const HELP = `commands: help · whoami · stack · systems · timeline · contact · clear
keys: 1 overview · 2 stack · 3 systems · 4 timeline`;

cmd.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  const value = cmd.value.trim().toLowerCase();
  line(`<span class="in">&gt; ${cmd.value}</span>`);
  cmd.value = "";
  if (!value || value === "help") line(`<span class="out">${HELP}</span>`);
  else if (value === "whoami") line('<span class="out">Ranjit Dontineni · AWS · agents · streaming systems · Atlanta</span>');
  else if (value === "stack") { show("stack"); line('<span class="out">opened stack topology</span>'); }
  else if (value === "systems") { show("systems"); line('<span class="out">opened pipelines</span>'); }
  else if (value === "timeline") { show("timeline"); line('<span class="out">opened path</span>'); }
  else if (value === "overview" || value === "home") { show("overview"); line('<span class="out">overview</span>'); }
  else if (value === "contact") line('<span class="out">ranjitdontineni9@gmail.com · calendly.com/ranjitdontineni9/30min</span>');
  else if (value === "clear") logEl.replaceChildren();
  else line('<span class="dim">unknown · try help</span>');
});

function show(id) {
  document.querySelectorAll(".view").forEach((view) => {
    const on = view.id === `view-${id}`;
    view.hidden = !on;
    view.classList.toggle("is-on", on);
  });
  document.querySelectorAll(".views button").forEach((button) => {
    button.classList.toggle("is-on", button.dataset.view === id);
  });
}

document.querySelectorAll(".views button").forEach((button) => {
  button.addEventListener("click", () => show(button.dataset.view));
});

document.addEventListener("keydown", (event) => {
  if (event.target === cmd) return;
  const map = { "1": "overview", "2": "stack", "3": "systems", "4": "timeline" };
  if (map[event.key]) show(map[event.key]);
});

const constellation = document.getElementById("constellation");
const stackDetail = document.getElementById("stack-detail");
STACK.forEach((node) => {
  const button = document.createElement("button");
  button.className = "node";
  button.type = "button";
  button.innerHTML = `<span>${node.layer}</span><b>${node.name}</b>`;
  button.addEventListener("click", () => {
    constellation.querySelectorAll(".node").forEach((el) => el.classList.remove("is-on"));
    button.classList.add("is-on");
    stackDetail.innerHTML = `<p class="kicker">${node.layer}</p><h2>${node.name}</h2><p>${node.note}</p>`;
    line(`<span class="dim">inspect</span> ${node.name}`);
  });
  constellation.appendChild(button);
});

const pipes = document.getElementById("pipes");
const sysDetail = document.getElementById("sys-detail");
function inspectStage(system, stage) {
  pipes.querySelectorAll("button").forEach((el) => {
    el.classList.toggle("is-on", el.textContent === stage.label && el.closest(".pipe")?.querySelector("h2")?.textContent === system.title);
  });
  sysDetail.innerHTML = `<p class="kicker">${system.title}</p><h2>${stage.label}</h2><p>${stage.body}</p>`;
  line(`<span class="dim">stage</span> ${system.title} / ${stage.label}`);
}

SYSTEMS.forEach((system) => {
  const wrap = document.createElement("div");
  wrap.className = "pipe";
  wrap.innerHTML = `<h2>${system.title}</h2>`;
  const row = document.createElement("div");
  row.className = "stages";
  system.stages.forEach((stage, index) => {
    if (index) {
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "?";
      row.appendChild(arrow);
    }
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = stage.label;
    button.addEventListener("click", () => inspectStage(system, stage));
    row.appendChild(button);
  });
  wrap.appendChild(row);
  pipes.appendChild(wrap);
});

document.querySelectorAll("#kpis button").forEach((button) => {
  button.addEventListener("click", () => {
    const sys = SYSTEMS.find((item) => item.id === KPI_TO_SYSTEM[button.dataset.open]);
    show("systems");
    if (sys) inspectStage(sys, sys.stages[0]);
  });
});

const timeline = document.getElementById("timeline");
TIMELINE.forEach((item) => {
  const li = document.createElement("li");
  li.innerHTML = `<b>${item.when}</b><h2>${item.title}</h2><p>${item.body}</p>`;
  timeline.appendChild(li);
});

function tick() {
  const now = new Date();
  clock.textContent = `SYS.NOMINAL  ${now.toISOString().slice(11, 19)}Z`;
}
tick();
setInterval(tick, 1000);

const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");
const nodes = Array.from({ length: 48 }, () => ({
  x: Math.random(),
  y: Math.random(),
  vx: (Math.random() - 0.5) * 0.00025,
  vy: (Math.random() - 0.5) * 0.00025,
}));

function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
addEventListener("resize", resize);
resize();

function draw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  nodes.forEach((node) => {
    node.x += node.vx;
    node.y += node.vy;
    if (node.x < 0 || node.x > 1) node.vx *= -1;
    if (node.y < 0 || node.y > 1) node.vy *= -1;
  });
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d = Math.hypot(dx, dy);
      if (d < 0.18) {
        ctx.strokeStyle = `rgba(92,225,230,${(0.18 - d) * 1.4})`;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x * innerWidth, nodes[i].y * innerHeight);
        ctx.lineTo(nodes[j].x * innerWidth, nodes[j].y * innerHeight);
        ctx.stroke();
      }
    }
  }
  nodes.forEach((node) => {
    ctx.fillStyle = "#a78bfa";
    ctx.beginPath();
    ctx.arc(node.x * innerWidth, node.y * innerHeight, 1.6, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
