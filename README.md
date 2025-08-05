# Peer Coaching Feedback Exchange (Static Demo)

This repository contains a **static demo** of a peer coaching feedback tool. It is designed to illustrate the user interface and basic client-side logic for facilitating reciprocal feedback and testimonial exchange between two coaches. It does **not** include server‑side code or integrations (e.g. Supabase, Resend) due to network restrictions in this environment.

## Features

* **Session creation**: A coach can enter their details and their peer’s details to generate a unique session ID. The session data is stored in localStorage for demonstration purposes.
* **Feedback form**: Each coach accesses a feedback form via a link containing the session ID and role. They can write a client‑style testimonial, provide peer coaching feedback, and set consent options (e.g. website, directories, social media). Drafts can be saved and loaded.
* **Locked feedback**: Once a coach submits their feedback, it becomes read‑only. When both coaches have submitted, both entries are displayed.
* **Admin dashboard (demo)**: An admin login (username: `taitazak`, password: `asd321!`) reveals a simple overview of all sessions stored in localStorage and their completion status.

## How to Use

1. Open `index.html` in a browser. Enter your name/email and your peer’s name/email. A session link will be generated.
2. Share the link with your peer. Each of you should open the link (it will include parameters such as `?session=sess–…&role=a`).
3. Fill out the feedback form. You can save drafts and return later. Once you click **Submit Feedback**, your entry is locked.
4. After both parties submit, the page will show both feedback entries.
5. Visit `admin.html` and log in with the credentials above to view a table of sessions and their status.

## Limitations

* This demo stores data **locally** in the browser via `localStorage`; it does not persist between devices or provide any backend database.
* Email notifications and magic links are not implemented; links are generated client‑side for demonstration.
* Consent settings are not enforced beyond the UI; it is up to users to respect them in this demo.

## Next Steps

To turn this demo into a full production application, you would:

1. Implement server‑side session creation and storage using a database such as Supabase.
2. Generate unique magic links per user with a secure token.
3. Send transactional emails via a service like Resend or Postmark to invite coaches and notify them of submission status.
4. Store feedback data securely and enforce visibility rules on the server rather than client‑side storage.
5. Add authentication for coaches and admins.

Feel free to fork this repository and enhance it to meet your specific needs.
