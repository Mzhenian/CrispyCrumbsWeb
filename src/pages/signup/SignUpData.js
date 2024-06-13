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
  <p>These terms and conditions outline the rules and regulations for the use of our website.</p>
  <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use the website if you do not agree to all of the terms and conditions stated on this page.</p>
  <h3>License</h3>
  <p>Unless otherwise stated, we own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this from the website for your own personal use subjected to restrictions set in these terms and conditions.</p>
  <ul>
    <li>You must not republish material from our website</li>
    <li>You must not sell, rent or sub-license material from our website</li>
    <li>You must not reproduce, duplicate or copy material from our website</li>
    <li>You must not redistribute content from our website</li>
  </ul>
  <p>This Agreement shall begin on the date hereof.</p>
`;
