# <SPEC-ID> tasks

## Status

- Readiness: READY | BLOCKED
- Source SPEC: <path-or-reference>
- Generated/reviewed from repository evidence: <references>

## Readiness notes

### Verified facts

- <fact>

### Assumptions

- <assumption-or-none>

### Blockers

- <blocking-decision-or-none>

## Execution waves

~~~text
Wave 1: TASK-001, TASK-002
Wave 2: TASK-003
~~~

## Tasks

| ID | Outcome | Depends on | Acceptance criteria | Verification |
|---|---|---|---|---|
| TASK-001 | <coherent outcome> | none | AC-01 | <evidence/command> |

## Acceptance-criteria coverage

| Criterion | Tasks | Verification | Coverage |
|---|---|---|---|
| AC-01 | TASK-001 | <evidence> | covered |

## Coordination risks

- <shared-file/integration risk that is not a semantic dependency>

## Validation

- [ ] Every dependency points to a real task.
- [ ] Dependency graph is acyclic.
- [ ] A topological execution order exists.
- [ ] Independent tasks are not needlessly serialized.
- [ ] Every implementation-relevant acceptance criterion is covered.
- [ ] Every ready task has a verification path.
- [ ] Repository paths/commands are verified or clearly marked proposed/unknown.
- [ ] No blocking decision is hidden inside task prose.
