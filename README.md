# Medlinkup survey

React + TypeScript survey site with a small Node API, referral tracking, an admin dashboard and Excel export.

## Run it
```bash
npm install
cp .env.example .env     # set ADMIN_PASSWORD (and Notion values, optional)
npm run dev              # site: http://localhost:5173  ·  admin: /admin
# production
npm run build && npm start   # serves everything on http://localhost:3001
```

## Store responses in Notion
1. Create an internal integration at notion.so/profile/integrations; copy the secret into `NOTION_TOKEN`.
2. Make an empty Notion page, ••• > Connections > add your integration. Put its ID in `NOTION_PARENT_PAGE_ID`.
3. `npm run setup:notion` creates the database (one column per question). Paste the printed `NOTION_DATABASE_ID` into `.env` and restart.

Without Notion variables, responses go to `data/responses.json`.

## Referral rules (see `server/referrals.ts`)
A referral is valid when it uses a real code, is from a different device than the referrer, is the first response from that device, and took at least 90 seconds (`shared/config.ts`). Ties go to whoever reached the count first.

## Things to edit
- `shared/config.ts`: gift description, contest closing wording, minimum duration.
- `src/components/Intro.tsx`: the terms text (have it reviewed before launch).
- `shared/questions.ts`: all questions and conditional logic.
