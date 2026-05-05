# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## U Hack — Site & Admin Panel

This repository is the Vite + React site for the "U" Hack hackathon (FC Universitatea Cluj × GDGoC UTCN). It includes the public-facing website and a lightweight in-browser admin panel to manage hackathon data (schedule, themes, partners, team, submission rules, etc.).

---

## Quick start (dev)

1. Install dependencies:

```bash
cd /path/to/UHack_site
npm install
```

2. Start the dev server (default tries 5173):

```bash
npm run dev -- --port 5173
```

If port `5173` is already taken Vite will choose the next free port (e.g. `5174`). The terminal will show the exact URL — open it in your browser.

3. Open the site in your browser:

```
http://localhost:5173/   # or whichever port Vite reported
```

4. Admin panel:

```
http://localhost:5173/#admin
```

Default admin password is: `uhack2026` (change it from the Admin → General tab after first login).

Admin panel features:
- Edit General info (event name, dates, location, social links)
- Edit Schedule for each day (time, title RO/EN, description RO/EN, Google Meet link, type)
- Edit Themes (titles, descriptions, bullets, icon, color)
- Edit Submission rules and form link
- Manage Partners, Sponsors (tiers) and Team members
- Export / Import config JSON
- Reset to defaults

All edits are saved to `localStorage` immediately.

---

## Production

Build the production bundle:

```bash
npm run build
```

Preview the production build locally (example with `serve`):

```bash
npm install -g serve
serve -s dist
# open http://localhost:5000
```

---

## Project layout (important files)

- `src/` — React source code
	- `src/admin/` — Admin page + styles
	- `src/config/defaults.js` — Factory default configuration used by the admin
	- `src/context/ConfigContext.jsx` — Provider and hook for runtime config (reads/writes localStorage)
	- `src/context/AppContext.jsx` — Theme & language context
	- `src/components/` — UI components (Timeline, Tracks, Hero, Partners, Team, etc.)

---

## How data flows

- UI labels and section headings use the i18n strings defined in `src/i18n` (RO / EN).
- Hackathon data (schedule, themes, partners, team, prizes) are stored in `ConfigContext` (merged with `src/config/defaults.js`).
- Admin edits call `setFullConfig()` / `updateSection()` and persist to `localStorage` under key `uhack-config`.

---

## Troubleshooting

- If the site does not load, check which port Vite printed to the terminal.
- If `5173` is in use, either kill the process using it (`lsof -i :5173` → `kill <PID>`) or open the port Vite selected.
- If a component looks wrong after changes, try clearing localStorage (DevTools → Application → Local Storage → delete `uhack-config`) and reload.

---

## Suggested next features (ideas)

Below are practical suggestions to make the site/admin more powerful and production-ready. I grouped them by priority.

High priority (useful and low risk):
- Persist config to a backend instead of localStorage
	- Simple REST endpoint to GET/PUT config JSON (Node/Express or serverless function).
	- Allows multiple admins and persistent storage across devices.
- Authentication for admin
	- Replace the local password with JWT-backed auth or OAuth (Google) for admin access.
- Expose a read-only API for the public site
	- The public site could fetch a fresh config JSON from the server at runtime (caching + revalidate).

Medium priority (UX & reliability):
- Validation + preview in the admin
	- Real-time validation for dates, URLs, required fields; preview how changes will look on the site.
- Image uploader
	- Allow uploading partner/team logos (store in S3 or the hosting provider) instead of typing paths.
- Role-based admin interface
	- Viewer / Editor / Super-admin roles to limit who can change critical settings.

Longer-term / Nice-to-have:
- Live schedule / WebSocket updates
	- Broadcast schedule changes or announcements to participants during the event.
- Multi-event / Multi-city support
	- Add scoping to support multiple events/editions inside the same admin.
- Automatic backup/versioning of configs
	- Keep history of config changes and allow rollbacks.
- Integration with calendar (ICS) and messaging (Slack/Discord) for announcements and reminders.

---

If you'd like, I can implement the backend config persistence (a minimal Express endpoint + a simple JSON file store or Firestore), add authentication, or wire image uploads next. Tell me which feature you want to prioritize and I will scaffold it.

---

Happy hacking — open `http://localhost:5173/#admin` (or `:5174` if 5173 was occupied) and I can guide you through using the admin panel or implement the next feature you pick.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
