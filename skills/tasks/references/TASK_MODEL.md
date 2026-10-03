# Task model

## Primary unit: coherent outcome

A task is the smallest coherent implementation unit that produces a meaningful, reviewable outcome and can be validated against the source SPEC.

The unit is behavioral or contractual, not textual.

Prefer:

~~~text
TASK-004 — Enforce idempotency for payment retry creation
~~~

over:

~~~text
TASK-004 — Edit payment-service.ts
~~~

A coherent task may touch several files. One file may participate in multiple tasks when distinct behavior slices genuinely require it.

## Required information

For every ready task record:

- `ID` — stable within the task set;
- `Outcome` — what becomes true when the task is complete;
- `Source SPEC` — identity/link to the governing specification;
- `Depends on` — hard prerequisite task IDs, or `none`;
- `Scope` — implementation surfaces/responsibilities included;
- `Non-goals` — only when needed to prevent scope leakage;
- `Acceptance criteria` — SPEC criteria this task advances or closes;
- `Verification` — concrete evidence or repository command that proves completion;
- `Completion evidence` — what the executor should be able to report.

Use repository paths and commands only when discovered from repository evidence. Never fabricate a plausible command.

## Sizing

Split a task when combining the work would:

- hide a real prerequisite;
- mix independently reviewable outcomes;
- couple unrelated acceptance criteria;
- make verification ambiguous;
- prevent useful parallel execution;
- combine migration/compatibility work with behavior that must happen at a different time.

Keep work together when splitting would create coordination overhead without an independently meaningful outcome.

Do not size tasks by arbitrary hour/day estimates unless the user or repository explicitly requires estimation.

## Shared prerequisites

Create a shared prerequisite task only if later tasks truly require its completed state.

Examples may include:
- a schema migration required before multiple readers/writers can change;
- a shared contract/type needed by independent implementations;
- a test fixture or harness required by several acceptance criteria.

Do not create generic "setup", "refactor", or "cleanup" prerequisites solely to make the plan look layered.

## Non-implementation work

Documentation, migration, rollout, observability, or operational tasks belong in the task set when the SPEC or repository contract makes them part of completion.

Do not add ceremonial tasks unrelated to acceptance criteria, risk, or repository requirements.
