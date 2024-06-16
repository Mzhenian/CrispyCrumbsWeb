// src/data/SignUpData.js

export const months = [
  { name: "January" },
  { name: "February" },
  { name: "March" },
  { name: "April" },
  { name: "May" },
  { name: "June" },
  { name: "July" },
  { name: "August" },
  { name: "September" },
  { name: "October" },
  { name: "November" },
  { name: "December" },
];

export const days = Array.from({ length: 31 }, (_, i) => ({ name: (i + 1).toString() }));

export const years = Array.from({ length: 101 }, (_, i) => ({ name: (new Date().getFullYear() - i).toString() }));

export const termsOfUseText = `
  <h2>Terms of Use</h2>
<p>Welcome to Crispy Crumbs, the ultimate destination for schnitzel enthusiasts! By accessing this website, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please refrain from using Crispy Crumbs. We hope you enjoy your stay and relish in the crispy goodness!</p>

<h3>License to Crunch</h3>
<p>Unless otherwise stated, we own the intellectual property rights for all the schnitzel-related content on this website. All intellectual property rights are reserved. You may access this content for your own personal use, subject to the restrictions set in these terms and conditions.</p>

<ul>
    <li>You must not republish material from our website without giving us a golden-brown pat on the back.</li>
    <li>You must not sell, rent, or sub-license material from our website unless it involves delivering free schnitzels to our office.</li>
    <li>You must not reproduce, duplicate, or copy material from our website, unless you're making a personal schnitzel recipe book (just kidding, don't do that).</li>
    <li>You must not redistribute content from our website, unless it's to spread the love of schnitzels far and wide.</li>
</ul>

<h3>Acceptable Use</h3>
<p>Our website is all about schnitzels, so we expect you to use it in the spirit of crispy fun and culinary delight. Specifically, you agree to:</p>

<ul>
    <li>Only share schnitzel-related content that is tasty, crispy, and delicious.</li>
    <li>Not use our website to spread negativity about schnitzels or promote inferior breaded foods like soggy fish sticks.</li>
    <li>Respect the schnitzel opinions of others, even if they prefer their schnitzels with unusual toppings (we're looking at you, pineapple lovers).</li>
</ul>

<h3>User Contributions</h3>
<p>We welcome user contributions that add to the crispy community. By submitting content to Crispy Crumbs, you grant us a license to use, reproduce, and enjoy your schnitzel creations. However, we reserve the right to remove any content that does not meet our high standards of crunchiness.</p>

<h3>Limitations of Liability</h3>
<p>While we strive to keep Crispy Crumbs up and running smoothly, we are not responsible for any unexpected kitchen mishaps, burnt schnitzels, or over-salted breading resulting from your use of our website. Use our schnitzel recipes and tips at your own risk, and always keep a fire extinguisher handy!</p>

<h3>Changes to These Terms</h3>
<p>We may update these terms of use from time to time to reflect changes in our schnitzel policies, new frying techniques, or just because we thought of a better schnitzel joke. Check back often to stay informed of any updates.</p>

<p>This Agreement shall begin on the date hereof and continue as long as you remain a fan of crispy schnitzels. Thank you for being part of the Crispy Crumbs community!</p>

<h3>Contact Us</h3>
<p>If you have any questions or concerns about these terms of use, or if you just want to share your favorite schnitzel recipe, feel free to contact us. Happy crunching!</p>
`;
