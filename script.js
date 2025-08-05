document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const message = document.querySelector('.message');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Collect input values
    const coachAName = document.getElementById('coachAName').value.trim();
    const coachAEmail = document.getElementById('coachAEmail').value.trim();
    const coachBName = document.getElementById('coachBName').value.trim();
    const coachBEmail = document.getElementById('coachBEmail').value.trim();

    // Validate required fields
    if (!coachAName || !coachAEmail || !coachBName || !coachBEmail) {
      message.textContent = 'Please complete all fields.';
      message.classList.remove('hidden', 'success');
      message.classList.add('warning');
      return;
    }

    // Generate a unique session ID
    const sessionId = 'sess-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8);

    // Retrieve existing sessions from localStorage or initialize
    const sessions = JSON.parse(localStorage.getItem('sessions') || '{}');
    sessions[sessionId] = {
      coachA: {
        name: coachAName,
        email: coachAEmail,
        submitted: false,
        testimonial: '',
        feedback: '',
        consent: {}
      },
      coachB: {
        name: coachBName,
        email: coachBEmail,
        submitted: false,
        testimonial: '',
        feedback: '',
        consent: {}
      },
      created: new Date().toISOString()
    };

    // Save sessions back to localStorage
    localStorage.setItem('sessions', JSON.stringify(sessions));

    // Display success message with feedback links
    message.innerHTML = `
      <strong>Session created!</strong> Share these links with your peer coaches:<br>
      Coach A link: <a href="feedback.html?id=${sessionId}&role=a" target="_blank">Open feedback form</a><br>
      Coach B link: <a href="feedback.html?id=${sessionId}&role=b" target="_blank">Open feedback form</a>
    `;
    message.classList.remove('hidden', 'warning');
    message.classList.add('success');

    // Reset the form
    form.reset();
  });
});
