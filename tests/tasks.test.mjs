import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const ROOT = path.resolve(import.meta.dirname, "..");

const skillRoot = path.join(ROOT, "skills", "tasks");

async function read(relativePath) {
  return readFile(path.join(skillRoot, relativePath), "utf8");
}

test("skill follows discover decide implement validate report in order", async () => {
  const skill = await read("SKILL.md");
  const positions = ["## Discover", "## Decide", "## Implement", "## Validate", "## Report"].map((heading) => skill.indexOf(heading));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
});

test("bounded task amendments avoid reloading the full planning stack", async () => {
  const skill = await read("SKILL.md");
  assert.match(skill, /## Fast path and reference loading/);
  assert.match(skill, /bounded-plan fast path/i);
  assert.match(skill, /amend an existing task when it already owns the outcome/i);
  assert.match(skill, /Do not reload every planning reference\/template or reread every historical task/i);
  assert.match(skill, /(?:validate|verify)[^\n]*(?:acceptance coverage|criteria)\/dependencies/i);
  assert.match(skill, /(?:validate|verify)[^\n]*DAG\/topological(?:-order)? invariants/i);
  assert.match(skill, /preserving unrelated valid evidence/i);
});

test("readiness blocks material unanswered decisions instead of inventing them", async () => {
  const readiness = await read("references/READINESS.md");
  assert.match(readiness, /Blocking decision/i);
  assert.match(readiness, /externally observable behavior/);
  assert.match(readiness, /API\/schema\/event contracts/);
  assert.match(readiness, /Do not guess these answers/i);
  assert.match(readiness, /keep the task set `BLOCKED`/i);
});

test("task model sizes by coherent outcomes rather than files or arbitrary estimates", async () => {
  const model = await read("references/TASK_MODEL.md");
  assert.match(model, /Primary unit: coherent outcome/);
  assert.match(model, /behavioral or contractual, not textual/i);
  assert.match(model, /A coherent task may touch several files/i);
  assert.match(model, /Do not size tasks by arbitrary hour\/day estimates/i);
});

test("ready tasks require dependencies, acceptance coverage, verification and completion evidence", async () => {
  const model = await read("references/TASK_MODEL.md");
  for (const phrase of ["Depends on", "Acceptance criteria", "Verification", "Completion evidence"]) {
    assert.match(model, new RegExp(phrase, "i"));
  }
});

test("dependency model requires a DAG and preserves real parallelism", async () => {
  const deps = await read("references/DEPENDENCIES.md");
  assert.match(deps, /hard-dependency graph must be a DAG/i);
  assert.match(deps, /topological order/i);
  assert.match(deps, /candidates for parallel work/i);
  assert.match(deps, /not automatically a semantic dependency/i);
});

test("validation requires full acceptance-criteria traceability", async () => {
  const validation = await read("references/VALIDATION.md");
  assert.match(validation, /no implementation-relevant acceptance criterion with zero task coverage/i);
  assert.match(validation, /AC-01 -> TASK-001/);
  assert.match(validation, /A criterion may map to multiple tasks/i);
});

test("validation rejects vague task outcomes and invented repository commands", async () => {
  const validation = await read("references/VALIDATION.md");
  assert.match(validation, /Reject vague tasks/);
  assert.match(validation, /"implement backend changes"/);
  assert.match(validation, /Do not invent commands/);
});

test("task-set readiness requires coverage, executable ordering and explicit blockers", async () => {
  const skill = await read("SKILL.md");
  assert.match(skill, /every implementation-relevant acceptance criterion is covered/i);
  assert.match(skill, /hard-dependency graph is acyclic/i);
  assert.match(skill, /topological execution order exists/i);
  assert.match(skill, /blockers and assumptions are explicit/i);
});

test("contract-compatible default output path is documented without making it a runtime dependency", async () => {
  const skill = await read("SKILL.md");
  assert.match(skill, /docs\/specs\/<SPEC-ID>-<slug>\/tasks\//);
  assert.match(skill, /another healthy convention/i);
});

test("task-set template captures readiness, waves, coverage and graph validation", async () => {
  const template = await read("assets/tasks-index.template.md");
  for (const phrase of ["Readiness: READY | BLOCKED", "Execution waves", "Acceptance-criteria coverage", "Dependency graph is acyclic", "No blocking decision"]) {
    assert.ok(template.toLowerCase().includes(phrase.toLowerCase()), phrase);
  }
});

test("individual task template separates evidence, verification, dependencies and assumptions", async () => {
  const template = await read("assets/task.template.md");
  for (const heading of ["## Dependencies", "## Repository evidence", "## Verification", "## Completion evidence", "## Blockers / assumptions"]) {
    assert.ok(template.includes(heading));
  }
  assert.match(template, /Verified existing surface/);
  assert.match(template, /Proposed new surface/);
  assert.match(template, /Unknowns/);
});
