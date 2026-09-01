# Gran's House Tattoos

A bespoke, production-grade visual identity and serverless booking platform for an Edinburgh-based tattoo studio. This project reimagines traditional, high-end heritage styling with a lighter, welcoming "Gran's house" aesthetic — complete with tea, shortbread, and quirky embellishments — backed by a modern, highly performant edge computing infrastructure.

---

## ✨ Project Highlights

- **Breaking the Grid**: Incorporates bespoke side visual elements (teapots, Irn-Bru cans, floor lamps, and vintage knick-knacks) that dynamically break out of the central layout container to create a layered, organic aesthetic.
- **Scroll Parallax & Motion**: Subtle vertical parallax shifts and scroll-reveal transitions provide visual depth while remaining strictly performance-optimised.
- **Heritage Styling**: Custom procedural gingham and tartan patterns engineered using modern CSS gradients to pay homage to Scottish heritage without feeling dated.
- **Responsive Architecture**: Carefully designed across all viewport breakpoints, ensuring side embellishments scale proportionally or tuck away cleanly on mobile devices.
- **Serverless Edge Backend**: Custom-built endpoint handling form validation, multi-recipient transactional email delivery, and cloud media storage with zero server maintenance.
- **Intelligent Multi-Artist Routing**: Parses client selections to dynamically route enquiry payloads to the relevant resident artist's inbox alongside the main studio management.
- **Cloud Media Pipeline**: Client reference images are ingested and persisted directly to object storage at the edge, embedding clean preview links directly inside HTML notifications.

---

## 🛠️ Architecture & Technology Stack

### Frontend
- **HTML5**: Semantic, accessible markup optimised for SEO, performance, and screen readers.
- **CSS3**: Vanilla design system leveraging CSS Custom Properties (variables), complex gradients, CSS Grid, Flexbox, and fluid typography.
- **JavaScript (ES6+)**: Lightweight, framework-free scripts handling parallax math, intersection observers, mobile drawer navigation, and asynchronous `fetch` requests.

### Backend & Infrastructure
- **Compute**: **Cloudflare Workers** (V8-isolated edge runtime for handling API requests, sanitisation, and request orchestration).
- **Object Storage**: **Cloudflare R2** (S3-compatible, zero-egress-fee bucket storage for reference artwork and client attachments).
- **Email Delivery**: **Resend API** (Transactional email orchestration utilising rich HTML email templates).
- **Domain Security & DNS**: Fully configured SPF, DKIM, DMARC, and CORS policies on custom domain names for robust deliverability and security.

---

## ⚙️ Booking Engine & Data Flow

```
[ Client Form Submission (FormData + Files) ]
                       │
                       ▼
         [ Cloudflare Worker (Edge API) ]
           │                         │
           ├─────────────────────────┤
           ▼                         ▼
 [ Input Sanitisation ]   [ Stream Reference Files ]
           │                         │
           │                         ▼
           │             [ Cloudflare R2 Storage ]
           │                         │
           │             (Generates Public URLs)
           │                         │
           └───────────┬─────────────┘
                       ▼
          [ Artist Matrix Lookup ]
         (Studio Inbox + Artist Inbox)
                       │
                       ▼
             [ Resend API Endpoint ]
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
[ Studio Management ]      [ Assigned Artist ]
```

### Engineering Workflow Details:
1. **Payload Ingestion**: The client submits a multipart `FormData` payload containing form fields and uploaded reference files.
2. **Edge Processing**: The Cloudflare Worker intercepts the request, validates the input parameters, and streams image files into an R2 bucket using unique, collision-resistant keys.
3. **Recipient Resolution**: The worker evaluates the user's selected artist and maps the submission to the corresponding recipient email address, while automatically including the primary studio address in the distribution list.
4. **Transactional Delivery**: The worker compiles a structured HTML email containing client details and direct links to the uploaded R2 assets, then dispatches the payload via the Resend API.

---

## 📁 Key File Structure

```
├── /assets/
│   ├── /images/              # Optimised WebP/PNG assets and large grid-breaking elements
│   └── /icons/               # Vector iconography and UI accents
├── /worker/
│   ├── index.js              # Cloudflare Worker source (routing, R2 bindings & Resend logic)
│   └── wrangler.toml         # Cloudflare Worker deployment config & bucket bindings
├── index.html                # Main semantic single-page layout & booking form
├── style.css                 # Global design system, gingham gradients, and responsive layout
└── script.js                 # Client-side UI interactions, parallax scroll, and async form submission
```

---

## 🚀 Key Technical Challenges & Solutions

- **Zero-Server Binary Attachments**: Bypassed traditional server memory limits and email attachment size caps by directly streaming file uploads from Cloudflare Workers to Cloudflare R2 object storage, generating persistent reference URLs for the studio artists.
- **Dynamic Multi-Recipient Dispatch**: Constructed an edge-side routing matrix to handle separate artist communications seamlessly, removing the need for manual inbox triage by studio managers.
- **Fluid Visual Design**: Managed complex non-standard layouts using CSS `clamp()` functions and relative coordinate spaces, preserving layered illustrative aesthetics across ultra-wide monitors down to compact mobile viewports.

---

## 🍵 Background & Brand Identity

The studio name, Gran's House, is built on the warmth, comfort, and hospitality of home. The digital presence reflects this ethos through a soft, nostalgic palette of sky blue, warm red, and cream — deliberately subverting the intimidating, dark aesthetic common across traditional tattoo studio branding.