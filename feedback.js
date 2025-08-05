document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('id');
  const role = params.get('role');

  const testimonialEl = document.getElementById('testimonial');
  const feedbackEl = document.getElementById('coachingFeedback');
  const consentWebsiteEl = document.getElementById('consentWebsite');
  const consentDirectoryEl = document.getElementById('consentDirectory');
  const consentSocialEl = document.getElementById('consentSocial');
  const consentContactEl = document.getElementById('consentContact');
  const saveBtn = document.getElementById('saveDraft');
  const submitBtn = document.getElementById('submitFeedback');
  const messageEl = document.querySelector('.message');
  const peerSection = document.getElementById('peerFeedback');
  const peerTestimonialEl = document.getElementById('peerTestimonial');
  const peerCoachingEl = document.getElementById('peerCoaching');
  const peerConsentList = document.getElementById('peerConsent');

  // Load sessions from localStorage
  const sessions = JSON.parse(localStorage.getItem('sessions') || '{}');
  const session = sessions[sessionId];

  // Validate session and role
  if (!session || (role !== 'a' && role !== 'b')) {
    messageEl.textContent = 'Invalid session link.';
    messageEl.classList.remove('hidden');
    return;
  }

  // Determine current and peer coach
  const currentKey = role === 'a' ? 'coachA' : 'coachB';
  const peerKey = role === 'a' ? 'coachB' : 'coachA';
  const coach = session[currentKey];
  const peer = session[peerKey];

  // Prefill draft values if available
  if (coach.testimonial) testimonialEl.value = coach.testimonial;
  if (coach.feedback) feedbackEl.value = coach.feedback;
  if (coach.consent) {
    consentWebsiteEl.checked = !!coach.consent.website;
    consentDirectoryEl.checked = !!coach.consent.directory;
    consentSocialEl.checked = !!coach.consent.social;
    consentContactEl.checked = !!coach.consent.contact;
  }

  // Helper to toggle form disabled state
  function disableForm() {
    testimonialEl.disabled = true;
    feedbackEl.disabled = true;
    consentWebsiteEl.disabled = true;
    consentDirectoryEl.disabled = true;
    consentSocialEl.disabled = true;
    consentContactEl.disabled = true;
    saveBtn.style.display = 'none';
    submitBtn.style.display = 'none';
  }

  // Display peer information when both submitted
  function showPeerFeedback() {
    peerTestimonialEl.textContent = peer.testimonial;
    peerCoachingEl.textContent = peer.feedback;
    // Clear previous list
    peerConsentList.innerHTML = '';
    const mapping = {
      website: 'Website',
      directory: 'Coaching directories',
      social: 'Social media',
      contact: 'Future contact for review'
    };
    for (const key in peer.consent) {
      if (peer.consent[key]) {
        const li = document.createElement('li');
        li.textContent = mapping[key];
        peerConsentList.appendChild(li);
      }
    }
    peerSection.classList.remove('hidden');
  }

  // If coach already submitted, disable form and show message
  if (coach.submitted) {
    disableForm();
    if (peer.submitted) {
      messageEl.textContent = 'Both feedbacks have been submitted. See your peer\'s feedback below.';
      showPeerFeedback();
    } else {
      messageEl.textContent = 'You have submitted your feedback. Waiting for your peer.';
    }
    messageEl.classList.remove('hidden');
  }

  // Save draft handler
  saveBtn.addEventListener('click', () => {
    coach.testimonial = testimonialEl.value;
    coach.feedback = feedbackEl.value;
    coach.consent = {
      website: consentWebsiteEl.checked,
      directory: consentDirectoryEl.checked,
      social: consentSocialEl.checked,
      contact: consentContactEl.checked
    };
    sessions[sessionId][currentKey] = coach;
    localStorage.setItem('sessions', JSON.stringify(sessions));
    messageEl.textContent = 'Draft saved.';
    messageEl.classList.remove('hidden', 'warning');
    messageEl.classList.add('success');
  });

  // Submit handler
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    coach.testimonial = testimonialEl.value;
    coach.feedback = feedbackEl.value;
    coach.consent = {
      website: consentWebsiteEl.checked,
      directory: consentDirectoryEl.checked,
      social: consentSocialEl.checked,
      contact: consentContactEl.checked
    };
    coach.submitted = true;
    sessions[sessionId][currentKey] = coach;
    localStorage.setItem('sessions', JSON.stringify(sessions));

    disableForm();

    if (peer.submitted) {
      messageEl.textContent = 'Both feedbacks submitted. See your peer\'s feedback below.';
      showPeerFeedback();
    } else {
      messageEl.textContent = 'Feedback submitted. Waiting for your peer.';
    }
    messageEl.classList.remove('hidden');
  });

  // Show peer feedback if both already submitted
  if (coach.submitted && peer.submitted) {
    showPeerFeedback();
  }
});
