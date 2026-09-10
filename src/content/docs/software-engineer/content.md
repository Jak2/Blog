Yes. If you want the **“eyes and ears” of an engineer**—the mental library you should carry when designing, coding, reviewing, testing, debugging, deploying, and operating software—then don't think of this as a list of technologies.

Think of it as a **Software Engineering Knowledge Map**.

There is no literally finite list containing “everything the world has to offer,” but we can build a taxonomy broad enough that almost every important engineering concept has a home.

# The Software Engineer's Mental Map

```text
SOFTWARE ENGINEERING
│
├── 01. FUNDAMENTAL PRINCIPLES
├── 02. SOFTWARE DESIGN PRINCIPLES
├── 03. ARCHITECTURAL STYLES
├── 04. ARCHITECTURAL PATTERNS
├── 05. DESIGN PATTERNS
├── 06. DOMAIN & SYSTEM MODELING
├── 07. API & CONTRACT DESIGN
├── 08. DEPENDENCY INJECTION
├── 09. DATA & DATABASE DESIGN
├── 10. DISTRIBUTED SYSTEMS
├── 11. CONCURRENCY & PARALLELISM
├── 12. PERFORMANCE ENGINEERING
├── 13. SECURITY ENGINEERING
├── 14. RELIABILITY & RESILIENCE
├── 15. ERROR HANDLING
├── 16. DEBUGGING & DIAGNOSTICS
├── 17. TESTING
├── 18. CODE QUALITY
├── 19. VERSION CONTROL
├── 20. CI/CD & DEVOPS
├── 21. OBSERVABILITY
├── 22. INFRASTRUCTURE & CLOUD
├── 23. EVENT-DRIVEN SYSTEMS
├── 24. MESSAGING
├── 25. CACHING
├── 26. SEARCH & INDEXING
├── 27. AI / LLM / AGENT ENGINEERING
├── 28. UI / FRONTEND ENGINEERING
├── 29. MOBILE ENGINEERING
├── 30. SOFTWARE DEVELOPMENT METHODOLOGIES
├── 31. REQUIREMENTS ENGINEERING
├── 32. CODE REVIEW
├── 33. REFACTORING
├── 34. LEGACY SYSTEMS
├── 35. DOCUMENTATION
├── 36. ENGINEERING ECONOMICS
├── 37. SYSTEM THINKING
├── 38. MATHEMATICAL / CS FOUNDATIONS
└── 39. ENGINEERING HEURISTICS
```

Below is the **master checklist** I'd want an engineer to eventually recognize by name and understand conceptually.

---

# 1. FUNDAMENTAL ENGINEERING PRINCIPLES

These are more important than frameworks.

### Core principles

* KISS — Keep It Simple, Stupid
* DRY — Don't Repeat Yourself
* YAGNI — You Aren't Gonna Need It
* SOLID
* Separation of Concerns
* Principle of Least Astonishment
* Principle of Least Knowledge
* Law of Demeter
* Composition over Inheritance
* Program to an Interface
* Encapsulate What Varies
* Favor Immutability
* Explicit over Implicit
* Convention over Configuration
* Fail Fast
* Fail Safe
* Secure by Default
* Default Deny
* Least Privilege
* Single Source of Truth
* Minimize Coupling
* Maximize Cohesion
* Information Hiding
* Locality of Behavior
* Idempotency
* Determinism
* Reversibility
* Observability
* Traceability
* Testability
* Operability
* Evolvability

### Engineering trade-offs

Always think:

```text
Simplicity
    vs
Flexibility

Performance
    vs
Maintainability

Consistency
    vs
Availability

Latency
    vs
Throughput

Cost
    vs
Reliability

Abstraction
    vs
Complexity

DRY
    vs
Premature abstraction

Strong typing
    vs
Development velocity

Normalization
    vs
Read performance

Sync
    vs
Async
```

A good engineer doesn't blindly follow principles.

**They understand when to violate them.**

---

# 2. SOLID

Know these cold.

### S — Single Responsibility Principle

A module should have one reason to change.

### O — Open/Closed Principle

Open for extension, closed for modification.

### L — Liskov Substitution Principle

Subtypes should be substitutable for their base types.

### I — Interface Segregation Principle

Don't force clients to depend on interfaces they don't use.

### D — Dependency Inversion Principle

High-level policy shouldn't depend directly on low-level implementation details.

---

# 3. COUPLING & COHESION

Understand:

### Coupling

* Tight coupling
* Loose coupling
* Temporal coupling
* Data coupling
* Control coupling
* Content coupling
* Common coupling
* External coupling

### Cohesion

* Functional cohesion
* Sequential cohesion
* Communicational cohesion
* Procedural cohesion
* Temporal cohesion
* Logical cohesion
* Coincidental cohesion

The general goal:

```text
High cohesion
        +
Low coupling
        =
Healthy architecture
```

---

# 4. ARCHITECTURAL STYLES

Know these as different ways of organizing systems.

* Monolith
* Modular Monolith
* Distributed Monolith
* Microservices
* SOA
* Serverless
* Client-Server
* Peer-to-Peer
* Layered Architecture
* N-Tier Architecture
* Pipe-and-Filter
* Event-Driven Architecture
* Event-Sourced Architecture
* Data-Centric Architecture
* Component-Based Architecture
* Plugin Architecture
* Microkernel Architecture
* Space-Based Architecture
* Hexagonal Architecture
* Ports and Adapters
* Onion Architecture
* Clean Architecture
* Vertical Slice Architecture
* Feature-Based Architecture
* Service-Based Architecture
* Cell-Based Architecture
* Actor Model
* Reactive Architecture
* CQRS
* Command-Based Architecture
* Message-Oriented Architecture

---

# 5. ARCHITECTURAL PATTERNS

## Layered

```text
Presentation
     ↓
Application
     ↓
Domain
     ↓
Infrastructure
```

## Hexagonal

```text
          External World
               │
        ┌──────▼──────┐
        │ Application │
        │    Core     │
        └──────┬──────┘
        Ports / Adapters
```

## Onion

```text
Infrastructure
     ↓
Application
     ↓
Domain
```

Dependencies point inward.

## Clean Architecture

Know:

* Entities
* Use Cases
* Interface Adapters
* Frameworks & Drivers
* Dependency Rule

## CQRS

Separate:

```text
Command → Write model

Query → Read model
```

## Event Sourcing

State is reconstructed from events.

```text
Command
   ↓
Event
   ↓
Event Store
   ↓
State
```

## Event-Driven Architecture

* Event Notification
* Event-Carried State Transfer
* Event Collaboration
* Event Streaming

## Microservices patterns

Know:

* API Gateway
* Backend for Frontend
* Service Discovery
* Sidecar
* Ambassador
* Strangler Fig
* Saga
* Circuit Breaker
* Bulkhead
* Retry
* Timeout
* Outbox
* Inbox
* Distributed Transaction
* Shared Database
* Database per Service
* Service Mesh
* Aggregator
* Chained Services

---

# 6. CLASSICAL GOF DESIGN PATTERNS

You should recognize all **23 Gang of Four patterns**.

## Creational

### 1. Factory Method

### 2. Abstract Factory

### 3. Builder

### 4. Prototype

### 5. Singleton

---

## Structural

### 6. Adapter

### 7. Bridge

### 8. Composite

### 9. Decorator

### 10. Facade

### 11. Flyweight

### 12. Proxy

---

## Behavioral

### 13. Chain of Responsibility

### 14. Command

### 15. Interpreter

### 16. Iterator

### 17. Mediator

### 18. Memento

### 19. Observer

### 20. State

### 21. Strategy

### 22. Template Method

### 23. Visitor

---

# 7. OTHER IMPORTANT DESIGN PATTERNS

Don't stop at GoF.

### Enterprise patterns

* Repository
* Unit of Work
* Data Mapper
* Active Record
* Identity Map
* Lazy Load
* Specification
* Service Layer
* Domain Model
* Transaction Script
* Gateway
* DTO
* Value Object
* Data Transfer Object
* Front Controller
* Application Controller

### Integration patterns

* Message Channel
* Message Endpoint
* Message Router
* Message Filter
* Message Translator
* Splitter
* Aggregator
* Resequencer
* Claim Check
* Dead Letter Channel
* Guaranteed Delivery
* Idempotent Receiver
* Polling Consumer
* Competing Consumers

---

# 8. DOMAIN-DRIVEN DESIGN

Learn:

* Domain
* Subdomain
* Core Domain
* Supporting Subdomain
* Generic Subdomain
* Bounded Context
* Context Map
* Ubiquitous Language
* Entity
* Value Object
* Aggregate
* Aggregate Root
* Repository
* Domain Service
* Application Service
* Domain Event
* Integration Event
* Factory
* Anti-Corruption Layer
* Shared Kernel
* Open Host Service
* Published Language
* Conformist
* Customer/Supplier

And:

**Strategic DDD**

vs

**Tactical DDD**

---

# 9. DEPENDENCY INJECTION

Know the entire family.

### Injection types

* Constructor Injection
* Setter Injection
* Property Injection
* Method Injection
* Interface Injection
* Parameter Injection

### DI concepts

* Dependency Inversion
* IoC — Inversion of Control
* Dependency Injection Container
* Service Locator
* Composition Root
* Lifetime Management
* Singleton Lifetime
* Scoped Lifetime
* Transient Lifetime
* Dependency Graph
* Circular Dependencies

Understand why:

```text
Bad:

Business Logic
      ↓
Concrete Database

Better:

Business Logic
      ↓
Interface
      ↑
Database Implementation
```

---

# 10. API DESIGN

This deserves its own discipline.

## API styles

* REST
* SOAP
* GraphQL
* gRPC
* WebSocket
* SSE
* Webhooks
* JSON-RPC
* XML-RPC
* MQTT
* AMQP

---

# 11. REST PRINCIPLES

Understand:

* Resources
* Representations
* HTTP semantics
* Statelessness
* Idempotency
* Cacheability
* Content negotiation
* HATEOAS
* Uniform interface

HTTP methods:

```text
GET
POST
PUT
PATCH
DELETE
HEAD
OPTIONS
```

Know safe vs idempotent methods.

---

# 12. API CONTRACT BEST PRACTICES

Always think about:

### Request contract

* Schema
* Required fields
* Optional fields
* Defaults
* Types
* Constraints
* Validation
* Enumerations
* Nullability
* Pagination
* Filtering
* Sorting
* Searching

### Response contract

* Status code
* Schema
* Metadata
* Errors
* Pagination
* Links
* Versioning

### Error contract

Standardize:

```json
{
  "code": "USER_NOT_FOUND",
  "message": "User does not exist",
  "details": [],
  "trace_id": "..."
}
```

Know:

* Problem Details / RFC 9457
* Error codes
* Correlation IDs
* Trace IDs
* Request IDs

---

# 13. API VERSIONING

Know:

* URI versioning
* Header versioning
* Query parameter versioning
* Content negotiation
* Backward compatibility
* Forward compatibility
* Consumer-driven contracts
* Semantic versioning
* Deprecation strategy

---

# 14. API SECURITY

Understand:

* Authentication
* Authorization
* OAuth 2.0
* OpenID Connect
* JWT
* API Keys
* mTLS
* HMAC
* RBAC
* ABAC
* PBAC
* ACL
* Scopes
* Rate limiting
* CORS
* CSRF
* Replay protection

---

# 15. DATABASE DESIGN

Know:

### Relational

* Normalization
* 1NF
* 2NF
* 3NF
* BCNF
* Denormalization
* Primary Keys
* Foreign Keys
* Candidate Keys
* Composite Keys
* Constraints
* Indexes
* Views
* Materialized Views

### Transactions

Know **ACID**:

```text
Atomicity
Consistency
Isolation
Durability
```

Isolation:

* Read Uncommitted
* Read Committed
* Repeatable Read
* Serializable
* Snapshot Isolation

And:

* Dirty Read
* Non-repeatable Read
* Phantom Read
* Lost Update
* Write Skew

---

# 16. DATABASE PATTERNS

* Repository
* Unit of Work
* CQRS
* Database per Service
* Shared Database
* Read Replica
* Sharding
* Partitioning
* Federation
* Polyglot Persistence
* Write-through
* Write-behind
* Read-through
* Materialized View

---

# 17. DISTRIBUTED SYSTEMS

This is where senior engineering begins.

Know:

* CAP theorem
* PACELC
* FLP impossibility
* Fallacies of distributed computing
* Network partitions
* Partial failure
* Clock synchronization
* Logical clocks
* Lamport clocks
* Vector clocks
* Consensus
* Leader election
* Quorum
* Replication
* Consistency
* Availability
* Partition tolerance

---

# 18. CONSISTENCY MODELS

* Strong consistency
* Eventual consistency
* Causal consistency
* Read-after-write consistency
* Monotonic reads
* Monotonic writes
* Session consistency
* Linearizability
* Sequential consistency

---

# 19. DISTRIBUTED CONSENSUS

Recognize:

* Paxos
* Raft
* Multi-Paxos
* Byzantine Fault Tolerance
* PBFT
* Quorum systems
* Leader election

---

# 20. DISTRIBUTED TRANSACTIONS

Know:

* Two-Phase Commit
* Three-Phase Commit
* Saga
* Choreography
* Orchestration
* Transactional Outbox
* Inbox Pattern
* Idempotent Consumers
* Compensation

---

# 21. MESSAGING

Understand:

* Queue
* Topic
* Pub/Sub
* Producer
* Consumer
* Consumer Group
* Broker
* Partition
* Offset
* Acknowledgement
* Retry
* Dead Letter Queue
* Poison Message
* Ordering
* Delivery semantics

Delivery:

```text
At-most-once
At-least-once
Exactly-once
```

And understand why “exactly once” is often much harder than it sounds.

---

# 22. CACHING

Patterns:

* Cache-aside
* Read-through
* Write-through
* Write-behind
* Refresh-ahead

Problems:

* Cache stampede
* Cache avalanche
* Cache penetration
* Stale data
* Invalidation
* Thundering herd

Remember:

> There are only two hard things in Computer Science: cache invalidation and naming things.

---

# 23. CONCURRENCY

Know:

* Process
* Thread
* Coroutine
* Async
* Parallelism
* Concurrency
* Race condition
* Deadlock
* Livelock
* Starvation
* Mutex
* Semaphore
* Monitor
* Lock
* Read/write lock
* Atomic operation
* CAS
* Thread safety
* Immutability
* Actor model
* CSP

---

# 24. PERFORMANCE ENGINEERING

Never say:

> “This is slow.”

Ask:

```text
Where?

Why?

Under what workload?

At what scale?

Compared to what?
```

Measure:

* Latency
* Throughput
* QPS
* TPS
* CPU
* Memory
* Disk I/O
* Network I/O
* GC
* Lock contention
* Cache hit rate

Latency percentiles:

```text
p50
p90
p95
p99
p99.9
```

Know:

* Amdahl's Law
* Little's Law
* Big-O
* Big-Theta
* Big-Omega
* Amortized complexity
* Time complexity
* Space complexity

---

# 25. RELIABILITY ENGINEERING

Know:

* Availability
* Reliability
* Durability
* Resilience
* Fault tolerance
* Graceful degradation
* Disaster recovery

Metrics:

* SLI
* SLO
* SLA
* Error budget

Patterns:

* Timeout
* Retry
* Exponential Backoff
* Jitter
* Circuit Breaker
* Bulkhead
* Rate Limiter
* Load Shedding
* Backpressure
* Failover
* Health Checks

---

# 26. RETRY DESIGN

Never blindly:

```python
retry()
retry()
retry()
```

Understand:

* Retryable errors
* Non-retryable errors
* Exponential backoff
* Full jitter
* Equal jitter
* Decorrelated jitter
* Maximum attempts
* Retry budgets
* Idempotency keys

---

# 27. ERROR HANDLING

Know:

* Exceptions
* Error values
* Result types
* Either types
* Error propagation
* Error translation
* Error boundaries
* Recovery
* Compensation
* Fail fast
* Graceful degradation
* Dead letter handling

Ask:

> Who owns recovery?

---

# 28. DEBUGGING

A good debugger doesn't randomly change code.

Use:

### Scientific debugging

```text
Observe
 ↓
Reproduce
 ↓
Hypothesize
 ↓
Instrument
 ↓
Test hypothesis
 ↓
Localize
 ↓
Fix
 ↓
Regression test
 ↓
Verify
```

Techniques:

* Binary search
* Divide and conquer
* Minimal reproduction
* Differential debugging
* Logging
* Tracing
* Profiling
* Core dumps
* Stack traces
* Heap dumps
* Thread dumps
* Breakpoints
* Watchpoints
* Assertions
* Fault injection

---

# 29. DEBUGGING QUESTIONS

Train yourself to ask:

```text
What exactly failed?

Where did it first become incorrect?

What changed?

Can I reproduce it?

Is it deterministic?

Does it happen under load?

Does it happen only in production?

What is the smallest reproduction?

What assumptions am I making?

What evidence supports my hypothesis?

What evidence would disprove it?
```

This mindset is worth more than knowing 100 frameworks.

---

# 30. TESTING

Testing is a massive discipline.

## Testing levels

```text
Unit
Integration
Component
Contract
System
End-to-End
Acceptance
```

## Testing types

* Functional testing
* Non-functional testing
* Regression testing
* Smoke testing
* Sanity testing
* Exploratory testing
* Usability testing
* Compatibility testing
* Installation testing
* Recovery testing
* Reliability testing
* Security testing
* Performance testing

---

# 31. TESTING PYRAMID

Classic:

```text
       E2E
      /   \
 Integration
   /       \
      Unit
```

But also know:

* Testing Trophy
* Testing Honeycomb
* Testing Diamond

Understand **test distribution**, not just the diagrams.

---

# 32. TEST DESIGN TECHNIQUES

Learn:

* Equivalence Partitioning
* Boundary Value Analysis
* Decision Tables
* State Transition Testing
* Pairwise Testing
* Cause-Effect Graphing
* Error Guessing
* Combinatorial Testing
* Risk-Based Testing

---

# 33. ADVANCED TESTING

Know:

* Property-based testing
* Mutation testing
* Fuzz testing
* Chaos testing
* Metamorphic testing
* Snapshot testing
* Golden master testing
* Differential testing
* Model-based testing
* Contract testing
* Consumer-driven contract testing
* Approval testing
* Conformance testing

---

# 34. TEST DOUBLES

Know the distinction between:

* Dummy
* Stub
* Spy
* Mock
* Fake

And understand:

> Mocking implementation details can make tests lie.

---

# 35. TESTING PRINCIPLES

* Arrange / Act / Assert
* Given / When / Then
* FIRST
* Deterministic tests
* Independent tests
* Repeatable tests
* Fast tests
* Isolated tests
* Test behavior, not implementation
* Avoid test interdependence
* Avoid excessive mocking
* Test failure paths
* Test boundaries
* Test concurrency where relevant

---

# 36. SECURITY ENGINEERING

Know:

### OWASP

* Injection
* Broken Access Control
* Authentication failures
* Cryptographic failures
* Security misconfiguration
* Vulnerable components
* Logging failures
* SSRF
* XSS
* CSRF
* SQL Injection
* Command Injection
* Path Traversal

Also:

* Threat modeling
* STRIDE
* DREAD
* Attack trees
* Zero Trust
* Defense in Depth
* Least privilege
* Secure defaults
* Secrets management
* Key rotation
* Encryption at rest
* Encryption in transit

---

# 37. THREAT MODELING

Ask:

```text
What are we protecting?

Who are we protecting it from?

What can go wrong?

How could it happen?

What controls prevent it?

What controls detect it?

What happens if prevention fails?
```

---

# 38. OBSERVABILITY

Three pillars:

```text
Logs
Metrics
Traces
```

But modern observability also includes:

* Profiles
* Events
* Continuous profiling
* Distributed tracing
* Correlation IDs
* Trace IDs
* Span IDs
* Structured logging
* Cardinality
* Sampling

---

# 39. LOGGING

Good logs answer:

```text
WHAT happened?
WHEN?
WHERE?
WHY?
WHO?
CORRELATION?
IMPACT?
```

Avoid:

* Secrets
* Passwords
* Tokens
* Excessive PII
* Unstructured noise

Prefer:

```json
{
  "timestamp": "...",
  "level": "ERROR",
  "service": "payments",
  "event": "payment_failed",
  "trace_id": "...",
  "error_code": "..."
}
```

---

# 40. CI/CD

Know:

* Continuous Integration
* Continuous Delivery
* Continuous Deployment
* Build automation
* Artifact repositories
* Pipeline gates
* Quality gates
* Deployment strategies

Deployment patterns:

* Rolling
* Blue/Green
* Canary
* Shadow
* Recreate
* Feature flags

---

# 41. DEVOPS

Understand:

* Infrastructure as Code
* Configuration as Code
* GitOps
* Immutable Infrastructure
* Containers
* Kubernetes
* Service Mesh
* Secrets management
* Monitoring
* Alerting
* Incident management

---

# 42. GIT

Know:

* Commit
* Branch
* Merge
* Rebase
* Cherry-pick
* Revert
* Reset
* Bisect
* Stash
* Tag
* Release
* Conventional Commits
* Trunk-Based Development
* GitFlow

And especially:

**git bisect**

It's an extremely powerful debugging technique.

---

# 43. REFACTORING

Know Martin Fowler's classic refactorings:

* Extract Method
* Extract Class
* Inline Method
* Move Method
* Rename
* Replace Conditional with Polymorphism
* Introduce Parameter Object
* Encapsulate Field
* Replace Magic Number
* Decompose Conditional
* Consolidate Conditional Expression

And recognize:

* Code smell
* Technical debt
* Accidental complexity
* Essential complexity

---

# 44. CODE SMELLS

Watch for:

* God Object
* God Function
* Long Method
* Long Parameter List
* Feature Envy
* Shotgun Surgery
* Divergent Change
* Primitive Obsession
* Data Clumps
* Duplicate Code
* Speculative Generality
* Dead Code
* Message Chains
* Large Class
* Circular Dependencies
* Inappropriate Intimacy

---

# 45. REQUIREMENTS ENGINEERING

Know:

* Functional requirements
* Non-functional requirements
* Constraints
* Assumptions
* Acceptance criteria
* User stories
* Use cases
* Quality attributes
* Stakeholders
* Requirements traceability
* Ambiguity
* Prioritization

Techniques:

* INVEST
* MoSCoW
* Event Storming
* Impact Mapping
* Example Mapping

---

# 46. SOFTWARE ESTIMATION

Know:

* Story points
* T-shirt sizing
* Function points
* Use-case points
* Three-point estimation
* PERT
* Planning poker
* Monte Carlo forecasting
* Velocity
* Throughput

And remember:

**Estimates are not promises.**

---

# 47. AGILE

Know:

* Scrum
* Kanban
* XP
* Lean
* Crystal
* SAFe
* Shape Up

XP practices:

* Pair programming
* TDD
* Continuous integration
* Refactoring
* Simple design
* Collective ownership

---

# 48. CLEAN CODE

Think:

```text
Readable
Predictable
Small
Explicit
Cohesive
Testable
Changeable
```

Know:

* Meaningful names
* Small functions
* Single responsibility
* Minimal comments
* Avoid magic numbers
* Avoid boolean blindness
* Avoid deep nesting
* Explicit error handling
* Local reasoning

---

# 49. API + DATABASE + CODE: THE CONTRACT TRIAD

A mature engineer thinks about contracts everywhere.

```text
User
 ↓
UI Contract
 ↓
API Contract
 ↓
Domain Contract
 ↓
Database Contract
 ↓
External Service Contract
```

Every boundary should answer:

* What comes in?
* What goes out?
* What can fail?
* Who owns validation?
* What is guaranteed?
* What can change?
* How is compatibility maintained?

---

# 50. STATE MANAGEMENT

Understand:

* Local state
* Shared state
* Derived state
* Persistent state
* Ephemeral state
* Distributed state

And:

* State machines
* Finite State Machines
* Statecharts
* Event sourcing
* Redux-style architectures
* Reactive state

---

# 51. FRONTEND ENGINEERING

Know:

* Component architecture
* State management
* Rendering
* SSR
* CSR
* SSG
* ISR
* Hydration
* Code splitting
* Lazy loading
* Tree shaking
* Browser caching
* Accessibility
* Progressive enhancement
* Responsive design
* Web performance

---

# 52. MOBILE ENGINEERING

Understand:

* Lifecycle
* Offline-first
* Local persistence
* Synchronization
* Background execution
* Push notifications
* Deep links
* Secure storage
* Permissions
* Battery constraints
* Network unreliability
* App version compatibility

---

# 53. SOFTWARE ARCHITECTURE QUALITY ATTRIBUTES

Always evaluate:

```text
Performance
Scalability
Availability
Reliability
Security
Maintainability
Testability
Deployability
Observability
Usability
Accessibility
Portability
Interoperability
Extensibility
Recoverability
Operability
```

---

# 54. ARCHITECTURE DECISION MAKING

Learn:

### ADR

**Architecture Decision Record**

Capture:

```text
Context
Decision
Alternatives
Consequences
```

And understand:

* Architecture trade-off analysis
* Fitness functions
* Evolutionary architecture
* Architecture runway
* Technical constraints

---

# 55. SYSTEM DESIGN

Every system design should investigate:

```text
Requirements
↓
Constraints
↓
Scale
↓
APIs
↓
Data model
↓
Architecture
↓
Communication
↓
Caching
↓
Consistency
↓
Failure modes
↓
Security
↓
Observability
↓
Deployment
↓
Cost
```

---

# 56. FAILURE MODE THINKING

Use:

### FMEA

Failure Mode and Effects Analysis.

Ask:

```text
What can fail?
Why?
How likely?
How severe?
How detectable?
What happens next?
```

Also know:

* Fault tree analysis
* Failure domains
* Blast radius
* Single point of failure
* Cascading failure

---

# 57. CHAOS ENGINEERING

Know:

* Failure injection
* Latency injection
* Dependency failure
* Network partition
* CPU exhaustion
* Memory pressure
* Disk failure
* Instance termination

Principle:

> Don't wait for production to teach you how your system fails.

---

# 58. CLOUD ARCHITECTURE

Know:

* Region
* Availability Zone
* VPC
* Subnet
* Load Balancer
* CDN
* Object storage
* Block storage
* Managed database
* Queue
* Pub/Sub
* Serverless
* Autoscaling
* IAM
* Secrets
* KMS

And cloud principles:

* Stateless services
* Horizontal scaling
* Infrastructure as code
* Ephemeral instances
* Multi-AZ
* Disaster recovery

---

# 59. DISASTER RECOVERY

Know:

* Backup
* Restore
* Replication
* RPO
* RTO
* Hot standby
* Warm standby
* Cold standby
* Active-active
* Active-passive
* Disaster Recovery Plan
* Business Continuity Plan

---

# 60. COMPUTER SCIENCE FOUNDATIONS

Don't skip these.

### Data structures

* Array
* Linked List
* Stack
* Queue
* Deque
* Hash Table
* Tree
* BST
* Heap
* Trie
* Graph
* Union-Find
* Bloom Filter
* Skip List

### Algorithms

* Sorting
* Searching
* BFS
* DFS
* Dijkstra
* A*
* Topological Sort
* Union-Find
* Dynamic Programming
* Greedy
* Backtracking
* Divide and Conquer
* Sliding Window
* Two Pointers
* Binary Search

---

# 61. OPERATING SYSTEMS

Know:

* Processes
* Threads
* Scheduling
* Context switching
* Virtual memory
* Paging
* Segmentation
* File systems
* System calls
* Interrupts
* Kernel/user space
* IPC
* Signals
* Sockets
* Locks
* Deadlocks

---

# 62. NETWORKING

Know:

```text
OSI
TCP/IP
DNS
HTTP
HTTPS
TLS
TCP
UDP
IP
ARP
ICMP
NAT
DHCP
```

And:

* Load balancing
* Reverse proxy
* Forward proxy
* CDN
* Connection pooling
* Keep-alive
* HTTP/1.1
* HTTP/2
* HTTP/3
* QUIC
* WebSockets

---

# 63. COMPILER / LANGUAGE CONCEPTS

Understand:

* Lexing
* Parsing
* AST
* Type systems
* Static typing
* Dynamic typing
* Strong typing
* Weak typing
* Generics
* Polymorphism
* Closures
* Higher-order functions
* Garbage collection
* Memory management
* Stack
* Heap

---

# 64. FUNCTIONAL PROGRAMMING

Know:

* Pure functions
* Immutability
* Referential transparency
* Higher-order functions
* Function composition
* Currying
* Monads
* Functors
* Algebraic data types
* Pattern matching
* Side-effect isolation

---

# 65. OBJECT-ORIENTED PROGRAMMING

Know:

* Encapsulation
* Abstraction
* Inheritance
* Polymorphism
* Composition
* Aggregation
* Association
* Dependency
* Interface
* Abstract class
* Virtual dispatch

But understand:

**OOP is a tool, not a religion.**

---

# 66. AI / LLM ENGINEERING

For modern engineering, add:

* Prompt engineering
* Structured outputs
* Tool calling
* Function calling
* RAG
* Embeddings
* Vector databases
* Hybrid search
* Semantic search
* BM25
* Reranking
* Chunking
* Query rewriting
* Context engineering
* Agent architecture
* Multi-agent systems
* Planning
* Reflection
* Tool use
* Memory
* State management
* Guardrails
* Evaluation
* LLM observability
* Prompt versioning
* Model routing
* Cost optimization
* Latency optimization
* Model fallback
* Hallucination mitigation

---

# 67. AI AGENT PATTERNS

Know:

* ReAct
* Plan-and-Execute
* Toolformer-style tool use
* Reflection
* Self-critique
* Debate
* Router
* Supervisor
* Worker
* Hierarchical agents
* Sequential agents
* Parallel agents
* Blackboard architecture
* Human-in-the-loop
* Human-on-the-loop
* Human-out-of-the-loop

And critically:

```text
Agent
≠
LLM + tools

Agent =
State
+
Decision loop
+
Tools
+
Environment
+
Policy
+
Memory
+
Termination
+
Evaluation
```

---

# 68. LLM EVALUATION

Know:

* Golden datasets
* Regression datasets
* Offline evaluation
* Online evaluation
* Human evaluation
* LLM-as-judge
* Pairwise evaluation
* Exact match
* Precision
* Recall
* F1
* Faithfulness
* Groundedness
* Relevance
* Toxicity
* Safety
* Task success
* Tool-call accuracy

---

# 69. AI SECURITY

Know:

* Prompt injection
* Indirect prompt injection
* Jailbreaking
* Data exfiltration
* Tool abuse
* Excessive agency
* Insecure tool permissions
* Retrieval poisoning
* Model supply-chain risks
* Sensitive data leakage
* Output validation
* Sandboxing
* Least-privilege tools

---

# 70. SOFTWARE SUPPLY CHAIN

Know:

* Dependency pinning
* Lock files
* SBOM
* Dependency scanning
* Vulnerability scanning
* Signed artifacts
* Provenance
* SLSA
* Reproducible builds
* Secret scanning
* Container scanning

---

# 71. DOCUMENTATION

Know:

* README
* API documentation
* Architecture diagrams
* ADR
* Runbook
* Playbook
* RFC
* Design document
* Threat model
* Onboarding guide
* Operational documentation

A good architecture that nobody understands is effectively a bad architecture.

---

# 72. DIAGRAMMING

Know:

* C4 Model
* UML
* Sequence diagrams
* Class diagrams
* State diagrams
* Activity diagrams
* Deployment diagrams
* ER diagrams
* Data-flow diagrams
* Architecture diagrams
* Event storming

---

# 73. CODE REVIEW

Review in this order:

```text
Correctness
↓
Security
↓
Reliability
↓
Architecture
↓
Maintainability
↓
Performance
↓
Style
```

Not:

```text
"Why did you name this variable X?"
```

while missing a race condition.

---

# 74. STATIC ANALYSIS

Know:

* Linters
* Formatters
* Type checkers
* AST analysis
* Complexity analysis
* SAST
* Dependency scanning
* Code smell detection
* Dead code detection
* Security scanners

---

# 75. SOFTWARE METRICS

Know:

* Cyclomatic complexity
* Cognitive complexity
* Code coverage
* Mutation score
* Defect density
* Change failure rate
* Lead time
* Deployment frequency
* MTTR
* MTTF
* MTBF

DORA metrics are particularly important.

---

# 76. TECHNICAL DEBT

Distinguish:

```text
Intentional debt
Unintentional debt
Prudent debt
Reckless debt
```

Every shortcut creates some future cost.

The question isn't:

> "Can we avoid debt?"

It's:

> "Is this debt deliberate, visible, and affordable?"

---

# 77. LEGACY SYSTEM ENGINEERING

Know:

* Strangler Fig
* Branch by abstraction
* Parallel run
* Characterization tests
* Golden master
* Anti-corruption layer
* Seam
* Incremental migration
* Database migration
* Backward compatibility

Never rewrite a system simply because it's ugly.

First understand **why it survived**.

---

# 78. MIGRATION PATTERNS

Know:

* Big Bang
* Strangler
* Parallel migration
* Blue/Green migration
* Expand/Contract
* Dual write
* Backfill
* Shadow traffic
* Read migration
* Write migration

---

# 79. DATA MIGRATION

Always consider:

```text
Schema compatibility
Data correctness
Rollback
Backfill
Duplicates
Idempotency
Ordering
Partial failure
Observability
Validation
```

---

# 80. NAMING

One of the most underestimated engineering skills.

Name:

* Variables
* Functions
* Classes
* APIs
* Events
* Database tables
* Queues
* Services
* Modules

based on **domain meaning**, not implementation trivia.

---

# 81. ENGINEERING HEURISTICS

These aren't formal laws, but experienced engineers internalize them.

### Chesterton's Fence

Before removing something:

> Understand why it exists.

### Postel's Law

Be cautious about blindly applying this; permissive parsing can create security and interoperability problems.

### Hyrum's Law

With enough users, every observable behavior becomes a dependency.

### Conway's Law

Systems tend to mirror communication structures.

### Parkinson's Law

Work expands to fill available time.

### Brooks's Law

Adding people to a late software project can make it later.

### Gall's Law

Complex successful systems usually evolved from simpler working systems.

### Amdahl's Law

Parallelization has limits.

### Pareto Principle

A small number of causes often dominate outcomes.

### Murphy's Law

If failure is possible, design for it.

---

# 82. THE MOST IMPORTANT ENGINEERING QUESTIONS

When you see **any system**, train yourself to automatically ask:

### Requirements

> What problem are we solving?

> What does success mean?

> What are the constraints?

### Architecture

> Why this architecture?

> What alternatives were rejected?

> Where are the boundaries?

### Dependencies

> What does this depend on?

> What depends on this?

### Data

> Where is the source of truth?

> Who owns this data?

### API

> What is the contract?

> How does it evolve?

### Failure

> What happens when this fails?

### Scale

> What breaks first?

### Security

> Who can do what?

### Performance

> Where is the bottleneck?

### Testing

> How do we know this works?

### Observability

> How will we know when it doesn't?

### Operations

> Who gets paged at 3 AM?

### Cost

> What does this architecture cost at 10× scale?

### Evolution

> What happens when requirements change?

---

# 83. THE ENGINEER'S "ALWAYS CHECK" LIST

Before shipping something significant:

```text
□ Requirements understood
□ Edge cases identified
□ Failure modes considered
□ Input validation
□ Output validation
□ Error handling
□ Security
□ Authentication
□ Authorization
□ Secrets
□ Logging
□ Metrics
□ Tracing
□ Timeouts
□ Retries
□ Idempotency
□ Rate limiting
□ Concurrency
□ Data consistency
□ Transactions
□ Caching
□ Performance
□ Scalability
□ Backward compatibility
□ Tests
□ Regression tests
□ Deployment strategy
□ Rollback strategy
□ Monitoring
□ Documentation
□ Operational runbook
□ Cost
```

---

# 84. THE META-SKILL ABOVE ALL OF THESE

The most important thing isn't memorizing patterns.

It's learning to recognize:

> **What kind of problem am I looking at?**

For example:

```text
Repeated object creation
        ↓
Factory / Builder

Behavior changes dynamically
        ↓
Strategy / State

Need to wrap behavior
        ↓
Decorator

Need compatibility
        ↓
Adapter

Complex subsystem
        ↓
Facade

Need notifications
        ↓
Observer / Pub-Sub

Distributed workflow
        ↓
Saga

Repeated failure
        ↓
Circuit Breaker

Slow dependency
        ↓
Timeout / Bulkhead

Duplicate requests
        ↓
Idempotency

Data synchronization
        ↓
Event / CDC / Outbox

Growing monolith
        ↓
Modularization / Vertical Slices

Legacy replacement
        ↓
Strangler Fig

Unknown production failure
        ↓
Observability + scientific debugging
```

That's **pattern recognition**.

---

# 85. THE ULTIMATE ENGINEERING LOOP

If I had to reduce the entire list to one operating system for your brain:

```text
                 ┌──────────────┐
                 │   PROBLEM     │
                 └──────┬───────┘
                        ↓
                 ┌──────────────┐
                 │ REQUIREMENTS │
                 └──────┬───────┘
                        ↓
                 ┌──────────────┐
                 │ CONSTRAINTS  │
                 └──────┬───────┘
                        ↓
                 ┌──────────────┐
                 │   DESIGN     │
                 └──────┬───────┘
                        ↓
             ┌──────────────────────┐
             │ TRADE-OFF ANALYSIS  │
             └──────────┬───────────┘
                        ↓
                 ┌──────────────┐
                 │ IMPLEMENT    │
                 └──────┬───────┘
                        ↓
                 ┌──────────────┐
                 │    TEST      │
                 └──────┬───────┘
                        ↓
                 ┌──────────────┐
                 │   OBSERVE    │
                 └──────┬───────┘
                        ↓
                 ┌──────────────┐
                 │   OPERATE    │
                 └──────┬───────┘
                        ↓
                 ┌──────────────┐
                 │   LEARN      │
                 └──────┬───────┘
                        │
                        └──────→ BACK TO PROBLEM
```

And underneath **every stage**:

```text
Simplicity
Correctness
Security
Reliability
Performance
Maintainability
Testability
Observability
Cost
Evolvability
```

