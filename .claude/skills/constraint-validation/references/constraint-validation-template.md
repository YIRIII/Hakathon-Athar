# Constraint Validation Template

## README.md Structure

```markdown
# Constraint Validation — {Idea Name}

**Idea**: {slug}
**Date**: {YYYY-MM-DD}
**Status**: In Progress / Complete
**Verdict**: Pending / PASS / CONDITIONAL PASS / FAIL

## Extracted Constraints

| ID | Source | Description | Threshold | Type | Scope |
|----|--------|-------------|-----------|------|-------|
| C-01 | BR-{X} | {requirement description} | {quantitative limit} | Performance | Single-capability |
| C-02 | BR-{Y} | {requirement description} | {quantitative limit} | Compliance | System-wide |
| C-03 | Budget | {budget tier constraint} | {monthly/annual limit} | Cost | System-wide |
| C-04 | Timeline | {development timeline} | {weeks/months} | Timeline | System-wide |
| C-05 | Team | {team capacity} | {person-weeks available} | Resource | System-wide |

### Constraint Types
- **Performance**: Response time, accuracy, throughput, resource consumption
- **Cost**: Budget envelope, cost-to-revenue ratio, Month 1 cash requirement
- **Compliance**: Regulatory standards that all components must satisfy
- **Timeline**: Development deadlines, milestone dates
- **Resource**: Team capacity, skill availability, infrastructure limits

### Constraint Scope
- **Single-capability**: Affects one capability in isolation (validated within that capability's tech research)
- **Cross-capability**: Affects the interaction between 2+ capabilities (the gap this skill fills)
- **System-wide**: Applies to the entire system (budget, timeline, compliance)

## Assessment Scope

| Document | Available | Key Input |
|----------|-----------|-----------|
| Technical Options | Yes/No | {N} capability recommendations to validate |
| Supporting Systems | Yes/No | {N} system recommendations to include in cost/effort |
| Pricing Strategy | Yes/No | Unit economics, cost-to-serve, revenue projections |
| Marketing Strategy | Yes/No | Marketing costs, CAC, channel costs |
| Budget Context | Yes/No | Budget envelope, cost sanity thresholds |
| Risk Assessment | Yes/No | Identified risks that may affect feasibility |

## Validation Progress

| # | Category | File | Constraints Checked | Violations | Status | Updated |
|---|----------|------|--------------------|------------|--------|---------|
| 1 | Cumulative Performance | [01-cumulative-performance.md](01-cumulative-performance.md) | — | — | pending | — |
| 2 | Cost Feasibility | [02-cost-feasibility.md](02-cost-feasibility.md) | — | — | pending | — |
| 3 | Technical Compatibility | [03-technical-compatibility.md](03-technical-compatibility.md) | — | — | pending | — |
| 4 | Capacity & Timeline | [04-capacity-timeline.md](04-capacity-timeline.md) | — | — | pending | — |

---

## Constraint Register

| ID | Constraint | Source | Threshold | Combined Actual | Headroom | Verdict | Category |
|----|-----------|--------|-----------|----------------|----------|---------|----------|
| C-01 | {description} | BR-{X} | {limit} | {measured} | {+/-margin} | PASS/WARNING/FAIL | Performance |

### Verdict Definitions
- **PASS**: Combined actual is within threshold with ≥ 20% headroom
- **WARNING**: Combined actual is within threshold but < 20% headroom (fragile — may fail under load or growth)
- **FAIL**: Combined actual exceeds threshold — constraint is violated

---

## Compatibility Issues

| ID | Issue | Options Involved | Severity | Resolution | Effort |
|----|-------|-----------------|----------|------------|--------|
| CV-01 | {description} | {Cap-N Option + Cap-M Option} | CRITICAL/HIGH/MEDIUM/LOW | {resolution approach} | {estimated effort} |

### Severity Definitions
- **CRITICAL**: Blocks implementation entirely — options cannot coexist
- **HIGH**: Requires significant architectural workaround (> 1 week effort)
- **MEDIUM**: Adds moderate complexity (days of work, but manageable)
- **LOW**: Minor inconvenience or configuration difference

---

## Feasibility Matrix

| Constraint | {Option A} | {Option B} | {Option C} | ... | Combined | Verdict |
|-----------|------------|------------|------------|-----|----------|---------|
| C-01: {name} | {contribution} | {contribution} | {contribution} | ... | {total} | ✅/⚠️/❌ |

Legend: ✅ PASS | ⚠️ WARNING | ❌ FAIL

---

## Remediation Roadmap

### C-{XX}: {Constraint Name} — {FAIL/WARNING}

**Combined actual**: {value} vs. threshold: {limit} (headroom: {negative value})
**Top contributors**: {Option A (X%, contribution), Option B (Y%, contribution)}

**Root cause**: {Why the combined effect exceeds the threshold}

**Remediation options**:
1. **{Option name}**: {description} → Reduces combined to {new value} ({new verdict})
   - Trade-off: {what you lose}
   - Effort: {estimated implementation change}
2. **{Option name}**: {description} → Reduces combined to {new value} ({new verdict})
   - Trade-off: {what you lose}
   - Effort: {estimated implementation change}
3. **Relax threshold**: If {relaxed value} is acceptable, {which remediation suffices}. Requires: {stakeholder approval / BRD amendment}

**Recommended**: Option {N} — {rationale}

---

## Verdict: {PASS / CONDITIONAL PASS / FAIL}

**Rationale**: {2-3 sentences with evidence — reference specific constraint IDs and measured values}

### Conditions (if CONDITIONAL PASS)

| # | Condition | Constraint | Required Action | Affects |
|---|-----------|-----------|----------------|---------|
| 1 | {what must change} | C-{XX} | {specific action} | {which skill/document} |

### Blocking Issues (if FAIL)

| # | Issue | Constraint | Required Action | Upstream Skill to Re-run |
|---|-------|-----------|----------------|-------------------------|
| 1 | {what's violated} | C-{XX} | {specific action} | /tech-research (Cap-N) |

---

## Impact on Pipeline Documents

| Document | Adjustment Needed | Details |
|----------|------------------|---------|
| Tech Options | Yes/No | {which capabilities need option changes} |
| Supporting Systems | Yes/No | {which systems need re-evaluation} |
| Pricing Strategy | Yes/No | {cost changes that affect unit economics} |
| PRD | Yes/No | {constraints to incorporate, architecture adjustments} |
| BRD | Yes/No | {threshold adjustments if warranted} |
```

---

## Per-Category File Structure (NN-category.md)

### Category 1: Cumulative Performance (`01-cumulative-performance.md`)

```markdown
# Cumulative Performance Validation — {Idea Name}

**Category**: 1 of 4
**Date**: {YYYY-MM-DD}
**Constraints Checked**: {count}
**Violations**: {count}

## Context

{Brief description of what upstream documents informed this analysis and what constraints are being validated}

## Request-Path Latency Chain

### User Flow: {Primary user action description}

| Hop | Component | Recommended Option | Expected Latency | Source |
|-----|-----------|-------------------|------------------|--------|
| 1 | {Frontend} | {option} | {Xms} | {citation} |
| 2 | {API Gateway} | {option} | {Xms} | {citation} |
| 3 | {Service A} | {option} | {Xms} | {citation} |
| ... | | | | |
| **TOTAL** | | | **{Xms}** | |

**Constraint**: C-{XX} — {description}
**Threshold**: {limit}
**Combined Actual**: {total}
**Headroom**: {+/- value} ({percentage})
**Verdict**: {PASS / WARNING / FAIL}

{If multiple user flows exist, repeat for each critical flow}

## Accuracy/Quality Chains (if applicable)

### Pipeline: {ML/processing pipeline description}

| Step | Component | Recommended Option | Accuracy/Quality | Source |
|------|-----------|-------------------|------------------|--------|
| 1 | {Step A} | {option} | {X%} | {citation} |
| 2 | {Step B} | {option} | {X%} | {citation} |
| **Combined** | | | **{X% × Y% = Z%}** | |

**Constraint**: C-{XX}
**Threshold**: {limit}
**Combined Actual**: {calculated}
**Verdict**: {PASS / WARNING / FAIL}

## Resource Consumption Stacking (if applicable — mobile/edge)

| Resource | {Option A} | {Option B} | {Option C} | Combined | Limit | Verdict |
|----------|-----------|-----------|-----------|----------|-------|---------|
| Battery drain/hr | {X%} | {X%} | {X%} | {total%} | {limit} | |
| Storage | {X MB} | {X MB} | {X MB} | {total} | {limit} | |
| Bandwidth/hr | {X MB} | {X MB} | {X MB} | {total} | {limit} | |
| Memory | {X MB} | {X MB} | {X MB} | {total} | {limit} | |

## Throughput Bottleneck Analysis

| Component | Recommended Option | Max Throughput | Source |
|-----------|-------------------|---------------|--------|
| {Component A} | {option} | {X req/s} | {citation} |
| {Component B} | {option} | {X req/s} | {citation} |
| **System Bottleneck** | {lowest} | **{X req/s}** | |

**Constraint**: C-{XX} — Required throughput: {limit}
**Verdict**: {PASS / WARNING / FAIL}

## Summary

| ID | Constraint | Threshold | Combined Actual | Headroom | Verdict |
|----|-----------|-----------|----------------|----------|---------|
| C-{XX} | {name} | {limit} | {actual} | {margin} | {verdict} |

**Key Findings**: {1-3 sentences on overall performance feasibility}
```

### Category 2: Cost Feasibility (`02-cost-feasibility.md`)

```markdown
# Cost Feasibility Validation — {Idea Name}

**Category**: 2 of 4
**Date**: {YYYY-MM-DD}
**Constraints Checked**: {count}
**Violations**: {count}

## Context

{Brief description of budget context, funding stage, and what cost data was available}

## Total Year 1 Cost Aggregation

### Technical Options

| Capability | Recommended Option | Monthly Cost | Setup Cost | Year 1 TCO | Source |
|-----------|-------------------|-------------|-----------|------------|--------|
| {Cap A} | {option} | ${X} | ${X} | ${X} | {file ref} |
| {Cap B} | {option} | ${X} | ${X} | ${X} | {file ref} |
| **Subtotal** | | **${X}** | **${X}** | **${X}** | |

### Supporting Systems (if exists)

| System | Recommended Option | Monthly Cost | Setup Cost | Year 1 TCO | Source |
|--------|-------------------|-------------|-----------|------------|--------|
| {Sys A} | {option} | ${X} | ${X} | ${X} | {file ref} |
| **Subtotal** | | **${X}** | **${X}** | **${X}** | |

### Marketing (if exists)

| Phase | Budget | Source |
|-------|--------|--------|
| Year 1 Total | ${X} | {file ref} |

### Operational Costs

| Item | Monthly | Year 1 | Source |
|------|---------|--------|--------|
| {item} | ${X} | ${X} | {estimate/source} |

### Grand Total

| Domain | Year 1 TCO |
|--------|------------|
| Technical Options | ${X} |
| Supporting Systems | ${X} |
| Marketing | ${X} |
| Operational | ${X} |
| **GRAND TOTAL** | **${X}** |

## Budget Envelope Validation

| Tier | Envelope (Year 1) | Actual (Year 1) | Headroom | Verdict |
|------|-------------------|-----------------|----------|---------|
| Bootstrap | ${X} | ${X} | ${+/-X} | {verdict} |
| Growth | ${X} | ${X} | ${+/-X} | {verdict} |
| Scale | ${X} | ${X} | ${+/-X} | {verdict} |

## Cost-to-Revenue Ratio

| Metric | Value | Threshold | Verdict |
|--------|-------|-----------|---------|
| Year 1 cost / Year 1 cumulative revenue | {X%} | < 30% (bootstrap) / < 50% (any) / < 80% (block) | {verdict} |

## Month 1 Cash Requirement

| Item | Month 1 Cost |
|------|-------------|
| Setup/one-time costs | ${X} |
| First month subscriptions | ${X} |
| **Total Month 1** | **${X}** |

**Bootstrap monthly budget**: ${X}
**Verdict**: {PASS / WARNING / FAIL}

## Hidden Cost Detection

| Cost Item | Found In | Included in Pricing Strategy? | Monthly Impact | Action |
|-----------|----------|------------------------------|---------------|--------|
| {item} | {source file} | Yes/No | ${X} | {include in cost-to-serve / flag} |

## Summary

| ID | Constraint | Threshold | Combined Actual | Headroom | Verdict |
|----|-----------|-----------|----------------|----------|---------|
| C-{XX} | {name} | {limit} | {actual} | {margin} | {verdict} |

**Key Findings**: {1-3 sentences on overall cost feasibility}
```

### Category 3: Technical Compatibility (`03-technical-compatibility.md`)

```markdown
# Technical Compatibility Validation — {Idea Name}

**Category**: 3 of 4
**Date**: {YYYY-MM-DD}
**Issues Found**: {count}
**Critical/High**: {count}

## Context

{Brief description of technical stack landscape and what was checked}

## Technology Stack Map

| Capability/System | Recommended Option | Language/Runtime | Framework | Database | Deployment |
|-------------------|-------------------|-----------------|-----------|----------|------------|
| {Cap A} | {option} | {lang} | {framework} | {db} | {env} |
| {Cap B} | {option} | {lang} | {framework} | {db} | {env} |
| {Sys A} | {option} | {lang} | {framework} | {db} | {env} |

## Compatibility Checks

### Runtime & Language Compatibility

{Analysis of runtime conflicts across options within same deployment units}

**Conflicts found**: {count}
{Detail each conflict with CV-XX ID}

### Database Compatibility

{Analysis of database assumption conflicts}

**Conflicts found**: {count}

### Authentication Consistency

{Analysis of auth mechanism consistency across all options}

**Conflicts found**: {count}

### API Protocol Consistency

{Analysis of protocol mismatches}

**Conflicts found**: {count}

### Compliance Spanning

{For each compliance requirement (PCI, PDPL, HIPAA, etc.), verify ALL options in the data path are compliant}

| Compliance Req | Options in Scope | Compliant | Non-Compliant | Verdict |
|---------------|-----------------|-----------|---------------|---------|
| {PCI-DSS} | {list} | {list} | {list or "none"} | {PASS/FAIL} |

### Version & Dependency Conflicts

{Known incompatibilities between specific versions}

**Conflicts found**: {count}

### Data Flow Consistency

{Trace data through capabilities — verify format compatibility}

**Conflicts found**: {count}

### Deployment Environment Conflicts

{Check that all options can run in same infrastructure}

**Conflicts found**: {count}

## Issues Register

| ID | Issue | Options Involved | Severity | Resolution | Effort |
|----|-------|-----------------|----------|------------|--------|
| CV-01 | {description} | {options} | {severity} | {resolution} | {effort} |

**Key Findings**: {1-3 sentences on overall technical compatibility}
```

### Category 4: Capacity & Timeline (`04-capacity-timeline.md`)

```markdown
# Capacity & Timeline Validation — {Idea Name}

**Category**: 4 of 4
**Date**: {YYYY-MM-DD}
**Constraints Checked**: {count}
**Violations**: {count}

## Context

{Brief description of team composition, timeline, and what was checked}

## Development Effort Aggregation

### Technical Options

| Capability | Recommended Option | Dev Effort (person-weeks) | Skills Required | Source |
|-----------|-------------------|--------------------------|-----------------|--------|
| {Cap A} | {option} | {N} | {skills} | {file ref} |
| **Subtotal** | | **{N}** | | |

### Supporting Systems

| System | Recommended Option | Setup Effort (person-weeks) | Ongoing (hrs/month) | Source |
|--------|-------------------|----------------------------|--------------------| --------|
| {Sys A} | {option} | {N} | {N} | {file ref} |
| **Subtotal** | | **{N}** | **{N}** | |

### Integration & Testing Overhead

| Item | Effort (person-weeks) | Rationale |
|------|-----------------------|-----------|
| Cross-capability integration | {N} | {X}% of component development (industry benchmark: 20-40%) |
| End-to-end testing | {N} | {rationale} |
| DevOps/CI/CD setup | {N} | {rationale} |
| **Subtotal** | **{N}** | |

### Grand Total

| Domain | Effort (person-weeks) |
|--------|-----------------------|
| Technical Options | {N} |
| Supporting Systems | {N} |
| Integration & Testing | {N} |
| **GRAND TOTAL** | **{N}** |

## Team Capacity Analysis

| Metric | Value | Source |
|--------|-------|--------|
| Team size | {N} developers | IDEA.md |
| Available hours/week per dev | {N} (full-time: 40, part-time: {X}) | IDEA.md |
| Timeline | {N} weeks | BRD |
| **Total available capacity** | **{N} person-weeks** | |
| **Total required effort** | **{N} person-weeks** | |
| **Capacity ratio** | **{X.Xx}** | Available / Required |

**Constraint**: C-{XX} — Development timeline
**Threshold**: {N} weeks
**Required (critical path)**: {N} weeks
**Verdict**: {PASS / WARNING / FAIL}

## Critical Path Analysis

```
{Visual critical path showing dependencies}
Week 1-2:  [Auth/RBAC] ──────────────────┐
Week 1-3:  [Database Schema] ────────────┤
Week 3-6:  [Core Feature A] ◄────────────┤
Week 3-5:  [Supporting Sys B] (parallel) │
Week 6-8:  [Core Feature B] ◄────────────┘
Week 8-10: [Integration Testing]
Week 10-11: [Deploy & QA]
CRITICAL PATH: 11 weeks
```

**Minimum time to completion** (regardless of team size): {N} weeks
**Available timeline**: {N} weeks
**Verdict**: {PASS / WARNING / FAIL}

## Skill Gap Analysis

| Required Skill | Needed For | Team Coverage | Gap? | Mitigation |
|---------------|-----------|---------------|------|------------|
| {skill} | {capabilities} | {who has it} | Yes/No | {hire / learn / outsource} |

## Post-Launch Maintenance Burden

| Domain | Monthly Hours | Annual Hours |
|--------|-------------|-------------|
| Infrastructure maintenance | {N} | {N} |
| Supporting systems | {N} | {N} |
| Customer support (projected) | {N} | {N} |
| Bug fixes & patches | {N} | {N} |
| **TOTAL** | **{N}** | **{N}** |

**Available post-launch capacity**: {N} hours/month
**Verdict**: {PASS / WARNING / FAIL}

## Summary

| ID | Constraint | Threshold | Combined Actual | Headroom | Verdict |
|----|-----------|-----------|----------------|----------|---------|
| C-{XX} | {name} | {limit} | {actual} | {margin} | {verdict} |

**Key Findings**: {1-3 sentences on overall capacity and timeline feasibility}
```

---

## Research Quality Standards

- **Real data preferred**: Use actual vendor documentation for latency, throughput, and cost figures where available
- **Industry benchmarks**: When specific data is unavailable, research industry benchmarks for similar architectures and cite sources
- **Calculations shown**: Every combined metric must show its calculation (individual contributions → sum → comparison to threshold)
- **Conservative estimates**: When estimating, use conservative (pessimistic) values — better to flag a false WARNING than miss a real FAIL
- **Distinguish measured vs. estimated**: Clearly mark when a value comes from vendor documentation vs. industry benchmarks vs. engineering estimates
