# Deploying quietkeep-web

The public marketing/catalog site. Checkout and email stay in GoHighLevel; this
site links out to GHL payment links and embeds the GHL updates form. Hosting the
**pages** moves to Vercel (or any Next.js host); GHL keeps everything else.

## One-time setup

1. **Create a Git remote** (this folder is already a local git repo, separate
   from the Falls Road repo). On GitHub, make a new **private** repo `quietkeep-web`, then:
   ```
   git remote add origin git@github.com:<you>/quietkeep-web.git
   git push -u origin main
   ```
2. **Import into Vercel** — vercel.com -> Add New -> Project -> pick the repo.
   Framework auto-detects as Next.js; the included `vercel.json` pins the commands.
3. **Set env vars** in Vercel -> Project -> Settings -> Environment Variables:
   - `NEXT_PUBLIC_GHL_FORM_URL` = the GHL "Quietkeep Updates" form embed URL
     (optional — without it the updates section shows a mailto link).
4. **Point the domain** — Vercel -> Project -> Settings -> Domains -> add
   `quietkeep.co`. Update DNS at your registrar per Vercel's instructions. This
   moves the domain off GoHighLevel to the new site. **(Owner action — this is
   the go-live step.)**

## Every launch after that

A push to `main` triggers a production deploy automatically. So adding a product
is:

1. `python _LAUNCH-OS/generators/qk_website.py products/<slug>.json --screens-dir … --demo …`
2. Author any CONTENT BRIEF TODOs in `content/products/<slug>.json` (incl. the
   GHL payment link).
3. `npx next build` to verify, then `git commit -am "add <product>" && git push`.

BUILD ≠ PUBLISH: the commit builds the page; the push (to the production branch)
is what makes it live.
