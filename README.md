# চৌকুড়ী উচ্চ বিদ্যালয় (CHOWKURI HIGH SCHOOL) — অফিশিয়াল ওয়েবসাইট রিপোজিটোরি

এই ফোল্ডারটিতে **চৌকুড়ী উচ্চ বিদ্যালয়** (EIIN: 105876)-এর সিএমএস থেকে জেনারেটকৃত সম্পূর্ণ **Ready-to-Push** মাল্টি-পেজ ওয়েবসাইট, সকল ছবি, আইকন, টেক্সট এবং ডাটা সংরক্ষিত রয়েছে।

---

## গিটহাবে (GitHub) পুশ করার নিয়ম (Ready-to-Push Commands)

ডাউনলোড করা জিপ ফাইলটি আনজিপ (Unzip) করে ওই ফোল্ডারের ভেতরে টার্মিনাল/Git Bash খুলে নিচের কমান্ডগুলো রান করুন:

```bash
git init
git add .
git commit -m "Initial commit: CHOWKURI HIGH SCHOOL Official Website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### GitHub Pages বা Cloudflare Pages-এ লাইভ করার নিয়ম:
1. **GitHub Pages:** রিপোজিটোরির `Settings > Pages`-এ গিয়ে **Source** হিসেবে `Deploy from a branch (main / root)` অথবা `GitHub Actions` সিলেক্ট করলেই ওয়েবসাইটটি লাইভ হয়ে যাবে।
2. **Cloudflare Pages:** Cloudflare ড্যাশবোর্ড থেকে `Pages > Connect to Git` বা `Direct Upload`-এ এই ফোল্ডারটি দিলেই সাথে সাথে লাইভ হয়ে যাবে।

---

## ফোল্ডার স্ট্রাকচার:
- `/index.html` — হোম পেজ (স্লাইডার, নোটিশ বোর্ড, সভাপতি ও প্রধান শিক্ষকের বাণী, সাম্প্রতিক কার্যক্রম, সোস্যাল মিডিয়া অ্যাকটিভিটি, সেবাবক্স, জরুরি সেবা নম্বরসমূহ, শিক্ষক ক্যারোসেল, ল্যাব ও ক্যাম্পাস সুবিধা, ফটো গ্যালারি)
- `/about/index.html` — প্রতিষ্ঠান পরিচিতি ও ব্যানবেইস তথ্য পেজ
- `/notices/index.html` — ডিজিটাল নোটিশ বোর্ড পেজ
- `/teachers/index.html` — শিক্ষক ও কর্মচারী ডিরেক্টরি পেজ
- `/committee/index.html` — পরিচালনা পর্ষদ পেজ
- `/students/index.html` — শিক্ষার্থী পরিসংখ্যান ও উপবৃত্তি পেজ
- `/academics/index.html` — একাডেমিক ক্যালেন্ডার, রুটিন ও পোশাকবিধি পেজ
- `/facilities/index.html` — ভৌত অবকাঠামো, ল্যাব ও সহশিক্ষা পেজ
- `/charter/index.html` — সিটিজেন চার্টার পেজ
- `/gallery/index.html` — ফটো গ্যালারি পেজ
- `/admission/index.html` — অনলাইন ভর্তি আবেদন ও স্লিপ পেজ
- `/contact/index.html` — যোগাযোগ ও অনলাইন বার্তা পেজ
- `/assets/icons/` — প্রতিষ্ঠানের লোগো, ফেভিকন ও ৬টি সেবাবক্সের আইকন ফাইল
- `/assets/images/` — স্লাইডার, সাম্প্রতিক কার্যক্রম, সোস্যাল মিডিয়া পোস্ট, ল্যাব ও অবকাঠামো, সভাপতি, প্রধান শিক্ষক, সকল শিক্ষক-কর্মচারী ও গ্যালারির ছবি
- `/assets/data/school-data.json` — সকল তথ্যের স্ট্রাকচার্ড ডাটাবেজ ও `cms-backup.json`
- `/.nojekyll` ও `/.github/workflows/deploy-pages.yml` — স্বয়ংক্রিয় GitHub Pages ডিপ্লয়মেন্ট কনফিগারেশন
