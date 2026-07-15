# Putting quietkeep-web on GitHub (Quietkeep-owned)

This repo must live under a **Quietkeep-owned** GitHub account/org — **not** the
`Fallsroad` account this machine already has cached (brand separation). Two
gotchas this file solves: (1) picking the right owner, and (2) this machine's
Git will try to reuse the `Fallsroad` credentials unless you tell it otherwise.

The local repo is already initialized and committed — you only need to create
the remote and push.

---

## Step 1 — Decide the owner (one-time)

Pick ONE and keep Quietkeep there for good:

- **A personal GitHub account you treat as Quietkeep's**, or
- **A GitHub Organization named `quietkeep`** (cleaner long-term; create at
  github.com → your avatar → *Your organizations* → *New organization* → Free).

Do **not** use the `Fallsroad` org.

## Step 2 — Create an empty private repo

On GitHub, signed in as that owner:

1. Top-right **+** → **New repository**
2. **Owner:** the Quietkeep account/org from Step 1
3. **Repository name:** `quietkeep-web`
4. **Private** (recommended)
5. **Do NOT** add a README, .gitignore, or license (the repo already has them —
   adding here causes a push conflict)
6. **Create repository**

Copy the repo URL GitHub shows, e.g.
`https://github.com/<quietkeep-owner>/quietkeep-web.git`

## Step 3 — Authenticate as Quietkeep, not Falls Road

This machine has `Fallsroad` GitHub credentials in Windows Credential Manager, so
a plain push would try to use them. Do ONE of these:

**Option A — Personal Access Token (simplest).**
1. Signed in as the Quietkeep owner: GitHub → *Settings* → *Developer settings*
   → *Personal access tokens* → *Fine-grained tokens* → *Generate new token*.
2. Scope it to the `quietkeep-web` repo, **Contents: Read and write**. Copy the token.
3. When you push in Step 4, if prompted for a password, paste the **token**
   (not your GitHub password). If Windows silently reuses the Falls Road login,
   clear it first: *Control Panel → Credential Manager → Windows Credentials →*
   remove any `git:https://github.com` entry, then push and enter the Quietkeep
   username + token.

**Option B — put the token in the remote URL (no prompt).** Use this exact form
in Step 4 instead of the plain URL:
`https://<quietkeep-username>:<token>@github.com/<quietkeep-owner>/quietkeep-web.git`
(Token is stored in `.git/config` — fine for a private machine; rotate if shared.)

## Step 4 — Add the remote and push

From the repo folder
(`Desktop/11-businessesquietkeep/quietkeep-web`), in Git Bash:

```bash
git remote add origin https://github.com/<quietkeep-owner>/quietkeep-web.git
git branch -M main
git push -u origin main
```

Verify: refresh the GitHub repo page — you should see the files and 3 commits.

## Step 5 — Import to Vercel

Continue with `DEPLOY.md` from "Import into Vercel": add the repo, set
`NEXT_PUBLIC_GHL_FORM_URL`, and point the `quietkeep.co` domain. Use a Vercel
account/team that is **not** shared with Falls Road.

---

### Quick reference (fill the placeholders)

```bash
# from Desktop/11-businessesquietkeep/quietkeep-web
git remote -v                       # should be EMPTY before you start
git remote add origin https://github.com/QUIETKEEP_OWNER/quietkeep-web.git
git branch -M main
git push -u origin main
```

If `git remote -v` already shows a remote, remove it first:
`git remote remove origin`.
