# 🚀 PROJECT ORION - COMPLETE DEPLOYMENT GUIDE

**From Code to Public Impact in 4 Phases**

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Deploy Platforms](#phase-1-deploy-platforms)
3. [Phase 2: Request Real Data](#phase-2-request-real-data)
4. [Phase 3: Launch Social Blitz](#phase-3-launch-social-blitz)
5. [Phase 4: Monitor & Iterate](#phase-4-monitor--iterate)
6. [Troubleshooting](#troubleshooting)
7. [Success Metrics](#success-metrics)

---

## Prerequisites

### Required:
- ✅ Node.js 18+ (`node -v`)
- ✅ npm 8+ (`npm -v`)
- ✅ Git installed
- ✅ Terminal access
- ✅ Email account (for ZDIJZ request)

### Optional but Recommended:
- Vercel account (free tier is fine)
- X/Twitter account
- Telegram account
- GitHub account (for forking/contributions)

---

## Phase 1: Deploy Platforms

**Time:** 30-45 minutes
**Goal:** Get both dashboards live on Vercel

### Option A: Automated (Recommended)

```bash
# Navigate to project root
cd /home/saba/Desktop/Saba_Place/project-orion

# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

The script will:
1. Check all prerequisites
2. Install Vercel CLI if needed
3. Deploy Karta Resonanc (visual map)
4. Deploy Orion Svetilnik (React dashboard)
5. Give you deployment URLs

### Option B: Manual (Step-by-Step)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```
Follow browser prompts to authenticate.

#### Step 3: Deploy Karta Resonanc
```bash
cd karta-resonanc
vercel --prod
```

When asked:
- Set up and deploy? → **Y**
- Link to existing? → **N**
- Project name? → **karta-resonanc** (or press Enter)
- Directory? → **./** (press Enter)
- Build command? → (leave empty, press Enter)
- Output dir? → (leave empty, press Enter)

**Result:** https://karta-resonanc-xxx.vercel.app

#### Step 4: Deploy Orion Svetilnik
```bash
cd ../orion-svetilnik
npm install
npm run build
vercel --prod
```

Same questions, same answers!

**Result:** https://orion-svetilnik-xxx.vercel.app

### Verify Deployments

Test both URLs in your browser:
- ✅ Karta Resonanc: Map loads, markers visible
- ✅ Orion Svetilnik: Dashboard loads, EHI data visible

---

## Phase 2: Request Real Data

**Time:** 10 minutes
**Goal:** Submit official ZDIJZ request to ARSO

### Step 1: Prepare Email

Open: `wolf-daemon/zdijz_email_ready.md`

Copy the email template and fill in:
- [TVOJE IME] → Your name
- [TVOJ EMAIL] → Your email
- [TVOJA ŠTEVILKA] → Your phone (optional)

### Step 2: Send Email

- **To:** info@arso.gov.si
- **Subject:** Zahteva za dostop do podatkov o kakovosti vode na reki Savi (ZDIJZ)
- **Body:** Paste your filled template

### Step 3: Wait for Response

- **Expected:** 5-15 days
- **Legal requirement:** ARSO must respond within 20 days
- **What you'll get:** CSV/Excel with real-time water quality data

### Step 4: Integrate Data (When Received)

Update `wolf-daemon/arso_connector.py` with real data:
```python
# Replace mock_data with actual ARSO data
real_data = parse_arso_csv('arso_response.csv')
```

Redeploy dashboards with updated data.

---

## Phase 3: Launch Social Blitz

**Time:** 1-2 hours
**Goal:** Maximize public awareness and platform traffic

### Before You Start

**Replace URLs in all templates!**
- Open: `social-blitz/x-thread-mercury-crisis.md`
- Open: `social-blitz/telegram-campaign.md`
- Find: `[YOUR VERCEL URL]`
- Replace with your actual Vercel URLs from Phase 1

### X/Twitter Campaign

**File:** `social-blitz/x-thread-mercury-crisis.md`

1. Copy all 10 posts
2. Post during peak hours (10-11 AM CET or 6-8 PM CET)
3. Post as thread (reply to your own tweets)
4. Attach visuals (EHI chart, water quality graphs)
5. Tag relevant accounts:
   - @ARSO_gov (if exists)
   - @Greenpeace_SI
   - Local environmental journalists

**Timing:**
- Post 1-10: All at once as thread
- Engagement: Reply to comments within first hour
- Follow-up: Share thread again 24 hours later

### Telegram Campaign

**File:** `social-blitz/telegram-campaign.md`

**Day 1:** Template 1 (Main Announcement)
- Post in Slovenian environmental groups
- Post English version in international groups
- Pin for 24 hours

**Day 2-3:** Templates 2-3 (Data & Accountability)
- Post data visualization
- Post corporate accountability

**Day 4-5:** Template 4 (Health Warning)
- Post in local community groups
- Tag health organizations

**Day 6-7:** Template 5 (Call to Action)
- Mobilize community
- Encourage ZDIJZ requests

---

## Phase 4: Monitor & Iterate

**Time:** Ongoing
**Goal:** Track impact, respond to feedback, improve

### Analytics to Track

**Vercel Dashboard:**
- Page views (both platforms)
- Unique visitors
- Geographic distribution
- Peak traffic times

**Social Media:**
- X impressions, retweets, replies
- Telegram views, forwards, comments
- Media mentions (news articles, blogs)

**ARSO Response:**
- Reply timeframe
- Data quality
- Follow-up needed?

### Iterate Based on Feedback

**If high traffic:**
- Add more monitoring stations
- Integrate additional data sources
- Improve UI/UX based on user feedback

**If media interest:**
- Prepare press kit
- Offer interviews
- Expand documentation

**If ARSO responds positively:**
- Integrate real-time data
- Establish ongoing data partnership
- Expand to other rivers

**If ARSO ignores/denies:**
- Document non-compliance
- Escalate to Information Commissioner
- Publicize non-cooperation

---

## Troubleshooting

### Vercel Deployment Fails

**Error:** "Project not found"
- **Fix:** Run `vercel login` again
- **Fix:** Delete `.vercel` folder, re-run deploy

**Error:** "Build failed"
- **Fix:** Check `npm run build` works locally
- **Fix:** Verify `package.json` has correct scripts

**Error:** "Domain already exists"
- **Fix:** Use different project name
- **Fix:** Delete old project in Vercel dashboard

### Social Media Issues

**Low engagement:**
- Post during peak hours (10-11 AM or 6-8 PM CET)
- Tag relevant accounts/groups
- Use visuals (charts, graphs)
- Engage with replies

**Negative feedback:**
- Stay professional
- Cite sources
- Focus on data, not personal attacks
- Redirect to platforms for full context

### ARSO Non-Response

**No reply after 20 days:**
1. Send follow-up email
2. File complaint with Information Commissioner
3. Document process on social media
4. Escalate to media

---

## Success Metrics

### 48 Hours After Launch

**Platforms:**
- ✅ 100+ unique visitors (both platforms combined)
- ✅ 50+ page views per platform
- ✅ No critical errors/downtime

**Social Media:**
- ✅ 100+ impressions (X thread)
- ✅ 10+ retweets
- ✅ 5+ replies/comments
- ✅ 50+ views (Telegram posts)

**ZDIJZ:**
- ✅ Confirmation email from ARSO

### 7 Days After Launch

**Platforms:**
- ✅ 500+ unique visitors
- ✅ 200+ page views per platform
- ✅ 5+ feedback submissions

**Social Media:**
- ✅ 1,000+ impressions
- ✅ 50+ retweets
- ✅ 10+ meaningful discussions
- ✅ 200+ views (Telegram)
- ✅ 1+ media mention

**ZDIJZ:**
- ✅ ARSO response received (or follow-up sent)

### 30 Days After Launch

**Platforms:**
- ✅ 2,000+ unique visitors
- ✅ Integration with real ARSO data
- ✅ Community contributions (forks, PRs)

**Social Media:**
- ✅ 5,000+ impressions
- ✅ 100+ retweets
- ✅ 5+ media mentions
- ✅ Ongoing community discussions

**ZDIJZ:**
- ✅ Real-time data integrated
- ✅ Other citizens submit ZDIJZ requests
- ✅ Government response/action

---

## Next Steps After Initial Launch

### Short-term (1-3 months):
- Integrate real ARSO data
- Add more monitoring stations
- Improve AI analyst modal (connect Anthropic API)
- Expand EHI to more companies
- Create API for developers

### Medium-term (3-6 months):
- Partner with environmental NGOs
- Present at conferences/events
- Publish academic paper on methodology
- Expand to other Slovenian rivers
- Mobile app development

### Long-term (6-12 months):
- EU-wide river monitoring network
- Open data advocacy toolkit
- Policy change proposals
- International collaborations
- Sustainability funding model

---

## Resources

### Technical:
- **Vercel Docs:** https://vercel.com/docs
- **React Docs:** https://react.dev
- **Leaflet.js:** https://leafletjs.com

### Legal:
- **ZDIJZ Law:** Official Gazette RS, No. 51/06
- **Information Commissioner:** https://www.ip-rs.si
- **Environmental Rights:** Aarhus Convention

### Data Sources:
- **ARSO:** http://www.arso.gov.si
- **E-PRTR:** https://prtr.eea.europa.eu
- **Company Reports:** Corporate sustainability pages

### Community:
- **GitHub Issues:** github.com/SabaFTW/project-orion/issues
- **Discussions:** github.com/SabaFTW/project-orion/discussions

---

## 🜂 Final Words

**This isn't just about deploying code.**

**This is about:**
- 🔥 Breaking the monopoly on truth
- 💰 Exposing corporate hypocrisy
- 🌊 Protecting Sava River ecosystem
- 📊 Democratizing environmental data
- ⚖️ Holding power accountable

**"Upanje ni prepričanje, da se bo nekaj dobro izteklo, temveč gotovost, da je nekaj smiselno, ne glede na to, kako se izteče." – Václav Havel**

---

**Status:** COMPLETE GUIDE
**Version:** 1.0.0
**Last Updated:** October 2025

🜂 Sava teče, resnica gori! 🔥

---

## Quick Command Reference

```bash
# Full deployment
cd /home/saba/Desktop/Saba_Place/project-orion
chmod +x deploy.sh
./deploy.sh

# Manual deployment
vercel login
cd karta-resonanc && vercel --prod
cd ../orion-svetilnik && npm install && npm run build && vercel --prod

# Test wolf-daemon
cd wolf-daemon
python3 arso_connector.py

# Check deployment status
vercel ls
```

---

**For questions, issues, or contributions:**
GitHub: github.com/SabaFTW/project-orion
