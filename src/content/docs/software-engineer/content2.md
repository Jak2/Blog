Exactly. **STAR is the kind of thing I should have included.**

You aren't asking only for *software architecture patterns*. You're asking for the **entire pattern library an engineer uses to think, communicate, build, test, debug, operate, and make decisions**.

That includes frameworks like STAR, RACI, 5 Whys, SWOT, MoSCoW, INVEST, OODA, PDCA, etc.—even though they aren't "software design patterns."

A better taxonomy is:

```text
ENGINEER'S KNOWLEDGE SYSTEM
│
├── A. THINKING & REASONING FRAMEWORKS
├── B. PROBLEM-SOLVING FRAMEWORKS
├── C. COMMUNICATION FRAMEWORKS
├── D. REQUIREMENTS & PRODUCT FRAMEWORKS
├── E. SOFTWARE PRINCIPLES
├── F. DESIGN PRINCIPLES
├── G. ARCHITECTURAL STYLES
├── H. ARCHITECTURAL PATTERNS
├── I. DESIGN PATTERNS
├── J. INTEGRATION PATTERNS
├── K. API & CONTRACT PATTERNS
├── L. DATA & DATABASE PATTERNS
├── M. DISTRIBUTED-SYSTEM PATTERNS
├── N. CONCURRENCY PATTERNS
├── O. SECURITY PATTERNS
├── P. TESTING PATTERNS
├── Q. DEBUGGING PATTERNS
├── R. PERFORMANCE PATTERNS
├── S. RELIABILITY PATTERNS
├── T. DEVOPS / CI-CD PATTERNS
├── U. OBSERVABILITY PATTERNS
├── V. INCIDENT / OPERATIONS FRAMEWORKS
├── W. PROJECT / DELIVERY FRAMEWORKS
├── X. CODE REVIEW / ENGINEERING PRACTICES
├── Y. AI / LLM / AGENT PATTERNS
├── Z. ANTI-PATTERNS & FAILURE MODES
└── AA. ENGINEERING HEURISTICS & LAWS
```

And **STAR belongs in C — Communication Frameworks.**

Here is the expanded version of what I think you're actually looking for.

---

# 1. COMMUNICATION FRAMEWORKS

These are essential because an engineer doesn't just write code.

You explain:

* why you made a decision
* what went wrong
* what you built
* what you learned
* why something should be changed
* why a production incident happened
* what you need from another team

### STAR

**Situation → Task → Action → Result**

Useful for:

* interviews
* explaining projects
* behavioral questions
* incident explanations
* performance reviews

### STAR-L

**Situation → Task → Action → Result → Learning**

Adds what you learned.

### CAR

**Challenge → Action → Result**

Useful when STAR feels too verbose.

### PAR

**Problem → Action → Result**

Excellent for explaining engineering accomplishments.

### SAR

**Situation → Action → Result**

Another concise alternative.

### PREP

**Point → Reason → Example → Point**

Excellent for technical communication.

### BLUF

**Bottom Line Up Front**

Start with the conclusion.

Instead of:

> I investigated the API, checked logs, checked Redis...

Say:

> **The API is failing because Redis connections are exhausted.**

Then explain evidence.

### Pyramid Principle

```text
Conclusion
   ↓
Supporting arguments
   ↓
Evidence
```

### MECE

**Mutually Exclusive, Collectively Exhaustive**

Useful for structuring investigations and explanations.

### SBAR

**Situation → Background → Assessment → Recommendation**

Extremely useful for incident/escalation communication.

### A3 Thinking

Structured problem-solving:

```text
Problem
Background
Current condition
Root cause
Countermeasures
Implementation
Follow-up
```

---

# 2. PROBLEM-SOLVING FRAMEWORKS

These are things you should instinctively reach for when something is wrong.

### 5 Whys

Keep asking:

> Why?

until you reach the underlying cause.

### Fishbone / Ishikawa

Categories often include:

```text
People
Process
Technology
Environment
Measurement
Materials
```

### Root Cause Analysis

RCA.

### Fault Tree Analysis

Start with a failure and work backward toward causes.

### FMEA

**Failure Mode and Effects Analysis**

Evaluate:

* severity
* occurrence
* detectability
* risk

### Kepner-Tregoe

Structured:

* Situation appraisal
* Problem analysis
* Decision analysis
* Potential problem analysis

### OODA Loop

**Observe → Orient → Decide → Act**

Excellent for:

* incidents
* debugging
* rapidly changing environments

### PDCA

**Plan → Do → Check → Act**

Continuous improvement.

### DMAIC

**Define → Measure → Analyze → Improve → Control**

Six Sigma.

### Double Diamond

```text
Discover
   ↓
Define
   ↓
Develop
   ↓
Deliver
```

---

# 3. DECISION-MAKING FRAMEWORKS

### Decision Matrix

Evaluate alternatives against weighted criteria.

### Pros / Cons

Simple but useful.

### Cost-Benefit Analysis

### Opportunity Cost

What are you giving up?

### Expected Value

```text
Expected Value =
Probability × Impact
```

### Risk Matrix

```text
Probability × Impact
```

### RICE

**Reach × Impact × Confidence ÷ Effort**

### ICE

**Impact × Confidence ÷ Effort**

### DACI

```text
Driver
Approver
Contributors
Informed
```

### RACI

```text
Responsible
Accountable
Consulted
Informed
```

### RAPID

Decision roles:

* Recommend
* Agree
* Perform
* Input
* Decide

---

# 4. REQUIREMENTS FRAMEWORKS

### INVEST

Good user stories are:

**Independent
Negotiable
Valuable
Estimable
Small
Testable**

### SMART

Goals:

**Specific
Measurable
Achievable
Relevant
Time-bound**

### MoSCoW

```text
Must
Should
Could
Won't
```

### User Story

```text
As a [user]
I want [capability]
So that [value]
```

### Use Case

```text
Actor
Precondition
Trigger
Main flow
Alternative flow
Exception
Postcondition
```

### Given / When / Then

```text
Given ...
When ...
Then ...
```

Extremely useful for acceptance criteria and BDD.

### Example Mapping

```text
Story
 ↓
Rules
 ↓
Examples
 ↓
Questions
```

---

# 5. PRODUCT / USER THINKING

### 5 Whys

Why does the user actually need this?

### Jobs To Be Done

Focus on the job the user is hiring the product to perform.

### User Journey Mapping

### Customer Journey Mapping

### Empathy Map

```text
Says
Thinks
Does
Feels
```

### Kano Model

Features categorized by:

* Must-be
* Performance
* Attractive
* Indifferent
* Reverse

### MVP

Minimum Viable Product.

### MLP

Minimum Lovable Product.

### North Star Metric

Primary measure of product value.

---

# 6. SOFTWARE ENGINEERING PRINCIPLES

Now we're back to classic engineering.

### SOLID

### DRY

### KISS

### YAGNI

### SoC

Separation of Concerns.

### POLA

Principle of Least Astonishment.

### LoD

Law of Demeter.

### OCP

Open/Closed Principle.

### Dependency Inversion

### Composition over Inheritance

### Encapsulation

### Information Hiding

### Least Privilege

### Fail Fast

### Fail Safe

### Secure by Default

### Explicit over Implicit

### Convention over Configuration

### Single Responsibility

### Single Source of Truth

---

# 7. ARCHITECTURE PATTERNS

The previous list still applies:

* Layered
* N-Tier
* Hexagonal
* Ports & Adapters
* Onion
* Clean Architecture
* Vertical Slice
* Modular Monolith
* Microservices
* SOA
* Event-Driven
* Event Sourcing
* CQRS
* Pipe-and-Filter
* Microkernel
* Space-Based
* Serverless
* Actor
* Reactive
* Cell-Based

---

# 8. CLASSICAL DESIGN PATTERNS

### Creational

* Factory Method
* Abstract Factory
* Builder
* Prototype
* Singleton

### Structural

* Adapter
* Bridge
* Composite
* Decorator
* Facade
* Flyweight
* Proxy

### Behavioral

* Chain of Responsibility
* Command
* Interpreter
* Iterator
* Mediator
* Memento
* Observer
* State
* Strategy
* Template Method
* Visitor

---

# 9. SYSTEM INTEGRATION PATTERNS

This is another category I would explicitly add.

From Enterprise Integration Patterns:

* Message Channel
* Point-to-Point Channel
* Publish-Subscribe Channel
* Message Filter
* Message Router
* Content-Based Router
* Recipient List
* Splitter
* Aggregator
* Resequencer
* Translator
* Normalizer
* Content Enricher
* Claim Check
* Message Broker
* Guaranteed Delivery
* Idempotent Receiver
* Dead Letter Channel
* Retry
* Competing Consumers
* Polling Consumer
* Event Message
* Command Message
* Document Message

---

# 10. API PATTERNS

Know:

* REST
* GraphQL
* gRPC
* RPC
* WebSockets
* SSE
* Webhooks
* API Gateway
* BFF
* Aggregator
* Facade
* Adapter

And:

* Pagination
* Cursor pagination
* Offset pagination
* Filtering
* Sorting
* Searching
* Projection
* Bulk APIs
* Batch APIs
* Idempotency keys
* Optimistic concurrency
* ETags
* Conditional requests
* Rate limiting
* Throttling
* API versioning
* Deprecation

---

# 11. CONTRACT THINKING

Know:

### Contract-First Development

Define the contract before implementation.

### Consumer-Driven Contracts

Consumers specify expectations.

### Schema Evolution

Understand:

* backward compatibility
* forward compatibility
* full compatibility

### Contract Testing

Verify producer/consumer compatibility.

### OpenAPI

API contract description.

### JSON Schema

Data contract validation.

---

# 12. TESTING FRAMEWORKS

Not merely "unit vs integration."

### Testing Pyramid

### Testing Trophy

### Testing Diamond

### Shift Left

Test earlier.

### Shift Right

Test in production-like/production environments.

### TDD

**Red → Green → Refactor**

### BDD

**Given → When → Then**

### ATDD

Acceptance Test Driven Development.

### Property-Based Testing

Test properties rather than individual examples.

### Mutation Testing

Intentionally mutate code to evaluate test quality.

### Fuzz Testing

Feed unexpected inputs.

### Chaos Testing

Intentionally introduce failures.

### Golden Master Testing

Capture expected behavior before changing legacy systems.

### Differential Testing

Compare implementations.

### Metamorphic Testing

Test relationships between inputs/outputs.

---

# 13. DEBUGGING FRAMEWORKS

This deserves much more than "look at the logs."

### Scientific Method

```text
Observe
Hypothesize
Predict
Experiment
Measure
Conclude
```

### Binary Search Debugging

Find the first bad change.

### Git Bisect

Automate binary search across commits.

### Divide and Conquer

Reduce the problem space.

### Minimal Reproduction

Remove everything unnecessary.

### Differential Debugging

Compare:

```text
Working
vs
Broken
```

### Time Travel Debugging

Inspect previous execution state where supported.

### Five Whys

Find underlying cause.

### Fault Isolation

Determine:

```text
Application?
Database?
Network?
Dependency?
Infrastructure?
Configuration?
Data?
```

---

# 14. INCIDENT MANAGEMENT

You should know:

### Incident Response Lifecycle

```text
Detect
↓
Triage
↓
Contain
↓
Mitigate
↓
Resolve
↓
Verify
↓
Communicate
↓
Learn
```

### Incident Command System

Roles such as:

* Incident Commander
* Operations
* Communications
* Subject Matter Experts

### Blameless Postmortem

Focus on:

```text
What happened?
Why?
Why wasn't it detected?
Why wasn't it prevented?
How do we prevent recurrence?
```

### Timeline Analysis

Build:

```text
T-30
T-10
T0
T+5
T+20
...
```

---

# 15. RELIABILITY FRAMEWORKS

### SRE

Know:

* SLI
* SLO
* SLA
* Error Budget

### Four Golden Signals

```text
Latency
Traffic
Errors
Saturation
```

### RED

```text
Rate
Errors
Duration
```

### USE

```text
Utilization
Saturation
Errors
```

### Error Budget

How much unreliability you can afford.

---

# 16. SECURITY FRAMEWORKS

### CIA Triad

```text
Confidentiality
Integrity
Availability
```

### STRIDE

```text
Spoofing
Tampering
Repudiation
Information Disclosure
Denial of Service
Elevation of Privilege
```

### Defense in Depth

Multiple layers of protection.

### Zero Trust

Never implicitly trust.

### Least Privilege

Minimum necessary access.

### Attack Trees

Model attack paths.

### Secure SDLC

Security throughout development.

---

# 17. PERFORMANCE THINKING

### Amdahl's Law

### Little's Law

### Pareto Principle

### Big-O

### Queueing Theory

### Load Testing

### Stress Testing

### Spike Testing

### Soak Testing

### Capacity Testing

### Benchmarking

### Profiling

### Flame Graphs

### Bottleneck Analysis

---

# 18. DISTRIBUTED SYSTEM THEORY

You should recognize:

### CAP

Consistency
Availability
Partition tolerance

### PACELC

If Partition:

```text
Availability vs Consistency
```

Else:

```text
Latency vs Consistency
```

### FLP Impossibility

### Fallacies of Distributed Computing

### Brewer's CAP theorem

### Lamport Logical Clocks

### Vector Clocks

### Raft

### Paxos

### Quorum

### Linearizability

### Eventual Consistency

---

# 19. DATABASE THEORY

### ACID

### BASE

Basically Available
Soft state
Eventually consistent

### Normal Forms

* 1NF
* 2NF
* 3NF
* BCNF
* 4NF
* 5NF

### Transaction Isolation

### MVCC

### Optimistic Concurrency

### Pessimistic Concurrency

### Two-Phase Commit

### Saga

### Event Sourcing

---

# 20. SOFTWARE DEVELOPMENT METHODOLOGIES

Know:

* Waterfall
* Agile
* Scrum
* Kanban
* Extreme Programming
* Lean
* Crystal
* Spiral
* V-Model
* Iterative
* Incremental
* RAD
* Prototype Model
* DevOps
* DevSecOps
* GitOps
* Continuous Delivery
* Continuous Deployment

---

# 21. PROJECT MANAGEMENT

### RACI

### RAID

```text
Risks
Assumptions
Issues
Dependencies
```

### RAID Log

### Critical Path Method

### PERT

### Gantt

### WBS

Work Breakdown Structure.

### Milestones

### Dependency Mapping

### Stakeholder Mapping

### Risk Register

---

# 22. ENGINEERING DESIGN DOCUMENTS

Know when to produce:

### RFC

Request for Comments.

### ADR

Architecture Decision Record.

### PRD

Product Requirements Document.

### BRD

Business Requirements Document.

### FRD

Functional Requirements Document.

### TRD

Technical Requirements Document.

### HLD

High-Level Design.

### LLD

Low-Level Design.

### Threat Model

### Test Plan

### Runbook

### Postmortem

### Design Review

---

# 23. ARCHITECTURE DECISION FRAMEWORKS

### ADR

```text
Context
Decision
Alternatives
Consequences
```

### Architecture Trade-off Analysis

### ATAM

Architecture Tradeoff Analysis Method.

Evaluate quality attributes and trade-offs.

### Architecture Fitness Functions

Automated checks that prevent architectural degradation.

---

# 24. AI / AGENT ENGINEERING

And this is now another huge category.

Know:

### LLM patterns

* Prompt chaining
* Routing
* Parallelization
* Reflection
* Tool use
* Structured output
* Retrieval
* RAG
* Query rewriting
* Reranking
* Context compression
* Model routing
* Fallback models

### Agent patterns

* ReAct
* Plan-and-Execute
* Supervisor
* Worker
* Router
* Hierarchical agents
* Sequential agents
* Parallel agents
* Human-in-the-loop
* Reflection
* Critic
* Evaluator
* Planner
* Executor

### Agent reliability

* Guardrails
* Tool permissions
* Sandboxing
* Timeouts
* Budget limits
* Max iterations
* State machines
* Evaluation
* Tracing
* Replay
* Deterministic components

---

# 25. AI EVALUATION

Know:

* Golden datasets
* Evaluation harnesses
* Regression suites
* LLM-as-Judge
* Human evaluation
* Pairwise evaluation
* Task success
* Faithfulness
* Groundedness
* Relevance
* Tool-call correctness
* Structured-output correctness
* Hallucination rate
* Cost per task
* Latency per task

---

# 26. ANTI-PATTERNS

This is **extremely important**.

Knowing good patterns without knowing bad patterns is dangerous.

Know:

* God Object
* God Class
* God Function
* Big Ball of Mud
* Distributed Monolith
* Singleton Abuse
* Service Locator
* Golden Hammer
* Premature Optimization
* Premature Abstraction
* Overengineering
* Underengineering
* Spaghetti Code
* Copy-Paste Programming
* Shotgun Surgery
* Lava Flow
* Vendor Lock-in
* Death by a Thousand Microservices
* Chatty API
* Shared Database
* Distributed Shared State
* Circular Dependency
* Tight Coupling
* Temporal Coupling
* Retry Storm
* Thundering Herd
* Cache Stampede
* Cascading Failure
* Single Point of Failure
* Big Bang Deployment
* Big Bang Rewrite
* Flag Explosion
* Log Spam
* Exception Swallowing
* Cargo Cult Programming

---

# 27. COGNITIVE BIASES ENGINEERS SHOULD KNOW

This is the category that was **completely missing from my previous answer**.

Engineers make reasoning mistakes too.

Know:

* Confirmation Bias
* Anchoring Bias
* Availability Bias
* Survivorship Bias
* Sunk Cost Fallacy
* Planning Fallacy
* Dunning-Kruger Effect
* Recency Bias
* Status Quo Bias
* Groupthink
* Authority Bias
* Optimism Bias
* Loss Aversion
* Fundamental Attribution Error
* Availability Heuristic
* Outcome Bias
* Hindsight Bias
* Selection Bias

Example:

> "We've always done it this way."

That's not an engineering argument.

---

# 28. SYSTEM THINKING

Understand:

### First-Order Thinking

"What happens?"

### Second-Order Thinking

"What happens after that?"

### Systems Thinking

"What feedback loops does this create?"

Know:

* Feedback loops
* Positive feedback
* Negative feedback
* Emergent behavior
* Bottlenecks
* Constraints
* Leverage points
* Coupling
* Complex adaptive systems
* Local vs global optimization
* Unintended consequences

---

# 29. LAWS / PRINCIPLES / HEURISTICS

Your mental toolbox should include:

### Conway's Law

Architecture tends to reflect organizational communication.

### Hyrum's Law

Every observable behavior eventually becomes a dependency.

### Brooks's Law

Adding people to a late software project can make it later.

### Gall's Law

Complex systems evolve from simpler working systems.

### Postel's Law

Be cautious with it; permissiveness can cause security/interoperability problems.

### Parkinson's Law

Work expands to fill available time.

### Murphy's Law

Anything that can fail eventually will.

### Amdahl's Law

Parallelization has limits.

### Little's Law

Relationship between throughput, latency, and work in a stable system.

### Goodhart's Law

When a measure becomes a target, it can cease to be a good measure.

### Campbell's Law

The more a quantitative indicator is used for decision-making, the more it becomes subject to corruption.

### Chesterton's Fence

Understand something before removing it.

### Pareto Principle

A small number of causes often produce a large proportion of effects.

### Second-System Effect

The second version of a system can become excessively complex.

### Worse Is Better

Simple, usable systems can beat theoretically superior but excessively complex designs.

---

# 30. THE ENGINEER'S UNIVERSAL CHECKLIST

Ultimately, I would want you to develop an automatic mental reflex.

Whenever someone gives you a problem:

```text
                    PROBLEM
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
   REQUIREMENTS     CONTEXT       CONSTRAINTS
        │              │              │
        └──────────────┼──────────────┘
                       ↓
                   TRADE-OFFS
                       ↓
                    DESIGN
                       ↓
       ┌───────────────┼────────────────┐
       ↓               ↓                ↓
     DATA             API            DEPENDENCY
       │               │                │
       └───────────────┼────────────────┘
                       ↓
                  IMPLEMENTATION
                       ↓
                     TEST
                       ↓
                 SECURITY CHECK
                       ↓
                PERFORMANCE CHECK
                       ↓
              FAILURE-MODE ANALYSIS
                       ↓
                  OBSERVABILITY
                       ↓
                    DEPLOY
                       ↓
                   OPERATE
                       ↓
                  MEASURE
                       ↓
                   LEARN
                       ↓
                  REFACTOR
```

And when **communicating** the result:

```text
What happened?
    ↓
STAR / PAR / CAR
    ↓
What evidence?
    ↓
What decision?
    ↓
Why?
    ↓
What alternatives?
    ↓
What trade-offs?
    ↓
What happens next?
```

---

## So your original request needs to be reframed

You weren't really asking:

> **"Give me software architecture and design patterns."**

You're asking for:

> **"Give me the complete vocabulary, frameworks, patterns, principles, theories, heuristics, methodologies, mental models, laws, practices, and anti-patterns that a world-class software engineer should recognize."**

That's a **much bigger and much more useful project**.

And **STAR, 5 Whys, RACI, PREP, MECE, OODA, PDCA, FMEA, RCA, STRIDE, INVEST, SMART, MoSCoW, RICE, TDD, BDD, ADR, ATAM, CAP, SOLID, GoF, DDD, CQRS, Saga, Circuit Breaker, etc. should all live in the same master map—but categorized by *what problem they help you solve*.**

The goal shouldn't be memorization.

It should eventually become:

> **See problem → recognize pattern → choose framework → apply → evaluate trade-offs.**

That's the actual **engineering instinct** you're looking for.
