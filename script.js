// Traaple Partner Microsite Behaviour - Updated
//
// This script customises the partner microsite based on URL parameters.
// It updates the headline, subtext, earnings example and referral links
// according to the partner type and referral code provided in the query
// string. If no parameters are specified, it defaults to the Influencer
// copy and a placeholder referral code. The form submission is handled
// locally with a simple thank you alert; integration with an external
// CRM or backend can be added later.

// Standardised primary call-to-action label (global)
const CTA_TEXT = 'Click here to get started';

document.addEventListener('DOMContentLoaded', function () {
  // Parse query parameters
  const params = new URLSearchParams(window.location.search);
  // Allow static pages to specify partner via meta tag
  const metaType = document.head.querySelector('meta[name="partner-type"]')?.getAttribute('content');
  const typeParam = params.get('type') || metaType;
  const ref = params.get('ref') || 'YOUR_REF_CODE';
  
  // Validate URL parameters
  if (!typeParam) {
    // Show 404 error for no parameter
    document.body.innerHTML = `
      <div style="text-align: center; padding: 4rem; font-family: 'Inter', sans-serif;">
        <h1 style="font-size: 3rem; color: #333;">404</h1>
        <p style="font-size: 1.2rem; color: #666;">Page not found. Please specify a valid partner type.</p>
        <p style="color: #999;">Try: ?type=influencer, ?type=hotel, or ?type=venue</p>
      </div>
    `;
    return;
  }
  
  const type = typeParam.toLowerCase();
  const supportedTypes = ['influencer', 'hotel', 'venue', 'conference', 'blog', 'nightlife'];
  
  if (!supportedTypes.includes(type)) {
    // Show "Coming Soon" for unsupported types
    document.body.innerHTML = `
      <div style="text-align: center; padding: 4rem; font-family: 'Inter', sans-serif;">
        <h1 style="font-size: 2.5rem; color: #0057ff;">Coming Soon</h1>
        <p style="font-size: 1.2rem; color: #666;">We're working on adding support for "${typeParam}" partners.</p>
        <p style="color: #999;">Currently supported: Influencers, Hotels, and Venues</p>
        <a href="?type=influencer" style="color: #0057ff; text-decoration: none;">← Try our Influencer Program</a>
      </div>
    `;
    return;
  }

  /*
   * Data definitions for each partner type.  Each entry includes:
   * - headline, subtext: hero section copy
   * - steps: array of step objects with title and description
   * - example: earnings example text (may contain line breaks)
   * - benefits: array of bullet points (for hotel you get three extra points)
   * - formLabels: fields for Name, Org/Handle or Hotel Name etc.
   * - heroImage: relative path to the hero background image
   * - thankYouImage: relative path to the image shown in the thank‑you overlay
   * - secondaryHeadline, secondarySubtext: copy for the secondary call to action
   */
  // Partner definitions for every type.  Each entry contains hero copy, step text,
  // earnings examples, benefits, form labels and imagery.  Additional
  // partner types beyond influencer and hotel have been included below to
  // support venues, conferences, blogs and nightlife partners.
  const partnerData = {
    influencer: {
      title: 'Traaple Influencer Program',
      headline: 'Turn your influence into income',
      subtext:
        'You already post & share. Followers love your recommendations. But you don\'t earn.',
      steps: [
        {
          title: 'You post content',
          description: 'Share your favourite spots and experiences with your followers.'
        },
        {
          title: 'Link Traaple\'s page',
          description: 'Include your referral link in your content.'
        },
        {
          title: 'Your followers book an experience',
          description: 'They book directly through your unique link.'
        },
        {
          title: 'You earn instantly',
          description: 'You earn commissions on every booking – no extra effort.'
        }
      ],
      example:
        '10 followers book a ₵1,000 brunch = You earn ₵500 in commission.',
      benefits: [
        'Post what you love and earn — no extra effort.',
        'Reach an engaged audience who trusts your recommendations.',
        'Access real‑time dashboards to track referrals and earnings.',
        'Dedicated support to help you maximise your income.'
      ],
      formLabels: {
        name: 'Your Name',
        organization: 'Social Media Handle/Username',
        phone: 'Number of Followers/Subscribers',
        experiencePlaceholder: 'Content Niche (Travel, Food, Lifestyle, etc.)'
      },
      heroImage: 'assets/influencer_hero.jpg',
      thankYouImage: 'assets/influencer_hero.jpg',
      secondaryHeadline: 'Start monetizing your content now',
      secondarySubtext: 'Fill out the form below to join our program',
      ctaBackground: 'assets/influencer/bg.jpg',
      problemHeading: 'You already post & share. Followers love your recommendations. But you don\'t earn.',
      problemContent: 'You create amazing content and get great engagement, but struggle to monetize your influence effectively.',
      problemComposition: [
        { icon: 'assets/emojis/gradient-heart.png', size: '50px', top: '15px', left: '35%', rotation: '-15deg' },
        { icon: 'assets/emojis/gradient-heart.png', size: '70px', top: '30px', left: '50%', rotation: '20deg', transform: 'translateX(-50%)' },
        { icon: 'assets/emojis/gradient-heart.png', size: '45px', top: '45px', right: '35%', rotation: '0deg' }
      ],
      solutionHeading: 'With Traaple, your posts become bookable experiences. Earn commission every time someone books.',
      solutionContent: 'Connect your social media presence to real bookable experiences and start earning from every recommendation.',
      solutionComposition: [
        { icon: 'assets/emojis/money-bag.png', size: '65px', top: '25px', left: '50%', rotation: '0deg', transform: 'translateX(-50%)' },
        { icon: 'assets/emojis/confetti.png', size: '40px', top: '20px', left: '30%', rotation: '-10deg' },
        { icon: 'assets/emojis/confetti.png', size: '35px', top: '30px', right: '30%', rotation: '15deg' }
      ],
    },
    hotel: {
      title: 'Traaple Hotel Partners',
      headline: 'Enhance guest stays and earn more',
      subtext:
        'You don\'t always have answers when guests ask “What can I do nearby in Accra, Lagos or Nairobi?”',
      steps: [
        {
          title: 'Guest scans QR code',
          description: 'Place QR codes in your hotel rooms and lobbies.'
        },
        {
          title: 'Guest visits Traaple page',
          description: 'Guests discover curated local experiences.'
        },
        {
          title: 'Guest books an experience',
          description: 'They book instantly through the platform.'
        },
        {
          title: 'You earn instantly',
          description: 'You earn a commission automatically on every booking.'
        }
      ],
      example: 'For every guest who books a ₵2,000 tour, you get an extra ₵100.',
      benefits: [
        'QR codes in rooms provide instant local recommendations.',
        'Concierge support helps guests book experiences.',
        'Guests book experiences while you earn a share instantly.',
        'We manage bookings, payments and support for you.'
      ],
      formLabels: {
        name: 'Your Name',
        organization: 'Hotel/Property Name',
        phone: 'Number of Rooms',
        experiencePlaceholder: 'Property Type (Hotel, Resort, etc.)'
      },
      heroImage: 'assets/hotel_hero.jpg',
      thankYouImage: 'assets/hotel_hero.jpg',
      secondaryHeadline: 'Transform your guest stays now',
      secondarySubtext: 'Fill out the form below to join our program',
      ctaBackground: 'assets/hotel/bg.jpg',
      problemHeading: 'You don\'t always have answers when guests ask "What can I do nearby?"',
      problemContent: 'Across African cities, guests constantly ask for local recommendations, putting pressure on your staff and risking missed opportunities to delight.',
      problemComposition: [
        { icon: 'assets/emojis/hotel.png', size: '70px', top: '25px', left: '50%', rotation: '0deg', transform: 'translateX(-50%)' }
      ],
      solutionHeading: 'Guests book experiences. You earn a share instantly.',
      solutionContent: 'QR codes in rooms provide instant access to curated African experiences — food tours, safaris, nightlife and more. Guests get great recommendations while you earn on every booking.',
      solutionComposition: [
        { icon: 'assets/emojis/hotel.png', size: '65px', top: '30px', left: '50%', rotation: '0deg', transform: 'translateX(-50%)' },
        { icon: 'assets/emojis/star.png', size: '40px', top: '10px', left: '25%', rotation: '-20deg' },
        { icon: 'assets/emojis/star.png', size: '35px', top: '15px', right: '25%', rotation: '25deg' },
        { icon: 'assets/emojis/star.png', size: '30px', top: '70px', left: '30%', rotation: '10deg' },
        { icon: 'assets/emojis/star.png', size: '28px', top: '75px', right: '30%', rotation: '-15deg' }
      ],
    },
    venue: {
      title: 'Traaple Venues Program',
      headline: 'Sell more tables and tickets',
      subtext:
        'Hard to fill events & drive consistent traffic.',
      steps: [
        {
          title: 'List your venue on Traaple',
          description: 'Add your events and available tables to our platform.'
        },
        {
          title: 'App visitors see your listing',
          description: 'Customers discover your venue through the app.'
        },
        {
          title: 'App visitors book a reservation',
          description: 'They book tables and tickets directly.'
        },
        {
          title: 'Venue gets filled',
          description: 'Your venue fills up with pre-booked customers.'
        }
      ],
      example:
        'Guests spend ₵1,500 on a dinner package — you earn ₵300 in commission.',
      benefits: [
        'List your events/tables on Traaple for discovery.',
        'Customers discover & pre-book your experiences.',
        'Fill empty tables and time slots with high‑value bookings.',
        'We handle marketing, payments and support for you.'
      ],
      formLabels: {
        name: 'Your Name',
        organization: 'Venue Name',
        phone: 'Maximum Capacity',
        experiencePlaceholder: 'Venue Type (Restaurant, Bar, etc.)'
      },
      heroImage: 'assets/venue_hero.jpg',
      thankYouImage: 'assets/venue_hero.jpg',
      secondaryHeadline: 'Boost attendance. Get listed today',
      secondarySubtext: 'Fill out the form below to join our program',
      ctaBackground: 'assets/venue/bg.jpg',
      // Optional illustrative image to show in the Solution tab
      solutionImage: 'venuesolution.png',
      // Background image for the Problem tab card (venue only)
      problemBackgroundImage: 'assets/venue/problem-bg.jpg',
      problemHeading: 'Hard to fill events & drive consistent traffic.',
      problemContent: 'In African nightlife hubs — from Accra to Lagos and Nairobi — empty tables and low attendance on off‑peak nights directly impact revenue.',
      problemComposition: [
        { icon: 'assets/emojis/wine-glass.png', size: '60px', top: '30px', left: '50%', rotation: '0deg', transform: 'translateX(-50%)' }
      ],
      solutionHeading: 'List your events/tables on Traaple. Customers discover & pre-book.',
      solutionContent: 'Get discovered by customers looking for dining and entertainment across Africa. Fill your venue with pre‑booked guests in cities like Accra, Lagos, Nairobi and Cape Town.',
      // No emojis needed in Solution tab when image is present
      solutionComposition: null,
    },
    // Conference and event partners promote add‑on experiences to attendees.
    conference: {
      headline: 'Monetise Your Conference Attendees',
      subtext:
        'Offer curated experiences to your attendees and earn commissions on every booking.',
      steps: [
        {
          title: 'Promote Experiences',
          description: 'Share links or QR codes in your event materials and communications.'
        },
        {
          title: 'Attendees Book',
          description: 'Guests book tours, workshops and activities during or after the event.'
        },
        {
          title: 'Earn',
          description: 'You earn a commission on every booking automatically.'
        }
      ],
      example:
        '50 attendees book ₵3,000 activities — you earn ₵750 in commission.',
      benefits: [
        'Enhance your event with unforgettable add‑on experiences.',
        'Increase revenue without raising ticket prices.',
        'Access dashboards to track bookings and attendee engagement.',
        'Support for logistics, payments and customer service.'
      ],
      formLabels: {
        name: 'Name',
        organization: 'Conference / Event Name',
        phone: 'Phone Number',
        experiencePlaceholder: 'e.g. Tours, Workshops, Activities'
      },
      heroImage: 'assets/conference_hero.jpg',
      thankYouImage: 'assets/conference_hero.jpg',
      secondaryHeadline: 'Ready to elevate your event?',
      secondarySubtext: 'Partner with Traaple to offer curated experiences to attendees.',
      ctaBackground: 'assets/forest.png'
    },
    // Lifestyle blogs and media partners embed experiences into their content.
    blog: {
      headline: 'Turn Your Blog into a Revenue Stream',
      subtext:
        'Embed curated African experiences into your articles and earn when readers book.',
      steps: [
        {
          title: 'Create Content',
          description: 'Write about your favourite places and embed your referral link.'
        },
        {
          title: 'Readers Book',
          description: 'They book experiences directly through your blog or media page.'
        },
        {
          title: 'Earn',
          description: 'You earn commission on every confirmed booking.'
        }
      ],
      example:
        '20 readers book a ₵2,000 adventure — you earn ₵400 in commission.',
      benefits: [
        'Add value to your content with authentic travel recommendations.',
        'Engage your audience with bookable experiences.',
        'Track your earnings and bookings via dashboards.',
        'Dedicated support to optimise your monetisation strategy.'
      ],
      formLabels: {
        name: 'Name',
        organization: 'Blog / Media Name',
        phone: 'Phone Number',
        experiencePlaceholder: 'e.g. Travel, Culture, Food'
      },
      // Fall back to the influencer hero image until a dedicated blog hero is supplied.
      heroImage: 'assets/influencer_hero.jpg',
      thankYouImage: 'assets/influencer_hero.jpg',
      secondaryHeadline: 'Ready to monetise your content?',
      secondarySubtext: 'Partner with Traaple and turn your stories into bookings.',
      ctaBackground: 'assets/forest.png'
    },
    // Nightlife and entertainment partners promote experiences after dark.
    nightlife: {
      headline: 'Earn More from Every Night Out',
      subtext:
        'Let patrons discover nightlife and entertainment experiences through your link and earn commissions.',
      steps: [
        {
          title: 'Promote Your Link',
          description: 'Display your referral link or QR codes in your bar, lounge or club.'
        },
        {
          title: 'Guests Book',
          description: 'They book exclusive events and experiences nearby.'
        },
        {
          title: 'Earn',
          description: 'You earn a commission on every booking — no extra staff needed.'
        }
      ],
      example:
        '5 patrons book a ₵1,500 nightlife experience — you earn ₵150.',
      benefits: [
        'Drive additional revenue from off‑peak hours.',
        'Offer guests curated nightlife experiences they’ll love.',
        'Real‑time dashboards to monitor your earnings.',
        'We handle bookings, payments and guest support.'
      ],
      formLabels: {
        name: 'Name',
        organization: 'Venue Name',
        phone: 'Phone Number',
        experiencePlaceholder: 'e.g. Bars, Parties, Live Music'
      },
      // Reuse the venue hero until a dedicated nightlife hero image is provided.
      heroImage: 'assets/venue_hero.jpg',
      thankYouImage: 'assets/venue_hero.jpg',
      secondaryHeadline: 'Ready to turn nights into revenue?',
      secondarySubtext: 'Partner with Traaple and monetise nightlife experiences.',
      ctaBackground: 'assets/forest.png'
    }
  };

  // Determine copy based on partner type; default to influencer if unspecified
  const data = partnerData[type] || partnerData.influencer;
  // Preserve the current partner type on the data object so the tab update logic
  // can adjust content rendering (e.g. hotel-specific layout)
  data.partnerType = type;

  // Update page title
  if (data.title) {
    document.title = data.title;
  }

  // Update Open Graph/Twitter metadata based on partner type
  updateOpenGraph(data);

  // Update logo; keep a consistent light background across types
  const logo = document.querySelector('.logo-img');
  document.body.className = ''; // Reset classes

  // Use the standard logo for all partner types (no dark theme for venue)
  if (logo) logo.src = 'assets/logo.svg';

  // Update hero text (if elements exist)
  const heroHeadline = document.getElementById('heroHeadline');
  const heroSubtext = document.getElementById('heroSubtext');
  if (heroHeadline) heroHeadline.textContent = data.headline;
  if (heroSubtext) heroSubtext.textContent = data.subtext;
  // Standardise CTA labels; header uses a shorter label
  const headerCTA = document.getElementById('ctaHeader');
  const heroCTA = document.getElementById('heroCTA');
  headerCTA && (headerCTA.textContent = 'Get started');
  heroCTA && (heroCTA.textContent = CTA_TEXT);

  // Update hero background image
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    // Use a slightly lighter gradient overlay on top of the hero image so that
    // the underlying photo remains visible while still providing sufficient
    // contrast for the white text. Adjust the alpha values here to taste.
    heroSection.style.backgroundImage =
      `linear-gradient(to bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.45)), url('${data.ctaBackground}')`;
  }

  // Update steps
  const stepContainers = document.querySelectorAll('.step');
  data.steps.forEach((step, index) => {
    if (stepContainers[index]) {
      const icon = stepContainers[index].querySelector('.step-icon');
      const titleEl = stepContainers[index].querySelector('h3');
      const descEl = stepContainers[index].querySelector('p');
      if (icon) icon.textContent = index + 1;
      if (titleEl) titleEl.textContent = step.title;
      if (descEl) descEl.textContent = step.description;
    }
  });

  // Update earnings example (if element exists)
  const earningsExample = document.getElementById('earningsExample');
  if (earningsExample) earningsExample.textContent = data.example;

  // Update tab content
  updateTabContent(data);

  // Initialize tabs
  initializeTabs();


  // Update form labels and placeholders (if they exist)
  const nameLabel = document.querySelector('label[for="name"]');
  const orgLabel = document.querySelector('label[for="organization"]');
  const phoneLabel = document.querySelector('label[for="phone"]');
  
  if (nameLabel && data.formLabels) nameLabel.textContent = data.formLabels.name;
  if (orgLabel && data.formLabels) orgLabel.textContent = data.formLabels.organization;
  if (phoneLabel && data.formLabels) phoneLabel.textContent = data.formLabels.phone;

  // Show/hide form fields based on partner type
  const platformDropdown = document.getElementById('platform');
  const locationGroup = document.getElementById('locationGroup');
  const propertyTypeGroup = document.getElementById('propertyTypeGroup');
  const nicheGroup = document.getElementById('nicheGroup');
  const phoneField = document.getElementById('phone');
  
  // Reset visibility
  [locationGroup, propertyTypeGroup, nicheGroup].forEach(group => {
    if (group) group.classList.add('hidden');
  });
  
  if (type === 'influencer') {
    platformDropdown?.classList.remove('hidden');
    nicheGroup?.classList.remove('hidden');
    if (platformDropdown) platformDropdown.required = true;
    if (phoneLabel) phoneLabel.textContent = 'Number of Followers/Subscribers';
  } else if (type === 'hotel') {
    platformDropdown?.classList.add('hidden');
    locationGroup?.classList.remove('hidden');
    propertyTypeGroup?.classList.remove('hidden');
    if (platformDropdown) platformDropdown.required = false;
    if (locationGroup) locationGroup.querySelector('input').required = true;
    if (propertyTypeGroup) propertyTypeGroup.querySelector('select').required = true;
    if (phoneLabel) phoneLabel.textContent = 'Number of Rooms';
  } else if (type === 'venue') {
    platformDropdown?.classList.add('hidden');
    locationGroup?.classList.remove('hidden');
    propertyTypeGroup?.classList.remove('hidden');
    if (platformDropdown) platformDropdown.required = false;
    if (locationGroup) locationGroup.querySelector('input').required = true;
    if (propertyTypeGroup) propertyTypeGroup.querySelector('select').required = true;
    if (phoneLabel) phoneLabel.textContent = 'Maximum Capacity';
  } else {
    platformDropdown?.classList.add('hidden');
    if (platformDropdown) platformDropdown.required = false;
    if (phoneLabel) phoneLabel.textContent = 'Phone Number';
  }

  // Update secondary CTA copy
  document.getElementById('secondaryHeadline').textContent = data.secondaryHeadline;
  document.getElementById('secondarySubtext').textContent = data.secondarySubtext;
  // Standardise form submit button label
  const formSubmit = document.querySelector('#partnerForm button[type="submit"]');
  formSubmit && (formSubmit.textContent = CTA_TEXT);

  // Secondary CTA section now uses solid background color (set in CSS)

  // Referral link for CTAs
  const referralLink = `https://traaple.com/signup?ref=${encodeURIComponent(ref)}`;

  // Function to scroll to the form section
  function scrollToForm() {
    const formSection = document.getElementById('partnerForm');
    if (formSection) {
      formSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Add click handlers for CTAs - scroll to form instead of external redirect (if elements exist)
  if (heroCTA) {
    heroCTA.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToForm();
    });
  }
  if (headerCTA) {
    headerCTA.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToForm();
    });
  }
  // Assign scroll behavior to the secondary CTA if it exists (the form has replaced this button on most pages)
  const secondaryCTAButton = document.getElementById('secondaryCTA');
  if (secondaryCTAButton) {
    secondaryCTAButton.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToForm();
    });
  }

  // Update thank you hero image
  const thankYouHero = document.querySelector('.thank-you-hero');
  if (thankYouHero) {
    thankYouHero.style.backgroundImage = `url('${data.thankYouImage}')`;
  }

  // Update footer year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Handle form submission
  const form = document.getElementById('partnerForm');
  if (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const email = formData.get('email');
      
      // Validate email has domain extension
      if (!email || !email.includes('@') || !email.includes('.') || 
          email.split('@')[1]?.split('.').length < 2 || 
          email.split('@')[1]?.split('.').some(part => part.length === 0)) {
        alert('Please enter a valid email address with a domain extension (e.g., user@example.com)');
        return;
      }
      
      const submitData = {
        name: formData.get('name'),
        email: email,
        organization: formData.get('organization'),
        location: formData.get('location') || null,
        phone: formData.get('phone'),
        platform: formData.get('platform') || null,
        propertyType: formData.get('propertyType') || null,
        niche: formData.get('niche') || null,
        partnerType: type,
        referralCode: ref
      };

      // Disable submit button during submission
      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';

      try {
        // Submit to API
        const response = await fetch('https://api.traaple.com/api/partnership-requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData)
        });

        if (response.ok) {
          // Show thank you overlay on success
          const overlay = document.getElementById('thankYouOverlay');
          if (overlay) {
            overlay.classList.remove('hidden');
          }
          // Reset form inputs
          form.reset();
        } else {
          // Handle API error
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        // Show error message to user
        alert('There was an error submitting your application. Please try again or contact support.');
      } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }

  // Add handler to close the thank you overlay when the close button is clicked
  const closeBtn = document.getElementById('closeThankYou');
  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      const overlay = document.getElementById('thankYouOverlay');
      if (overlay) {
        overlay.classList.add('hidden');
      }
    });
  }

  // Also close the overlay if user clicks outside of the content box
  const overlayEl = document.getElementById('thankYouOverlay');
  if (overlayEl) {
    overlayEl.addEventListener('click', function (event) {
      // If the click target is the overlay itself (not inside the content box), hide it
      if (event.target === overlayEl) {
        overlayEl.classList.add('hidden');
      }
    });
  }
});

// Function to update tab content based on industry data
function updateTabContent(data) {
  // Update problem content
  const problemContent = document.getElementById('problemContent');
  if (problemContent && data.problemHeading) {
    let problemEmojiHTML = '';
    // If a background image is provided for the problem card, skip emojis
    if (data.problemComposition && !data.problemBackgroundImage) {
      problemEmojiHTML = '<div class="emoji-composition">';
      data.problemComposition.forEach((emoji, idx) => {
        const styles = [
          `width: ${emoji.size}`,
          `height: ${emoji.size}`,
          // For influencer hearts, animate soft float by adjusting margin-top
          data.partnerType === 'influencer' && emoji.top ? `--top-base: ${emoji.top}` : `top: ${emoji.top}`,
          data.partnerType === 'influencer' ? 'top: var(--top-base)' : '',
          data.partnerType === 'influencer' ? 'margin-top: 0' : '',
          emoji.left ? `left: ${emoji.left}` : '',
          emoji.right ? `right: ${emoji.right}` : '',
          `transform: rotate(${emoji.rotation})${emoji.transform ? ` ${emoji.transform}` : ''}`
        ].filter(s => s).join('; ');

        const floatClasses = data.partnerType === 'influencer' ? ` class="float-emoji float-delay-${idx + 1}${idx === 1 ? ' float-emoji-lg' : ''}"` : '';
        problemEmojiHTML += `<img${floatClasses} src="${emoji.icon}" alt="Problem emoji" style="${styles}" />`;
      });
      problemEmojiHTML += '</div>';
    }
    
    // Optional top icon for venue when using a background image
    const topIconHTML = (data.partnerType === 'venue' && data.problemBackgroundImage)
      ? `<img class="problem-top-icon" src="assets/emojis/wine-glass.png" alt="Wine glass" />`
      : '';

    problemContent.innerHTML = `
      ${problemEmojiHTML}
      ${topIconHTML}
      <h3>${data.problemHeading}</h3>
      <p>${data.problemContent}</p>
    `;
    // Add optional background image styling for the problem card (venue)
    if (data.problemBackgroundImage) {
      problemContent.classList.add('bg-card');
      // Use the image directly without a dark overlay
      problemContent.style.backgroundImage = `url('${data.problemBackgroundImage}')`;
    } else {
      problemContent.classList.remove('bg-card');
      problemContent.style.backgroundImage = '';
    }

    // Add navigation button to go to Solution tab
    const toSolutionBtn = document.createElement('button');
    toSolutionBtn.className = 'cta-button panel-cta';
    toSolutionBtn.textContent = 'See Solution';
    toSolutionBtn.addEventListener('click', () => activateTab('solution'));
    problemContent.appendChild(toSolutionBtn);
  }

  // Update solution content
  const solutionContent = document.getElementById('solutionContent');
  if (solutionContent && data.solutionHeading) {
    let solutionEmojiHTML = '';
    if (data.solutionComposition) {
      solutionEmojiHTML = '<div class="emoji-composition">';
      data.solutionComposition.forEach(emoji => {
        const styles = [
          `width: ${emoji.size}`,
          `height: ${emoji.size}`,
          `top: ${emoji.top}`,
          emoji.left ? `left: ${emoji.left}` : '',
          emoji.right ? `right: ${emoji.right}` : '',
          `transform: rotate(${emoji.rotation})${emoji.transform ? ` ${emoji.transform}` : ''}`
        ].filter(s => s).join('; ');
        
        solutionEmojiHTML += `<img src="${emoji.icon}" alt="Solution emoji" style="${styles}" />`;
      });
      solutionEmojiHTML += '</div>';
    }
    
    // Optional illustrative image below the copy when provided (e.g., venue)
    const solutionImageHTML = data.solutionImage
      ? `<img class="solution-illustration" src="${data.solutionImage}" alt="Solution illustration" />`
      : '';

    solutionContent.innerHTML = `
      ${solutionEmojiHTML}
      <h3>${data.solutionHeading}</h3>
      <p>${data.solutionContent}</p>
      ${solutionImageHTML}
    `;
    // Add navigation button to go to How it Works
    const toHowBtn = document.createElement('button');
    toHowBtn.className = 'cta-button panel-cta';
    toHowBtn.textContent = 'How it works';
    toHowBtn.addEventListener('click', () => activateTab('how-it-works'));
    solutionContent.appendChild(toHowBtn);
  }

  // Update steps in how-it-works tab
  const tabStepList = document.getElementById('tabStepList');
  if (tabStepList && data.steps) {
    tabStepList.innerHTML = '';
    data.steps.forEach((step, index) => {
      const stepDiv = document.createElement('div');
      stepDiv.className = 'step';
      stepDiv.innerHTML = `
        <div class="step-icon">${index + 1}</div>
        <h3>${step.title}</h3>
        <p>${step.description}</p>
      `;
      tabStepList.appendChild(stepDiv);
    });
  }

}

// Function to initialize tab functionality
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      // Add active class to clicked button and corresponding panel
      button.classList.add('active');
      document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
  });
}

// Programmatically activate a tab by name (problem, solution, how-it-works)
function activateTab(tabName) {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  // Deactivate all
  tabButtons.forEach(btn => btn.classList.remove('active'));
  tabPanels.forEach(panel => panel.classList.remove('active'));
  // Activate target
  const button = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
  const panel = document.getElementById(`${tabName}-tab`);
  button?.classList.add('active');
  panel?.classList.add('active');
  // Ensure the tabs are scrolled into view
  panel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Update Open Graph/Twitter meta tags so shared links reflect the selected partner type.
function updateOpenGraph(data) {
  const setMeta = (key, value, isName = false) => {
    if (!value) return;
    const selector = isName ? `meta[name="${key}"]` : `meta[property="${key}"]`;
    let tag = document.head.querySelector(selector);
    if (!tag) {
      tag = document.createElement('meta');
      if (isName) tag.setAttribute('name', key); else tag.setAttribute('property', key);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', value);
  };

  const title = data.title || 'Traaple Partner Program';
  const description = `${data.headline} ${data.subtext}`.trim();
  // Prefer a purpose-made solution image for venue; otherwise use hero image or CTA background
  const image = data.solutionImage || data.heroImage || data.ctaBackground || 'assets/hero.png';
  const url = window.location.href;

  setMeta('og:type', 'website');
  setMeta('og:title', title);
  setMeta('og:description', description);
  setMeta('og:image', image);
  setMeta('og:url', url);

  setMeta('twitter:card', 'summary_large_image', true);
  setMeta('twitter:title', title, true);
  setMeta('twitter:description', description, true);
  setMeta('twitter:image', image, true);
}
