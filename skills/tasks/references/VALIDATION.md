# Validation and traceability

Validation proves that a task set is executable, not merely detailed.

## 1. Acceptance-criteria coverage

Build a coverage map for every implementation-relevant acceptance criterion:

~~~text
AC-01 -> TASK-001 -> unit/contract verification
AC-02 -> TASK-002, TASK-003 -> integration verification
~~~

A criterion may map to multiple tasks. A task may cover multiple criteria.

Before `READY`, there must be no implementation-relevant acceptance criterion with zero task coverage.

If an acceptance criterion is verification-only or already satisfied by repository evidence, state that explicitly rather than inventing implementation work.

## 2. Task completeness

For each ready task verify:

- outcome is concrete;
- scope is bounded;
- hard dependencies are explicit;
- acceptance-criteria links are present when applicable;
- verification is actionable;
- completion evidence is clear;
- no unresolved blocking decision is hidden in prose.

Reject vague tasks such as:
- "implement backend changes";
- "update tests";
- "handle edge cases";
- "finish integration".

Those phrases may appear inside a scoped task, but they are not sufficient task outcomes by themselves.

## 3. Dependency validation

Check the full hard-dependency graph for:

- unknown IDs;
- self-dependencies;
- cycles;
- unreachable/contradictory sequencing;
- unnecessary serialization.

Produce a valid topological order or execution waves.

If no valid order exists, status is `BLOCKED`.

## 4. Repository reality check

When tasks reference existing files, packages, services, schemas, tests, or commands, verify that those references came from current repository evidence.

Distinguish:

- `verified` — observed in repository;
- `proposed` — new path/name the task will create;
- `unknown` — not yet established.

A critical unknown that prevents reliable implementation or verification blocks readiness.

## 5. Verification quality

Verification should prove the task outcome at the narrowest useful level while respecting repository gates.

Examples include:
- an existing targeted test command;
- schema/contract validation;
- migration verification;
- type/build checks;
- integration tests;
- repository-defined broader gates where required.

Do not invent commands. If the repository does not reveal a suitable command, describe the evidence required and report the missing command/tooling explicitly.

## 6. Final readiness report

A final task-set validation records:

~~~text
status: READY | BLOCKED
source_spec:
task_count:
execution_waves:
parallelizable:
acceptance_criteria_coverage:
dependency_graph:
verification_complete:
assumptions:
blockers:
~~~

`READY` requires complete coverage, a valid DAG, an executable order, and no unresolved material decision.
