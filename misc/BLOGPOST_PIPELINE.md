# **📚 TheYarnMagpie: Post Creation Pipeline**

This document outlines the 3-step process for adding new content to the Blog section.

## **Step 1: Create the Markdown Content**
Create a new .md file in the /articles/ folder. Use a URL-friendly name (lowercase, no spaces, use hyphens).

**Template (/articles/your-file-name.md):**
# Your Catchy Title Here

Introductory paragraph that hooks the reader.

### Subheading (Use ### for smaller titles)
* **Bold point:** Use double asterisks for emphasis.
* List item 1
* List item 2

> Use the "greater than" symbol for a nice blockquote/tip box.

Final closing thoughts.


## **Step 2: Register in the Data File**
The website won't know the file exists until you "register" it. Open data/articles.json and add a new entry to the top of the list.

**Entry Template:**
{
"id": "your-unique-url-id",
"title": "Display Title of the Post",
"summary": "A short 1-2 sentence preview that shows on the list cards.",
"pillar": "The Maker's Studio",
"date": "2026-02-07",
"image": "../images/your-image.jpg",
"file": "../articles/your-file-name.md"
}


### **Pillar Options (Must match exactly):**
The Collector's Vault (Triggers Slate border & Shop CTA)
The Maker's Studio (Triggers Peach border & Pattern CTA)
The Strategist's Loom (Triggers Sage border & Blueprint CTA)

## **Step 3: Technical Reference (The "Under the Hood")**
To maintain the system, here is how the parts connect:
Component Responsibility
pages/blog.html The "Hub" – shows all articles in a list.
pages/blog-post.html The "Reader" – the blank template for every article.
js/loadBlogList.js Fetches articles.json to build the preview cards.
js/loadBlogPost.js Reads the ?id= in the URL, parses Markdown, and injects the CTA.
css/blog.css Handles all colors, card shapes, and text visibility (!important rules).

## ✅ Pre-Flight Checklist
**Images:** Are your images saved in /images/? (Remember to use ../images/ in the JSON).
**IDs:** Is the id in the JSON the same as what you want in the URL?
**Pillars:** Did you double-check the spelling of the Pillar name? (Case sensitive!)
**Target:** The system is set to target="_blank", so it will always open in a new tab.

## 🖼️ Step 4: Handling Images
1. ### **Featured Images (The Card Image)**
The image that appears on the main Blog list page is defined in articles.json.
Pathing: Use ../images/filename.jpg because the blog.html page is inside the /pages/ folder and needs to step "out" to find the images folder.
Ratio: Aim for horizontal (landscape) images for the best rectangular card look.

2. ### **Images Inside the Article (Markdown)**
To add images within the text of your post, use the standard Markdown syntax inside your .md file.
Format:
![Alternative Text Description](path/to/image.jpg)

### **⚠️ Critical Pathing Note:**
When the browser renders your blog post, it is technically "standing" inside pages/blog-post.html. Therefore, the image path inside your Markdown must be relative to the pages folder, not the articles folder.
Correct: ![My Crochet Basket](../images/basket.jpg)
Incorrect: ![My Crochet Basket](./images/basket.jpg)

3. ### **Image "Pro-Tip": Captions**
If you want to add a caption under an image, use an italicized line directly below the image in your Markdown file:
![Stitch Detail](../images/stitch-close-up.jpg)
*Close-up of the V-shape in the Waistcoat stitch.*

### **Summary Checklist for Images:**
1. Upload your image to the /images/ folder.
2. Reference it in articles.json for the preview card using ../images/.
3. Reference it in the .md file for the body content using ../images/.