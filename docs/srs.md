Software Requirements
Specification
for
Organic Farming Learning & Simulation Platform
Version 1.0
Prepared by Project Team
Academic Project
18 August 2026
Based on the provided IEEE Software Requirements Specification template.
Page 1
Page 2
Table of Contents
1. Introduction ........................................................ 4
1.1 Purpose ................................................................ 4
1.2 Document Conventions ...................................... 4
1.3 Intended Audience and Reading Suggestions .... 4
1.4 Product Scope .................................................... 4
1.5 References .......................................................... 4
2. Overall Description .......................................... 5
2.1 Product Perspective ........................................ 5
2.2 Product Functions ............................................ 5
2.3 User Classes and Characteristics .............. 5
2.4 Operating Environment .................................... 5
2.5 Design and Implementation Constraints .... 5
2.6 User Documentation .......................................... 6
2.7 Assumptions and Dependencies ...................... 6
3. External Interface Requirements .................. 7
3.1 User Interfaces ................................................ 7
3.2 Hardware Interfaces ........................................ 7
3.3 Software Interfaces ........................................ 7
3.4 Communications Interfaces ............................ 7
4. System Features .................................................. 8
4.1 User Authentication and Profile ................ 8
4.2 Learning Management ........................................ 8
4.3 Organic Farming Simulation .......................... 9
4.4 Challenges, Scoring and Gamification ...... 9
4.5 Progress, Analytics and Reports ................ 10
4.6 Administration .................................................. 10
4.7 Notifications and Guidance .......................... 11
5. Other Nonfunctional Requirements ................ 12
5.1 Performance Requirements .............................. 12
5.2 Safety Requirements ........................................ 12
5.3 Security Requirements .................................... 12
5.4 Software Quality Attributes ........................ 12
5.5 Business Rules .................................................. 12
6. Other Requirements ............................................ 13
Appendix A: Glossary .............................................. 13
Appendix B: Analysis Models ................................ 13
Appendix C: To Be Determined List .................... 14
Revision History
Name Date Reason For Changes Version
Project Team 18 Aug 2026 Initial SRS baseline for the 
Organic Farming Learning & 
Simulation Platform
1.0
1. Introduction
This Software Requirements Specification (SRS) defines the functional, interface, performance, security, quality, 
and business requirements for the Organic Farming Learning & Simulation Platform. The structure follows the 
provided IEEE SRS template, including the introduction, overall description, external interfaces, system features, 
nonfunctional requirements, and appendices.
1.1 Purpose
The purpose of this SRS is to establish a precise and testable baseline for development of a web-based platform 
that teaches organic farming concepts and lets users practice farming decisions in a controlled virtual 
environment. The SRS covers the complete application rather than a single subsystem.
1.2 Document Conventions
The term SHALL denotes a mandatory requirement. SHOULD denotes a recommended requirement that may be 
relaxed only with an explicit project decision. MAY denotes an optional capability. Each functional requirement 
has a unique identifier such as AUTH-REQ-01 or SIM-REQ-08. Priorities are High, Medium, or Low.
1.3 Intended Audience and Reading Suggestions
The primary readers are project supervisors, developers, UI/UX designers, testers, content authors, and future 
maintainers. Developers should read Sections 2-4 first; testers should focus on Section 4 and Section 5; 
supervisors and reviewers should begin with Sections 1 and 2, then review the feature requirements and 
appendices.
1.4 Product Scope
The platform combines a learning management experience with an interactive organic-farming simulator. Users 
can register, study structured lessons, complete quizzes, create or operate a virtual farm, select crops, manage soil 
and water, apply organic inputs, respond to pest events, harvest crops, evaluate cost/yield/profit outcomes, and 
earn scores or badges. Administrators manage learning content, crops, simulation parameters, challenges, and 
user-facing configuration. The system is intended primarily as an educational and decision-practice tool; it does 
not replace advice from qualified agricultural professionals and does not control physical farm equipment.
1.5 References
The primary source for this document structure is the user-provided IEEE Software Requirements Specification 
template. Project-specific terminology and requirements are derived from the project concept established in the 
conversation. External standards, agricultural datasets, and third-party API documentation are not yet fixed and 
are therefore tracked as TBD in Appendix C.
Page 3
2. Overall Description
2.1 Product Perspective
The product is a new, self-contained web application built with the MERN stack: React for the client interface, 
Node.js with Express for server-side APIs, and MongoDB for persistent data. The simulation engine is 
implemented as application logic within the server-side layer and uses configurable farming rules rather than a 
physical-world control system.
Logical Component
Responsibility
React Web Client
Responsive user interface, learning screens, simulator 
dashboard, charts, forms, validation feedback, and navigation.
Express/Node.js API
Authentication, authorization, business logic, course APIs, 
farm actions, scoring, reporting, and admin APIs.
MongoDB Database
Users, courses, lessons, quizzes, crops, farms, actions, rules, 
challenges, progress, badges, and audit records.
Simulation Engine
Applies configurable rules to update soil health, water, crop 
health, pest risk, budget, yield, and other simulation variables.
Optional AI Advisory Service
2.2 Product Functions
Provides explanatory educational guidance and 
recommendations based on user-provided or simulated farm 
context; not used as the authoritative simulation engine.
 User registration, login, logout, and role-based access control.
 Course and lesson browsing with progress tracking.
 Quiz delivery, answer submission, scoring, and retry support.
 Virtual farm setup and crop selection.
 Simulation of irrigation, organic inputs, pest control, crop rotation, harvesting, and economic outcomes.
 Challenges with defined constraints, scores, XP, levels, and badges.
 Dashboards showing learning progress and farm metrics.
 Administrative management of courses, crops, rules, quizzes, and challenges.
 Optional AI-powered farm guidance and explanations.
2.3 User Classes and Characteristics
User Class
Characteristics
Key Access
Learner/Farmer
Student, beginner grower, or general 
learner with basic web skills.
Courses, quizzes, simulation, challenges, 
progress, badges.
Content Administrator
Authorized project staff responsible for 
educational content and simulation 
configuration.
Create/edit/publish courses, lessons, 
quizzes, crops, rules, challenges.
System Administrator
2.4 Operating Environment
Technical administrator with elevated 
privileges.
User management, role control, 
configuration, logs, system oversight.
The system shall operate as a responsive web application on current desktop and mobile browsers. The 
development environment is expected to include Node.js, npm, React, Express, MongoDB, and Git. Deployment 
may use a managed hosting platform and MongoDB-compatible cloud database; the exact providers are TBD.
2.5 Design and Implementation Constraints
 The application SHALL use the MERN stack for the primary software architecture.
Page 4
 The simulator SHALL remain deterministic and explainable enough for educational use; rules SHOULD be 
configurable rather than hidden in UI code.
 Authentication SHALL protect privileged administration operations.
 The initial scope SHALL favor a 2D browser-based simulation instead of a resource-intensive 3D 
environment.
 Agricultural values used by the simulator SHALL be documented as educational assumptions and SHALL 
NOT be presented as universal real-world prescriptions.
2.6 User Documentation
The release should include a learner quick-start guide, simulator help text, an administrator guide, and a concise 
explanation of scoring and simulation variables. Contextual help should be available from key simulator screens.
2.7 Assumptions and Dependencies
 Users have internet access and a modern browser.
 Initial agricultural rules and crop parameters will be supplied by the project team and validated as educational 
content.
 Email delivery, weather APIs, maps, cloud storage, and AI services are optional dependencies and are not 
required for the minimum viable system.
 The simulation is not expected to model every real-world interaction; it will use a finite rule set appropriate 
for instructional exercises.
Page 5
3. External Interface Requirements
3.1 User Interfaces
The UI SHALL provide consistent navigation, readable typography, clear labels, responsive layouts, validation 
feedback, and confirmation states for consequential actions. The primary learner screens are Login/Register, 
Dashboard, Course Catalog, Lesson, Quiz, Farm Setup, Farm Simulator, Challenge, Results, and Profile. The 
primary admin screens are Admin Dashboard, Course Manager, Quiz Manager, Crop Manager, Simulation Rule 
Manager, Challenge Manager, and User Management.
The simulator should present the current farm state using concise metrics such as Soil Health, Water Level, Crop 
Health, Pest Risk, Budget, Day/Stage, Expected Yield, and Expected Profit. Actions should be presented as 
explicit controls with visible costs or effects where practical.
3.2 Hardware Interfaces
No specialized hardware is required for the baseline system. The application shall support standard 
keyboard/mouse/touch interaction and common screen sizes. Physical farm sensors, actuators, irrigation 
controllers, and IoT devices are outside the baseline scope.
3.3 Software Interfaces
The React client shall communicate with the Express API through HTTP/HTTPS using JSON payloads. The 
backend shall communicate with MongoDB using a Node.js-compatible driver or ODM. Optional integrations 
may include an AI service, an email service, and a weather service, but these are not mandatory for the core 
release.
Interface
Direction
Data
Purpose
React <-> Express REST API Bidirectional
JSON
Application operations and 
state updates
Express <-> MongoDB
Bidirectional
Documents/queries
Persistent storage
Backend <-> AI service 
(optional)
Bidirectional
Prompt/context and response
Educational advisory 
responses
Backend <-> Weather service 
(optional)
Inbound
3.4 Communications Interfaces
Weather data
Scenario generation or 
informational context
All production web traffic SHALL use HTTPS. API requests SHALL use REST-style endpoints with JSON 
request and response bodies. Authentication tokens or secure sessions SHALL be transmitted only over encrypted 
channels. The system SHOULD return standard HTTP status codes and structured error responses. Client-server 
communication SHALL use UTF-8 encoded JSON.
Page 6
4. System Features
The following features define the principal functional requirements of the platform. Each feature contains a 
description, stimulus/response sequence, and uniquely identified functional requirements.
4.1 User Authentication and Profile
4.1.1 Description and Priority
Provides secure identity management and personalized learner state. Priority: High.
4.1.2 Stimulus/Response Sequences
1. User enters registration or login information; the system validates the data and either creates/authenticates the 
account or returns a useful error.
2. Authenticated user requests a protected page; the system verifies the session/token and role before granting 
access.
3. User edits profile information; the system validates and persists permitted changes.
4.1.3 Functional Requirements
AUTH-REQ-01 [High]: The system SHALL allow a user to register with a unique email/username and 
password.
AUTH-REQ-02 [High]: The system SHALL hash passwords before persistence and SHALL never store 
plaintext passwords.
AUTH-REQ-03 [High]: The system SHALL authenticate users before granting access to protected learner or 
administrator functions.
AUTH-REQ-04 [High]: The system SHALL enforce role-based authorization for administrator operations.
AUTH-REQ-05 [Medium]: The system SHALL provide logout and invalidate the active authentication state.
AUTH-REQ-06 [Medium]: The system SHALL provide a profile page showing learner name, level, XP, and 
learning/simulation summary.
4.2 Learning Management
4.2.1 Description and Priority
Provides structured organic-farming learning content, quizzes, and progress tracking. Priority: High.
4.2.2 Stimulus/Response Sequences
1. User opens the course catalog; the system displays available courses and completion status.
2. User opens a lesson; the system displays lesson content and records progress when completion criteria are met.
3. User submits a quiz; the system validates answers, calculates a score, stores the result, and updates 
progress/XP.
4.2.3 Functional Requirements
LEARN-REQ-01 [High]: The system SHALL display courses with title, description, learning objectives, 
difficulty, and status.
LEARN-REQ-02 [High]: The system SHALL organize a course into ordered lessons or learning units.
LEARN-REQ-03 [High]: The system SHALL record lesson completion for the authenticated user.
LEARN-REQ-04 [High]: The system SHALL provide quizzes containing multiple-choice or equivalent 
objective questions.
LEARN-REQ-05 [High]: The system SHALL calculate quiz scores and store attempt history.
Page 7
LEARN-REQ-06 [Medium]: The system SHALL show overall course progress as a percentage based on 
completed learning units.
LEARN-REQ-07 [Medium]: The system SHOULD prevent progress from being falsely marked complete 
when required lesson/quiz criteria are not met.
4.3 Organic Farming Simulation
4.3.1 Description and Priority
Provides the core virtual farm experience where decisions affect measurable farm state. Priority: High.
4.3.2 Stimulus/Response Sequences
1. User selects a scenario and crop; the system initializes a farm with configured starting resources and 
conditions.
2. User performs an action such as watering, adding compost, applying organic pest control, or harvesting; the 
system validates the action, applies the configured simulation rules, updates farm state, and stores the action.
3. An event such as pest pressure, rainfall, or a growth-stage change occurs; the system updates affected variables 
and presents the new state.
4. User requests a farm status view; the system displays current metrics, action history, and projected outcomes.
4.3.3 Functional Requirements
SIM-REQ-01 [High]: The system SHALL allow a learner to create a virtual farm from an available scenario.
SIM-REQ-02 [High]: The system SHALL allow crop selection from the configured crop catalog.
SIM-REQ-03 [High]: The system SHALL maintain at least the following simulation variables: soil health, 
water level, crop health, pest risk, budget, crop stage/day, yield, and revenue/profit estimate.
SIM-REQ-04 [High]: The system SHALL provide farming actions including, at minimum, planting, 
irrigation, organic nutrient input, organic pest management, crop rotation or soil practice, and harvest.
SIM-REQ-05 [High]: The system SHALL validate that an action is permitted under the current scenario state 
and available resources.
SIM-REQ-06 [High]: The system SHALL apply configurable rules to update farm variables after each valid 
action.
SIM-REQ-07 [High]: The system SHALL record farm actions with timestamp, action type, user/farm 
reference, and resulting state or state delta.
SIM-REQ-08 [Medium]: The system SHALL provide feedback explaining the major effects of significant 
actions in educational terms.
SIM-REQ-09 [Medium]: The system SHALL support at least five initial crops in the configured catalog.
SIM-REQ-10 [Medium]: The system SHOULD support scenario variables such as season, initial budget, 
water availability, and starting soil condition.
SIM-REQ-11 [High]: The system SHALL prevent harvesting before the configured minimum harvest stage.
SIM-REQ-12 [High]: The system SHALL calculate final yield and economic outcome when a farm reaches 
the end of its configured scenario or is harvested.
4.4 Challenges, Scoring and Gamification
4.4.1 Description and Priority
Turns simulation and learning outcomes into measurable challenges and progression. Priority: Medium.
4.4.2 Stimulus/Response Sequences
1. User starts a challenge with stated objectives and constraints; the system initializes the challenge-specific state.
Page 8
2. User completes actions; the system evaluates progress against constraints and objectives.
3. Challenge ends; the system calculates score, XP, completion status, and earned badges where applicable.
4.4.3 Functional Requirements
GAME-REQ-01 [High]: The system SHALL provide challenges with explicit goals and constraints.
GAME-REQ-02 [Medium]: The system SHALL calculate a challenge score from configured factors such as 
sustainability, yield, cost, and profit.
GAME-REQ-03 [Medium]: The system SHALL award XP for defined learning and simulation 
achievements.
GAME-REQ-04 [Low]: The system SHALL assign levels or rank based on accumulated XP according to 
configurable thresholds.
GAME-REQ-05 [Low]: The system SHOULD support badges for specific achievements such as water 
efficiency, soil management, or successful pest control.
GAME-REQ-06 [Low]: The system SHOULD maintain a leaderboard using clearly defined and privacy
conscious ranking data.
4.5 Progress, Analytics and Reports
4.5.1 Description and Priority
Provides learner visibility into educational progress and simulation outcomes. Priority: Medium.
4.5.2 Stimulus/Response Sequences
1. User opens the dashboard; the system retrieves current learning and simulation metrics.
2. User completes learning or simulation activities; the system updates stored metrics.
3. User opens a farm report; the system presents historical actions and final outcomes.
4.5.3 Functional Requirements
ANALYTICS-REQ-01 [Medium]: The system SHALL display course progress and completed learning units 
on the learner dashboard.
ANALYTICS-REQ-02 [High]: The system SHALL display the current farm metrics and simulation status.
ANALYTICS-REQ-03 [Medium]: The system SHALL provide a farm results summary including cost, yield, 
revenue, profit/loss estimate, and key sustainability metrics when configured.
ANALYTICS-REQ-04 [Low]: The system SHOULD provide time-series or event-based charts for variables 
such as soil health, water, and crop health.
ANALYTICS-REQ-05 [Medium]: The system SHALL preserve enough historical data to reproduce the final 
outcome for a completed scenario.
4.6 Administration
4.6.1 Description and Priority
Provides controlled management of the platform's learning and simulation content. Priority: High.
4.6.2 Stimulus/Response Sequences
1. Administrator signs in and opens an administrative module; the system authorizes the role and loads allowed 
operations.
2. Administrator creates or edits a course, crop, quiz, challenge, or simulation rule; the system validates and saves 
the data.
3. Administrator publishes or disables content; the system changes its availability to learners.
Page 9
4.6.3 Functional Requirements
ADMIN-REQ-01 [High]: The system SHALL restrict administration functions to authorized administrator 
roles.
ADMIN-REQ-02 [High]: The system SHALL allow administrators to create, edit, and deactivate courses and 
lessons.
ADMIN-REQ-03 [High]: The system SHALL allow administrators to create, edit, and deactivate quizzes and 
questions.
ADMIN-REQ-04 [High]: The system SHALL allow administrators to manage crop parameters and 
descriptive metadata.
ADMIN-REQ-05 [High]: The system SHALL allow administrators to configure simulation rules or rule 
parameters without changing learner-facing UI code.
ADMIN-REQ-06 [Medium]: The system SHALL allow administrators to create, edit, publish, and deactivate 
challenges.
ADMIN-REQ-07 [Medium]: The system SHOULD record auditable metadata for critical administrative 
changes.
4.7 Notifications and Guidance
4.7.1 Description and Priority
Provides actionable messages and optional advisory assistance without changing authoritative simulation results. 
Priority: Low/Medium.
4.7.2 Stimulus/Response Sequences
1. User triggers a notable event; the system displays a contextual message or notification.
2. User submits a question to the optional AI advisor; the system forwards relevant context, receives a response, 
and displays it with a clear educational disclaimer.
3. Simulation remains authoritative regardless of AI output.
4.7.3 Functional Requirements
GUIDE-REQ-01 [High]: The system SHALL display contextual feedback for validation errors, resource 
insufficiency, and important simulation events.
GUIDE-REQ-02 [Low]: The system MAY provide an AI farming assistant as an optional module.
GUIDE-REQ-03 [High]: If the AI assistant is enabled, the system SHALL identify AI-generated guidance as 
advisory and educational.
GUIDE-REQ-04 [High]: The AI assistant SHALL NOT directly mutate farm state, scores, or simulation 
rules.
GUIDE-REQ-05 [Low]: The system SHOULD provide a way for users to retry or dismiss non-critical 
guidance messages.
5. Other Nonfunctional Requirements
5.1 Performance Requirements
 Common page navigation and API operations SHOULD return within 2 seconds under normal project-scale 
load, excluding third-party service latency.
 Simulation actions SHOULD update the displayed farm state within 2 seconds after successful submission.
Page 10
 The application SHOULD support at least 50 concurrent authenticated users for the initial academic 
deployment without data corruption.
 Large administrative queries SHOULD use pagination or bounded result sets.
5.2 Safety Requirements
The system is a digital educational simulator and shall not directly control physical agricultural equipment. 
Simulation outputs shall be labeled as educational estimates where they resemble real-world agricultural or 
financial outcomes. The application should avoid presenting simulation values as guaranteed crop yields, profits, 
or professional agricultural prescriptions.
5.3 Security Requirements
 Passwords SHALL be stored only as secure hashes.
 Protected endpoints SHALL enforce authentication and authorization.
 Sensitive tokens and credentials SHALL NOT be exposed in client-side source code.
 Production traffic SHALL use HTTPS.
 Input SHALL be validated and sanitized at the server boundary.
 Administrative actions SHALL be auditable where practical.
 Users SHALL only access farms, progress data, and profile data that they are authorized to access.
5.4 Software Quality Attributes
Attribute
Requirement
Usability
A first-time learner should be able to start a lesson or 
simulation with minimal instruction; key actions and metrics 
shall be clearly labeled.
Reliability
The system shall preserve data consistency across user actions; 
failed writes shall not produce partial simulation state.
Maintainability
Simulation rules, crop data, courses, and quizzes should be 
data-driven and separated from presentation logic.
Scalability
The API and database design should allow additional crops, 
courses, scenarios, and users without redesigning the core 
domain model.
Testability
Functional requirements shall be testable through API, UI, and 
unit/integration tests.
Portability
5.5 Business Rules
The client shall run in current major browsers on supported 
desktop and mobile devices.
1. Only authenticated users may persist personalized learning or farm state.
2. Only authorized administrators may modify published learning content or simulation rules.
3. A simulation action that exceeds available resources shall be rejected and shall not change the farm state.
4. The simulation score shall be computed from configured rules rather than manual administrator edits after the 
fact.
5. Educational content and simulator rules SHALL be versionable so that changes do not silently invalidate 
completed records where historical accuracy matters.
6. AI-generated advice, when present, is advisory and never overrides configured simulation logic.
6. Other Requirements
The following additional requirements apply to data organization, deployment, and future extension. The database 
SHALL represent users, content, simulation entities, and historical actions in a way that supports referential 
Page 11
Page 12
integrity at the application layer. The application SHOULD support seed data for development and demonstration. 
Configuration values such as XP thresholds, crop parameters, and action costs SHOULD be stored outside source
code conditionals whenever practical.
Appendix A: Glossary
Term Definition
Organic Farming An agricultural approach emphasizing ecological processes, 
responsible soil and resource management, and avoidance of 
synthetic inputs where the selected standard or scenario 
prohibits them.
Simulation A controlled software model that represents selected farming 
decisions and their effects over time.
Farm State The current collection of measurable variables describing a 
virtual farm.
Simulation Rule A configurable relationship that changes one or more farm 
variables in response to an action or event.
Crop Stage A simulated position in the crop growth lifecycle used to 
determine allowed actions or outcomes.
XP Experience points used to represent user progression and 
support gamification.
Challenge A bounded simulation or learning task with explicit objectives 
and constraints.
Soil Health A simplified simulation indicator representing the health or 
quality of the virtual soil, not a laboratory measurement.
Pest Risk A simplified simulation indicator representing the likelihood or 
severity of pest pressure in the current scenario.
MERN MongoDB, Express.js, React, and Node.js.
Appendix B: Analysis Models
The following high-level analysis models are included to clarify the intended system structure. They are logical 
models, not implementation-specific UML diagrams.
B.1 High-Level Architecture
Learner/Admin -> React Web Client -> Express/Node.js API -> {Authentication, Learning Services, Simulation 
Engine, Gamification, Reporting} -> MongoDB. Optional external services such as AI or weather are connected 
through backend service adapters and are not allowed to directly modify simulation state.
B.2 Core Data Entities
Entity Key Relationships
User Owns farms; has progress, quiz attempts, XP, badges, and role.
Course Contains many lessons; may contain quizzes.
Lesson Belongs to a course; contributes to user progress.
Quiz Attempt Belongs to a user and quiz; stores score and timestamp.
Crop Referenced by farms and simulation rules.
Farm Belongs to a user and scenario; contains current simulation 
state.
Farm Action Belongs to a farm; records an action and its effect.
Simulation Rule Defines how actions/events modify simulation variables.
Challenge Defines goals, constraints, and scoring rules.
Badge Represents an earned achievement.
B.3 Representative Farm State Flow
1. Initialize scenario and crop.
2. Load starting state: soil, water, budget, crop stage, health, pest risk.
3. Accept a valid user action.
4. Apply configured cost and effect rules.
5. Advance state or growth stage when applicable.
6. Generate event(s) such as pest pressure or weather effect when configured.
7. Persist action and resulting state.
8. Evaluate objectives and calculate current score.
9. At completion/harvest, calculate yield and economic outcomes and store the final report.
Appendix C: To Be Determined List
1. Exact institutional/project team name and author names for the cover page.
2. Final list of initial crops and authoritative educational content sources.
3. Final numerical values for crop water needs, growth periods, input costs, yield factors, and simulation effects.
4. Whether an external weather API will be included in the release.
5. Whether an external AI service will be included in the release, and which provider/model will be used.
6. Final hosting/deployment environment and domain.
7. Final accessibility target and browser support matrix.
8. Whether leaderboard functionality is required for the assessed release.
Document status: Draft baseline for review.