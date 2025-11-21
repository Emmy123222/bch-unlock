# BCH Unlock: Architecture and System Design

## 1. System Architecture
```mermaid
graph TD
    A[User] -->|1. Requests Content| B[React Frontend]
    B -->|2. Auth Check| C[Supabase Auth]
    C -->|3. Payment Required| D[Payment Flow]
    D -->|4. Generate Payment| E[Edge Function]
    E -->|5. Create Session| F[(PostgreSQL)]
    E -->|6. Return BCH Address| B
    B -->|7. Show QR Code| A
    A -->|8. Pay with Wallet| G[BCH Network]
    H[Blockchain Listener] -->|9. Detect Payment| F
    F -->|10. Grant Access| B

    sequenceDiagram
    participant U as User
    participant F as Frontend
    participant E as Edge Function
    participant L as Blockchain Listener
    participant D as Database
    participant B as BCH Network

    U->>F: Requests premium content
    F->>E: createPaymentSession()
    E->>D: Store pending payment
    E-->>F: Return BCH address + session ID
    F-->>U: Show QR code & amount

    U->>B: Sends BCH payment
    Note over B,L: Listener monitors address
    B-->>L: Transaction detected
    L->>E: verifyPayment(txHash)
    E->>D: Mark payment confirmed

    Note over F,D: Realtime or polling
    D-->>F: Payment confirmed
    F-->>U: Unlock premium content

    pie title Technology Stack
    "Frontend (React/TS)" : 35
    "Supabase (Auth/DB)" : 30
    "BCH Network" : 25
    "Edge Functions + Listener" : 10

    flowchart LR
    A[User Action] --> B[API Layer]
    B --> C[Business Logic]
    C --> D[Blockchain]
    D --> E[Database]
    E --> F[User Feedback]
    style A fill:#f9f,stroke:#333
    style F fill:#bbf,stroke:#333

    gantt
    title Development Timeline
    dateFormat  YYYY-MM-DD
    section Core Features
    Authentication       :done,    2025-11-15, 7d
    Payment Processing   :active,  2025-11-25, 10d
    Content Protection   :         2025-12-05, 14d
    section Future
    Multi-Currency       :         2025-12-20, 14d
    Mobile App           :         2026-01-10, 21d
    DAO Integration      :         2026-02-10, 30d

    graph LR
    A[User] -->|HTTPS| B[Cloudflare]
    B -->|WAF| C[Vercel]
    C -->|API Keys| D[Supabase]
    D -->|TLS| E[(Database)]
    D -->|JWT| F[Edge Functions]
    F -->|Web3| G[BCH Network]
    style A fill:#9f9,stroke:#333
    style G fill:#f96,stroke:#333

    classDiagram
    class Frontend {
        +handlePayment()
        +checkAccess()
        +renderContent()
    }
    class EdgeFunction {
        +createSession()
        +verifyPayment()
        +updateAccess()
    }
    class BlockchainListener {
        +monitorAddress()
        +notifyOnPayment()
    }
    Frontend --> EdgeFunction
    EdgeFunction --> BlockchainListener

    xychart-beta
    title "System Performance (Projected)"
    x-axis [v1, v2, v3, v4, v5]
    y-axis "Response Time (ms)" 0 --> 1000
    bar [520, 410, 320, 220, 140]
    line [120, 160, 190, 240, 280]

    journey
    title User Journey
    section Discover
      Visit Site: 5: User
      View Content Preview: 5: User
    section Pay
      Click Unlock: 5: User
      Select Wallet: 4: User
      Confirm Payment: 5: User
    section Consume
      Access Content: 5: User
      Share: 3: User

      stateDiagram-v2
    [*] --> Idle
    Idle --> Processing: Payment Started
    Processing --> Confirmed: Success
    Processing --> Failed: Error
    Failed --> Processing: Retry
    Confirmed --> [*]

    erDiagram
    USERS ||--o{ PAYMENTS : makes
    CONTENT ||--o{ PAYMENTS : unlocks
    USERS {
        string id PK
        string email
        timestamp created_at
    }
    PAYMENTS {
        string id PK
        string user_id FK
        string content_id FK
        float amount
        string status
        string tx_hash
        timestamp created_at
    }
    CONTENT {
        string id PK
        string title
        string description
        float price
    }