---
name: tasks
description: Decomposes software specifications into executable, dependency-aware implementation tasks with readiness checks, acceptance-criteria traceability, and explicit verification. Use when turning a draft or approved SPEC into ordered implementation work, checking whether a task plan is ready to execute, or repairing task dependencies and coverage.
license: MIT
metadata:
  author: Turpial AI Academy
  version: "0.5.7"
---

# tasks

## Operating flow

~~~text
DISCOVER -> DECIDE -> IMPLEMENT -> VALIDATE -> REPORT
~~~

## Purpose

Turn a software specification into the smallest useful set of implementation tasks that another developer or agent can execute in a valid order without rediscovering scope, prerequisites, acceptance criteria, or verification.

This capability plans implementation work. It does not silently implement the SPEC, redesign unresolved requirements, or replace repository-specific planning conventions that are already healthy.


## Fast path and reference loading

Use the **bounded-plan fast path** when a healthy existing SPEC/task plan already exists and the change only requires a local task amendment or one additional coherent task without redesigning behavior or restructuring the dependency graph.

Fast path:

1. read the source SPEC sections/acceptance criteria affected by the change;
2. read the current task index and only the task(s) or implementation surfaces needed to place the change;
3. amend an existing task when it already owns the outcome, otherwise add the minimum new coherent task;
4. validate the changed acceptance coverage/dependencies plus DAG/topological-order invariants;
5. preserve unrelated task files, waves, evidence, and verification paths that remain valid.

Do not reload every planning reference/template or reread every historical task merely because a new delegated turn started.

Use the **deep path** when creating a new task plan, resolving readiness uncertainty, restructuring several dependencies/waves, changing public/persisted/security/migration contracts, handling unfamiliar repository conventions, or when a contradiction/material blocker appears.

Reference policy:

- `READINESS.md`: new plan or uncertain/material SPEC readiness;
- `TASK_MODEL.md`: new task boundaries or unclear task sizing;
- `DEPENDENCIES.md`: dependency/wave changes beyond a trivial append;
- task/index templates: new plan/files or unhealthy/missing existing structure;
- `VALIDATION.md`: full plan readiness, graph/coverage uncertainty, or deep-path validation.

Detailed references remain authoritative when triggered.
## Non-negotiable rules

- Read the source SPEC and relevant repository evidence before writing tasks.
- Treat the SPEC as the source of intended behavior; treat the repository as the source of implementation reality.
- Do not invent a decision merely to make decomposition possible.
- If an unresolved decision materially changes behavior, contracts, persistence, migration, security, rollout, or verification, report `BLOCKED`.
- Use dependencies only for true prerequisites. Do not serialize work merely because a numbered list looks tidy.
- Size tasks around coherent outcomes, not one-file-per-task or arbitrary time estimates.
- Every implementation-relevant acceptance criterion must map to at least one task and verification path.
- Every ready task must state how completion can be verified.
- Preserve established repository naming, testing, documentation, and task conventions when they are healthy.
- Separate verified facts, assumptions, recommendations, and blockers.
- Do not claim the task set is ready until readiness and dependency checks have actually been performed.

## Discover

For a new plan or uncertain/material readiness, read [READINESS.md](references/READINESS.md). On the bounded-plan fast path, use the already-ready SPEC/task plan and inspect only the affected criteria and repository evidence.

Inspect:

1. the complete source SPEC, including scope, non-goals, acceptance criteria, affected contracts, risks, and unresolved questions;
2. repository instructions and existing planning/task conventions;
3. the implementation surfaces named by the SPEC;
4. nearby tests, schemas, APIs, migrations, docs, and runtime boundaries needed to understand sequencing;
5. existing commands that can validate the affected behavior.

Do not perform a repository-wide audit unless the SPEC requires it. Gather the minimum evidence needed to produce executable tasks.

If the source SPEC is incomplete, distinguish:
- information that can be discovered from repository evidence;
- a harmless implementation detail that can remain local to a task;
- a material decision that requires clarification or a SPEC update.

## Decide

Use [TASK_MODEL.md](references/TASK_MODEL.md) when task boundaries/sizing are unclear and [DEPENDENCIES.md](references/DEPENDENCIES.md) when dependency/wave structure needs non-trivial change. Do not reload them for a local amendment whose existing task model and ordering remain healthy.

Choose decomposition boundaries by coherent implementation outcome. Good boundaries often correspond to:

- a contract or schema change plus its compatibility work;
- one behavior slice that can be implemented and verified together;
- a shared prerequisite genuinely required by multiple later tasks;
- migration/rollout work that must precede or follow behavior changes;
- documentation or operational work required by explicit acceptance criteria.

Avoid:
- one task per file;
- one giant task that simply says "implement the SPEC";
- "setup" tasks with no real prerequisite value;
- dependencies created only to force an aesthetic sequence;
- duplicating the same work across multiple tasks.

For each task, assign a stable ID and record only hard prerequisites in `Depends on`. Independent tasks should remain independent so parallel work is visible.

## Implement

Write the task set. When the SPEC lives at `docs/specs/<SPEC-ID>-<slug>/`, the contract-compatible default is:

~~~text
docs/specs/<SPEC-ID>-<slug>/tasks/
~~~

If the repository has another healthy convention or the user provides a destination, use that instead.

A typical task set contains:

- `README.md` — readiness result, source SPEC, ordered task table, dependency/parallelism summary, acceptance-criteria coverage, blockers and assumptions;
- `TASK-###-<slug>.md` — one file per coherent task when separate task files improve execution.

Use [tasks-index.template.md](assets/tasks-index.template.md) and [task.template.md](assets/task.template.md) when creating new plan/task files or repairing unhealthy structure; preserve healthy existing task files for bounded amendments.

Each ready task should include, as applicable:

- ID and outcome;
- source SPEC reference;
- hard dependencies;
- relevant repository surfaces;
- implementation scope and explicit non-goals;
- acceptance criteria covered;
- verification method/commands;
- completion evidence expected;
- blockers or assumptions that remain.

Do not turn implementation notes into a hidden redesign of the SPEC.

## Validate

Use [VALIDATION.md](references/VALIDATION.md) for a full/deep readiness review or when coverage/graph uncertainty exists. On the bounded-plan fast path, verify the affected criteria/dependencies and the DAG/topological invariants that the amendment can change, while preserving unrelated valid evidence.

Before declaring `READY`, verify:

1. source SPEC readiness is sufficient for the proposed work;
2. every implementation-relevant acceptance criterion is covered;
3. every task has a concrete outcome;
4. hard dependencies reference real task IDs;
5. the hard-dependency graph is acyclic;
6. at least one valid topological execution order exists;
7. independent work is not needlessly serialized;
8. each ready task has a verification path;
9. referenced repository paths/commands are based on evidence, not invention;
10. blockers and assumptions are explicit.

If any blocking check fails, report `BLOCKED` and the exact gap. A partially useful decomposition may still be provided, but it must not be represented as execution-ready.

## Report

Report:

1. source SPEC and repository evidence used;
2. readiness status: `READY` or `BLOCKED`;
3. task count and ordered execution waves;
4. parallelizable tasks;
5. acceptance-criteria coverage;
6. material assumptions;
7. blockers or SPEC decisions still required;
8. files created or changed;
9. validation performed and results;
10. remaining risks.

Keep facts separate from inference and recommendations.

## Detailed references

- [Readiness](references/READINESS.md)
- [Task model](references/TASK_MODEL.md)
- [Dependencies](references/DEPENDENCIES.md)
- [Validation and traceability](references/VALIDATION.md)
- [Task-set template](assets/tasks-index.template.md)
- [Individual task template](assets/task.template.md)
