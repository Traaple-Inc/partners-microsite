// Traaple Partner Microsite Behaviour
//
// This script customises the partner microsite based on URL parameters.
// It updates the headline, subtext, earnings example and referral links
// according to the partner type and referral code provided in the query
// string. If no parameters are specified, it defaults to the Influencer
// copy and a placeholder referral code. The form submission is handled
// locally with a simple thank you alert; integration with an external
// CRM or backend can be added later.

document.addEventListener('DOMContentLoaded', function () {
  // Parse query parameters
  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get('type');
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
  const supportedTypes = ['influencer', 'hotel', 'venue'];
  
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
      solutionHeading: 'With Traaple, your posts become bookable experiences. Earn commission every time someone books.',
      solutionContent: 'Connect your social media presence to real bookable experiences and start earning from every recommendation.',
      demoHeading: 'Example of influencer posts',
      demoPosts: [
        {
          username: '@sarah_travels',
          avatar: 'ST',
          content: 'Just discovered this hidden gem in Bali! The sunset views are incredible 🌅',
          cta: 'Book this experience'
        },
        {
          username: '@foodie_mike',
          avatar: 'FM',
          content: 'Best pasta I\'ve ever had! This chef\'s table experience was unforgettable',
          cta: 'Book this restaurant'
        },
        {
          username: '@adventure_alex',
          avatar: 'AA',
          content: 'Epic hiking trail with the most amazing views! Perfect for adventure seekers',
          cta: 'Book this hike'
        },
        {
          username: '@luxury_lisa',
          avatar: 'LL',
          content: 'Weekend getaway at this boutique hotel was pure bliss. Highly recommend!',
          cta: 'Book this hotel'
        }
      ]
    },
    hotel: {
      title: 'Traaple Hotel Partners',
      headline: 'Enhance guest stays and earn more',
      subtext:
        'You don\'t always have answers when guests ask "What can I do nearby?"',
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
      problemContent: 'Guests constantly ask for local recommendations, putting pressure on your staff and potentially impacting guest satisfaction.',
      solutionHeading: 'Guests book experiences. You earn a share instantly.',
      solutionContent: 'QR codes in rooms provide instant access to curated local experiences. Your guests get great recommendations, and you earn commission on every booking.',
      demoHeading: 'Flyer → Experience booking',
      demoPosts: [
        {
          username: 'Hotel Room 205',
          avatar: 'QR',
          content: 'Scan QR code to discover amazing local experiences',
          cta: 'View Experiences'
        },
        {
          username: 'Guest Experience',
          avatar: 'GE',
          content: 'Book guided city tours, local restaurants, and cultural activities',
          cta: 'Book Now'
        }
      ]
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
      problemHeading: 'Hard to fill events & drive consistent traffic.',
      problemContent: 'Empty tables and low attendance at events directly impact your revenue and reputation.',
      solutionHeading: 'List your events/tables on Traaple. Customers discover & pre-book.',
      solutionContent: 'Get discovered by customers looking for dining and entertainment experiences. Fill your venue with pre-booked guests.',
      demoHeading: 'Event listing → Ticket booking',
      demoPosts: [
        {
          username: 'Traaple Events',
          avatar: 'TE',
          content: 'Jazz Night at Sunset Lounge - Live music, cocktails, and great vibes',
          cta: 'Buy Tickets'
        },
        {
          username: 'Table Bookings',
          avatar: 'TB',
          content: 'Reserve your table for Chef\'s Special Dinner this Saturday',
          cta: 'Book Table'
        }
      ]
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

  // Update page title
  if (data.title) {
    document.title = data.title;
  }

  // Update logo and body class based on industry type (only venue gets dark background)
  const logo = document.querySelector('.logo-img');
  document.body.className = ''; // Reset classes
  
  if (type === 'venue') {
    if (logo) logo.src = 'assets/logo-white.svg';
    document.body.classList.add('venue-bg');
  } else {
    if (logo) logo.src = 'assets/logo.svg';
  }

  // Update hero text
  document.getElementById('heroHeadline').textContent = data.headline;
  document.getElementById('heroSubtext').textContent = data.subtext;

  // Update hero background image
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    // Use a slightly lighter gradient overlay on top of the hero image so that
    // the underlying photo remains visible while still providing sufficient
    // contrast for the white text. Adjust the alpha values here to taste.
    heroSection.style.backgroundImage =
      `linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.25)), url('${data.ctaBackground}')`;
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

  // Update earnings example
  document.getElementById('earningsExample').textContent = data.example;

  // Update tab content
  updateTabContent(data);

  // Initialize tabs
  initializeTabs();


  // Update form labels and placeholders
  document.querySelector('label[for="name"]').textContent = data.formLabels.name;
  document.querySelector('label[for="organization"]').textContent = data.formLabels.organization;
  document.querySelector('label[for="phone"]').textContent = data.formLabels.phone;

  // Show/hide form fields based on partner type
  const platformDropdown = document.getElementById('platform');
  const locationGroup = document.getElementById('locationGroup');
  const propertyTypeGroup = document.getElementById('propertyTypeGroup');
  const nicheGroup = document.getElementById('nicheGroup');
  const phoneField = document.getElementById('phone');
  const phoneLabel = document.querySelector('label[for="phone"]');
  
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

  // Add click handlers for CTAs - scroll to form instead of external redirect
  document.getElementById('heroCTA').addEventListener('click', (e) => {
    e.preventDefault();
    scrollToForm();
  });
  document.getElementById('ctaHeader').addEventListener('click', (e) => {
    e.preventDefault();
    scrollToForm();
  });
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
      const submitData = {
        name: formData.get('name'),
        email: formData.get('email'),
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
        const response = await fetch('https://api.traaple.com/api/partners/register', {
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
    problemContent.innerHTML = `
      <h3>${data.problemHeading}</h3>
      <p>${data.problemContent}</p>
    `;
  }

  // Update solution content
  const solutionContent = document.getElementById('solutionContent');
  if (solutionContent && data.solutionHeading) {
    solutionContent.innerHTML = `
      <h3>${data.solutionHeading}</h3>
      <p>${data.solutionContent}</p>
    `;
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

  // Update demo content
  const demoContent = document.getElementById('demoContent');
  if (demoContent && data.demoPosts) {
    demoContent.innerHTML = '';
    data.demoPosts.forEach(post => {
      const demoPost = document.createElement('div');
      demoPost.className = 'demo-post';
      demoPost.innerHTML = `
        <div class="post-header">
          <div class="avatar">${post.avatar}</div>
          <div class="username">${post.username}</div>
        </div>
        <div class="post-content">${post.content}</div>
        <button class="cta-button">${post.cta}</button>
      `;
      demoContent.appendChild(demoPost);
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