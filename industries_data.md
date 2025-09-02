# Traaple Industries Data - Complete Content and Context

This document contains all the content and context for all industries supported by the Traaple microsite platform.

## Overview

The Traaple microsite is a dynamic platform that adapts its content based on URL parameters to serve three main industries:
- **Influencers** (`?type=influencer`)
- **Hotels** (`?type=hotel`) 
- **Venues** (`?type=venue`)

---

## Influencer Industry

### Title
**Traaple Influencer Program**

### Main Message Cards
- **Pill 1:** "Turn your influence"
- **Pill 2:** "into income"
- **Emoji 1:** Confetti emoji (confetti.png)
- **Emoji 2:** Gradient heart + Money bag emojis

### Problem Section
**Heading:** "You already post & share. Followers love your recommendations. But you don't earn."

**Context:** Uses Instagram-style social media post mockup showing a travel content creator with hearts floating around the post to illustrate the problem of influence without monetization.

### Solution Section
**Heading:** "With Traaple, your posts become bookable experiences. Earn commission every time someone books."

**Visual:** Arrow-based flow chart showing the connection process between influencers and venues.

### How It Works (4 Steps)
1. **You post content**
2. **Link Traaple's page**
3. **Your followers book an experience**
4. **You earn instantly** (highlighted with star icon)

### Demo Section
**Heading:** "Example of influencer posts"

**Demo Posts:**
- **@sarah_travels:** Bali sunset post - "Just discovered this hidden gem in Bali! The sunset views are incredible 🌅" → "Book this experience"
- **@foodie_mike:** Pasta dish post - "Best pasta I've ever had! This chef's table experience was unforgettable" → "Book this restaurant"
- **@adventure_alex:** Mountain hiking post - "Epic hiking trail with the most amazing views! Perfect for adventure seekers" → "Book this hike"
- **@luxury_lisa:** Boutique hotel post - "Weekend getaway at this boutique hotel was pure bliss. Highly recommend!" → "Book this hotel"

### Call to Action
**Heading:** "Start monetizing your content now"
**Button:** "Click here to get started"

### Form Fields
When users click CTA, they fill out:
- Your Name (required)
- Email Address (required)
- Primary Platform (Instagram, TikTok, YouTube, Twitter/X, Facebook, LinkedIn, Other) (required)
- Social Media Handle/Username (required)
- Number of Followers/Subscribers (required)
- Content Niche (Travel, Food, Lifestyle, Fashion, Beauty, Fitness, Tech, Business, Other) (required)

---

## Hotel Industry

### Title
**Traaple Hotel Partners**

### Main Message Cards
- **Pill 1:** "Enhance guest stays"
- **Pill 2:** "and earn more"
- **Emoji 1:** Hotel emoji (hotel.png)
- **Emoji 2:** Stars + Chart emojis

### Problem Section
**Layout:** Custom hotel-specific speech bubble layout
**Content:** Three guest speech bubbles all asking "What can I do nearby?" from Guest A, Guest B, and Guest C
**Footer Text:** "You don't always have answers."

**Context:** Highlights the common challenge hotels face when guests repeatedly ask for local recommendations and activities.

### Solution Section
**Layout:** Custom hotel-specific two-column layout

**Left Column:**
- **QR codes in rooms** (with QR code icon)
- Plus icon connecting to
- **Concierge support** (with concierge image)

**Right Column:**
- Happy guests booking experiences image
- **Heading:** "Guests book experiences. You earn a share instantly"

### How It Works (4 Steps)
1. **Guest scans QR code**
2. **Guest visits Traaple page**
3. **Guest books an experience**
4. **You earn instantly** (highlighted with star icon)

### Demo Section
**Heading:** "Flyer > Experience booking"
**Content:** Two-panel mockup showing hotel room flyer with QR code leading to booking screen

### Call to Action
**Heading:** "Transform your guest stays now"
**Button:** "Click here to get started"

### Form Fields
When users click CTA, they fill out:
- Your Name (required)
- Email Address (required)
- Hotel/Property Name (required)
- Location/City (required)
- Number of Rooms (required)
- Property Type (Hotel, Resort, Boutique Hotel, B&B, Other) (required)

---

## Venue Industry

### Title
**Traaple Venues Program**

### Main Message Cards
- **Pill 1:** "Sell more tables"
- **Pill 2:** "and tickets"
- **Emoji 1:** Chef emoji (chef.png)
- **Emoji 2:** Money bag + Wine glass emojis

### Problem Section
**Layout:** Custom venue-specific full-screen layout with background image
**Heading:** "Hard to fill events & drive consistent traffic."
**Styling:** Large white text with text shadow over background image

**Context:** Addresses the core challenge venues face in consistently filling their events and driving foot traffic.

### Solution Section
**Layout:** Custom venue-specific layout

**Text:** "List your events/tables on Traaple. Customers discover & pre-book."
**Visual:** Placeholder for app mockup showing event listing and booking functionality

### How It Works (4 Steps)
1. **List your venue on Traaple**
2. **App visitors see your listing**
3. **App visitors book a reservation**
4. **Venue gets filled** (highlighted with star icon)

### Demo Section
**Heading:** "Flyer > Experience booking"
**Content:** Mockup of a Traaple event page with ticket purchase functionality

### Call to Action
**Heading:** "Boost attendance. Get listed today"
**Button:** "Click here to get started"
**Direct Link:** https://traaple.com (bypasses form modal)

### Form Fields
When users access the form, they fill out:
- Your Name (required)
- Email Address (required)
- Venue Name (required)
- Location/City (required)
- Maximum Capacity (required)
- Venue Type (Restaurant, Bar/Lounge, Event Space, Rooftop, Other) (required)

---

## Technical Implementation Details

### URL Parameter System
The site uses `?type=` parameter to determine which industry content to show:
- No parameter = 404 error
- Unsupported type = "Coming Soon" message
- Supported types: `influencer`, `hotel`, `venue`

### Visual Sections
Each industry uses different combinations of two main visual sections:
- **Section 1:** Light background slide
- **Section 2:** Dark overlay slide with industry-specific backgrounds

### Responsive Design
- **Desktop:** Scroll-snapping between sections with smooth transitions
- **Mobile:** Normal scrolling with all sections immediately visible

### Background Classes
- **Hotel:** `.hotel-bg` class for dark themed backgrounds
- **Venue:** `.venue-bg` class with special problem tab background (`.venue-problem-bg`)
- **Influencer:** Standard light theme

### Logo Variations
- **Hotel/Venue:** Uses white logo (`logo-white.svg`) for dark backgrounds
- **Influencer:** Uses standard logo (`logo.svg`) for light backgrounds

### Form Modal System
Each industry has a custom form modal that appears when users click the CTA button, with industry-specific fields and validation.

---

## Content Strategy by Industry

### Influencers
**Focus:** Monetization of existing social media presence
**Pain Point:** Creating content and getting engagement without earning
**Solution:** Commission-based earnings from follower bookings
**Target Audience:** Content creators with established followings

### Hotels
**Focus:** Enhanced guest experience and additional revenue
**Pain Point:** Guests constantly asking for local recommendations
**Solution:** QR codes in rooms leading to bookable local experiences
**Target Audience:** Hotel managers and guest experience teams

### Venues
**Focus:** Event marketing and table/ticket sales
**Pain Point:** Inconsistent event attendance and empty tables
**Solution:** Platform listing for discoverability and pre-booking
**Target Audience:** Restaurant owners, event space managers, bar operators

This comprehensive document captures all the content, context, and technical details for each industry served by the Traaple microsite platform.