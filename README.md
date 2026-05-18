# IPT 2026 Angular Frontend

Angular 19 Auth Boilerplate — Email Sign Up with Verification, Authentication & Forgot Password.

## 🚀 Live Demo

| | Link |
|---|---|
| **Frontend App** | [https://ipt-2026-frontend.vercel.app/](https://ipt-2026-frontend.vercel.app/) |
| **Backend API** | [https://ipt-2026-backend.vercel.app/](https://ipt-2026-backend.vercel.app/) |

---

## Features

- Email sign up & verification
- JWT authentication with refresh tokens (auto-renews 1 min before expiry)
- Role-based access (Admin / User)
- Forgot password & reset password
- Profile view & update
- Admin panel — manage all accounts
- **Fake backend** (enabled in dev, disabled in production)

---

## Quick Start (Local)

```bash
git clone https://github.com/KeanCaballero/angular-auth-boilerplate.git
cd angular-auth-boilerplate
npm install
npm start
# → http://localhost:4200
```

The app runs with a **fake backend** by default — no real API needed.
After registering, a "verification email" link appears on-screen — click it to verify.
The **first account** created becomes Admin.

---

## Project Structure

```
src/app/
├── _components/        alert.component (global alerts)
├── _helpers/           app.initializer, auth.guard, jwt.interceptor,
│                       error.interceptor, fake-backend, must-match.validator
├── _models/            account, alert, role
├── _services/          account.service, alert.service
├── account/            login, register, verify-email, forgot-password, reset-password
├── admin/              overview, subnav
│   └── accounts/       list, add-edit
├── home/               home page
├── profile/            details, update
├── app.component.*     root component + nav bar
├── app.module.ts       root module (fake backend toggle)
└── app-routing.module.ts

src/environments/
├── environment.ts          dev  → http://localhost:4000
└── environment.prod.ts     prod → https://ipt-2026-backend.vercel.app
```

---

## Connecting to the Real Backend

When running against the real Node.js/MySQL API, the fake backend is automatically
disabled in production builds (`environment.production === true`).

For local development against a real backend, remove `fakeBackendProvider` from `src/app/app.module.ts`.

---

## Build for Production

```bash
npm run build
# Output: dist/ipt-2026-frontend/
```

---

## Deploy to Vercel (Static Site)

| Setting | Value |
|---------|-------|
| Framework Preset | Angular |
| Branch | main |
| Build Command | `npm run build` |
| Output Directory | `dist/ipt-2026-frontend` |

**SPA Routing (required):** Add a `vercel.json` in the root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Environment Variables

Production `environment.prod.ts` points to:

```ts
apiUrl: 'https://ipt-2026-backend.vercel.app'
```

---

## Routes

| Route | Description | Guard |
|-------|-------------|-------|
| `/` | Home | Auth |
| `/account/login` | Login | Public |
| `/account/register` | Register | Public |
| `/account/verify-email?token=...` | Verify email | Public |
| `/account/forgot-password` | Forgot password | Public |
| `/account/reset-password?token=...` | Reset password | Public |
| `/profile` | View profile | Auth |
| `/profile/update` | Edit profile | Auth |
| `/admin` | Admin overview | Admin only |
| `/admin/accounts` | Manage accounts | Admin only |
| `/admin/accounts/add` | Add account | Admin only |
| `/admin/accounts/edit/:id` | Edit account | Admin only |