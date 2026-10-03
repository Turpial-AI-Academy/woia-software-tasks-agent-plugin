# Dependencies

## Hard dependency semantics

`TASK-B depends on TASK-A` means TASK-B cannot be correctly completed or validated until TASK-A's outcome exists.

Use hard dependencies for real prerequisites only.

Do not use them for:
- preferred reviewer order;
- aesthetic sequencing;
- tasks that merely touch nearby files;
- "do this first because it is numbered first".

When two tasks can be implemented and validated independently, leave them independent.

## Graph rules

The hard-dependency graph must be a DAG.

Validate:

1. every dependency references an existing task ID;
2. no task depends on itself;
3. no cycles exist;
4. at least one topological order contains every task;
5. tasks with no unmet dependencies form the first execution wave;
6. after each wave completes, newly unblocked tasks form the next wave.

Report execution as waves when useful:

~~~text
Wave 1: TASK-001, TASK-002
Wave 2: TASK-003
Wave 3: TASK-004, TASK-005
~~~

Tasks inside a wave are candidates for parallel work, subject to repository/worktree coordination.

## Repository conflicts are not always dependencies

Two independent tasks may edit the same file. That creates integration coordination, not automatically a semantic dependency.

Represent a hard dependency only when one task requires the other's completed behavior/contract. Otherwise report the shared surface as a coordination risk.

## External prerequisites

A prerequisite outside the task set—approval, external API availability, credential, migration window, another repository, legal decision—should be recorded explicitly as an external blocker/prerequisite.

Do not create a fake internal task merely to hide an external dependency.

## Changing the graph

If new repository evidence reveals a missing prerequisite:

- update affected dependency edges;
- recompute execution waves;
- check for cycles;
- re-check acceptance-criteria coverage;
- report why the plan changed.

Do not preserve stale numbering/ordering at the expense of correctness.
