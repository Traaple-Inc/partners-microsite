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
  const type = (params.get('type') || 'influencer').toLowerCase();
  const ref = params.get('ref') || 'YOUR_REF_CODE';

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
      secondarySubtext: 'Click here to get started',
      ctaBackground: 'assets/influencer/bg.jpg'
    },
    hotel: {
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
      secondarySubtext: 'Click here to get started',
      ctaBackground: 'assets/hotel/bg.jpg'
    },
    venue: {
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
      secondarySubtext: 'Click here to get started',
      ctaBackground: 'assets/venue/bg.jpg'
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

  // Update benefits list
  const benefitsGrid = document.querySelector('.benefits-grid');
  if (benefitsGrid) {
    // Define inline SVG icons corresponding to each benefit. The icons are pulled from
    // Font Awesome’s solid set and embedded as strings so no external assets are required.
    const iconsSVG = [
      ''
    ];
    // Clear existing benefit cards
    benefitsGrid.innerHTML = '';
    data.benefits.forEach((benefit, idx) => {
      const card = document.createElement('div');
      card.className = 'benefit-card';
      const icon = document.createElement('div');
      icon.className = 'benefit-icon';
      // Inject the SVG icon for this benefit; the colour comes from CSS
      icon.innerHTML = iconsSVG[idx % iconsSVG.length];
      const textWrapper = document.createElement('div');
      const heading = document.createElement('h3');
      heading.textContent = benefit.split('.')[0];
      const paragraph = document.createElement('p');
      paragraph.textContent = benefit;
      textWrapper.appendChild(heading);
      textWrapper.appendChild(paragraph);
      card.appendChild(icon);
      card.appendChild(textWrapper);
      benefitsGrid.appendChild(card);
    });
  }

  // Update form labels and placeholders
  document.querySelector('label[for="name"]').textContent = data.formLabels.name;
  document.querySelector('label[for="organization"]').textContent = data.formLabels.organization;
  document.querySelector('label[for="phone"]').textContent = data.formLabels.phone;

  // Show/hide platform dropdown based on partner type
  const platformDropdown = document.getElementById('platform');
  if (platformDropdown) {
    if (type === 'influencer') {
      platformDropdown.classList.remove('hidden');
      platformDropdown.required = true;
    } else {
      platformDropdown.classList.add('hidden');
      platformDropdown.required = false;
    }
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
        organization: formData.get('organization'),
        phone: formData.get('phone'),
        platform: formData.get('platform') || null,
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