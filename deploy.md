# 🚀 Deployment Guide: granshouse.com

This guide outlines the exact steps to get the **Gran's House Tattoos** website live. Since the site is built with static HTML, CSS, and JavaScript, and uses Formspree for bookings, deployment is straightforward and free (or very low cost).

---

## ✅ Pre-Launch Checklist

Before pushing the site live, ensuring these final details are in place:

1.  **Instagram Feed**: 
    - The gallery currently uses a placeholder or an empty SnapWidget. 
    - Go to [SnapWidget.com](https://snapwidget.com), create a free "Instagram Grid" widget using the `@granshouse.tattoo` handle.
    - Copy the **Numeric ID** from the embed code and replace `YOUR_WIDGET_ID_HERE` on line 223 of `index.html`.
2.  **Formspree Verification**:
    - The booking form sends to `gran@tattoosatgranshouse.com`. 
    - Log in to [Formspree.io](https://formspree.io) and ensure this email is verified and the form "hash" in `index.html` is secondary to the email, or just use the email directly as configured.
3.  **Assets Check**:
    - Ensure all images in `/assets/` and the root directory (like the logos) are present and correctly named.

---

## 🛠️ Step 1: Choose a Hosting Provider

I recommend **Netlify** or **Vercel** for this project. They are the industry standard for static sites.

### Option A: Netlify (Easiest)
1.  Go to [Netlify.com](https://www.netlify.com) and create a free account.
2.  **Direct Upload**: You can literally drag and drop your project folder onto their "Deploys" page.
3.  **Git Integration (Recommended)**: Connect your GitHub/GitLab repository. Netlify will then automatically redeploy the site every time you push code changes.

### Option B: Vercel (Fast & Robust)
1.  Go to [Vercel.com](https://vercel.com) and sign up.
2.  Import your Git repository. It will automatically detect it's a static site and deploy it within seconds.

---

## 🌐 Step 2: Connect granshouse.com

Once your site is deployed to a temporary URL (e.g., `grans-house.netlify.app`), follow these steps to use your custom domain:

1.  **In Netlify/Vercel**: Go to **Domain Settings** and click "Add Custom Domain". Enter `granshouse.com`.
2.  **DNS Update**: You will need to log in to your domain registrar (wherever you bought the domain, e.g., Namecheap, GoDaddy, or Google Domains).
3.  **Point the Domain**:
    - **Recommended**: Switch your "Nameservers" to the ones provided by Netlify/Vercel. This lets the host manage SSL and optimization for you.
    - **Alternative**: Add an `A Record` pointing to the host's IP and a `CNAME Record` for the `www` version.
4.  **Wait for Propagation**: It can take anywhere from 1 to 24 hours for the new domain settings to spread across the internet.

---

## 🔒 Step 3: Enable SSL (HTTPS)

One of the best things about Netlify and Vercel is that they provide **Free SSL certificates** (via Let's Encrypt).
- Once the domain is connected, the host will automatically issue an SSL certificate.
- Ensure "Always use HTTPS" is toggled on in the host settings.

---

## 📈 Search Engine Optimization (SEO)

- The site is already optimized with meta tags and semantic HTML.
- **Sitemap**: Once live, you can generate a `sitemap.xml` using a free online tool and upload it to the root directory to help Google find all sections of the single-page site.
- **Google Search Console**: Submit `granshouse.com` to Google Search Console to monitor your ranking.

---

## 🍵 Final Polish

After deployment, visit `https://granshouse.com` on your phone and your computer:
- Test the booking form to make sure you receive the email.
- Check that the "massive" teapots and side elements are scaling correctly.
- Verify the Google Maps embed is showing the Edinburgh location correctly.

**Congrats! Gran's House is officially open for business.** ✦
