# Readiness

Readiness is an evidence claim, not a formatting state.

## Source SPEC readiness

A SPEC is sufficiently ready for task decomposition when the information needed to choose implementation outcomes and verification is present or discoverable from the repository.

Check, when relevant:

- stable identity/title and intended outcome;
- in-scope and out-of-scope behavior;
- testable acceptance criteria;
- affected public/internal contracts;
- data, persistence, migration, rollout, or compatibility expectations;
- security/permission implications;
- repository constraints and required quality gates;
- unresolved questions and risks.

Not every SPEC needs every category. Absence matters only when that category affects the change.

### Discoverable gap

A gap is discoverable when repository evidence can answer it without making a product or architecture decision. Example: the SPEC names an existing API but omits its file path.

Discover the fact and cite the repository evidence in the task set.

### Non-blocking implementation detail

A detail may remain inside a task when several implementations satisfy the SPEC equally and repository conventions already constrain the choice sufficiently.

Do not elevate every implementation detail into a SPEC blocker.

### Blocking decision

A gap blocks readiness when different answers materially change one or more of:

- externally observable behavior;
- API/schema/event contracts;
- persisted data or migrations;
- authorization/security posture;
- compatibility or rollout strategy;
- acceptance criteria;
- required verification.

Do not guess these answers. Report the decision needed and keep the task set `BLOCKED`.

## Task-set readiness

A task set is `READY` only when:

- every task has a coherent outcome;
- acceptance-criteria coverage is complete for implementation-relevant criteria;
- hard dependencies form an acyclic graph;
- an executable topological order exists;
- independent tasks remain parallelizable;
- validation is explicit per ready task;
- assumptions and blockers are visible;
- no task depends on a hidden, unresolved decision.

A task set can be useful while `BLOCKED`. In that case, mark provisional tasks or affected dependencies clearly and do not present the plan as executable end-to-end.
