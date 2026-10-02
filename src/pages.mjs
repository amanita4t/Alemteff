import { business } from "../site.config.mjs";
import { button, callToAction, contactLinks, escapeHtml, icon, pageIntro } from "./shared.mjs";

const services = [
  {
    icon: "truck",
    title: "Freight Transportation",
    text: "Transportation support for business shipments and freight movement.",
    detail: "Discuss your freight, timing, and transportation requirements with us.",
  },
  {
    icon: "route",
    title: "Pickup &amp; Delivery Coordination",
    text: "Coordination of pickup and delivery schedules between businesses and transportation partners.",
    detail: "Bring pickup details, delivery appointments, and scheduling needs into the conversation.",
  },
  {
    icon: "package",
    title: "Shipment Coordination",
    text: "Communication and coordination related to shipment status, scheduling, appointments, and transportation requirements.",
    detail: "Keep the relevant shipment information connected to the people who need it.",
  },
  {
    icon: "coordination",
    title: "Logistics Support",
    text: "Business-to-business logistics assistance related to transportation and shipment coordination.",
    detail: "Work through the practical details of moving your business shipments.",
  },
];

const home = {
  path: "/",
  title: "ALEM TEFF LLC | Transportation & Logistics",
  description: "ALEM TEFF LLC provides transportation and logistics support for businesses, including freight transportation, shipment coordination, pickup and delivery scheduling, and related logistics services.",
  content: `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow"><span class="eyebrow-line"></span> BUILT AROUND YOUR BUSINESS</p>
          <h1>Reliable Transportation <span>&amp; Logistics</span> Solutions</h1>
          <p>ALEM TEFF LLC provides dependable transportation and logistics support for businesses, helping coordinate the movement of freight and shipments with a focus on communication, scheduling, and reliable service.</p>
          <div class="button-row">${button("Contact Us", "/contact")}${button("Our Services", "/services", true)}</div>
          <div class="hero-note">${icon("coordination")}<span>Business-to-business. People to people.</span></div>
        </div>
        <div class="hero-visual">
          <div class="visual-topline"><span>FREIGHT IN FOCUS</span><span class="visual-index">B2B LOGISTICS</span></div>
          <img class="freight-illustration" src="/assets/freight.svg" alt="" width="640" height="560" fetchpriority="high">
          <div class="visual-caption"><span class="visual-caption-mark" aria-hidden="true"></span><p>Clear communication.<br><strong>Coordinated movement.</strong></p>${icon("arrow-up")}</div>
          <div class="route-strip" aria-label="Transportation coordination stages"><span><b>01</b> Pickup</span><span><b>02</b> Transit</span><span><b>03</b> Delivery</span></div>
        </div>
      </div>
    </section>
    <div class="principles-strip"><div class="container"><span>${icon("truck")} Transportation</span><span>${icon("route")} Coordination</span><span>${icon("message")} Communication</span></div></div>
    <section class="section">
      <div class="container">
        <div class="section-heading"><div><p class="eyebrow">PRACTICAL SUPPORT. CLEAR PRIORITIES.</p><h2>More than movement.<br>A coordinated approach.</h2></div>
          <p>Every shipment comes with details that matter. We focus on dependable business-to-business transportation and logistics coordination, with communication and scheduling at the center.</p>
        </div>
        <div class="feature-grid">
          <article class="feature-card"><span class="icon-tile">${icon("truck")}</span><h3>Reliable Transportation</h3><p>Practical transportation support focused on your business shipment requirements.</p></article>
          <article class="feature-card"><span class="icon-tile">${icon("package")}</span><h3>Shipment Coordination</h3><p>Keeping shipment information, schedules, and transportation details connected.</p></article>
          <article class="feature-card"><span class="icon-tile">${icon("route")}</span><h3>Pickup &amp; Delivery Support</h3><p>Helping coordinate appointments between businesses and transportation partners.</p></article>
          <article class="feature-card"><span class="icon-tile">${icon("coordination")}</span><h3>Business-to-Business Service</h3><p>Transportation and logistics conversations built around business needs.</p></article>
        </div>
      </div>
    </section>
    <section class="section approach-section"><div class="container approach-grid">
      <div class="approach-art" aria-hidden="true"><div class="route-line"></div><span class="route-dot route-dot-start"></span><span class="route-dot route-dot-end"></span><span class="approach-word">The details<br>make the<br><em>difference.</em></span><span class="approach-art-label">ALEM TEFF LLC / OUR APPROACH</span></div>
      <div class="approach-copy"><p class="eyebrow">A BUSINESS PARTNER IN THE PROCESS</p><h2>Good logistics starts<br>with a conversation.</h2><p>From pickup requirements to delivery appointments, we work with business customers and transportation partners to coordinate the details of freight movement.</p><p>Our approach is straightforward: understand the need, organize the information, and keep communication clear.</p><a class="text-link" href="/about">Get to know ALEM TEFF LLC ${icon("arrow")}</a></div>
    </div></section>
    ${callToAction()}`,
};

const about = {
  path: "/about",
  title: "About ALEM TEFF LLC | Transportation & Logistics",
  description: "Learn about ALEM TEFF LLC, a U.S.-based transportation and logistics company focused on business communication, organized scheduling, and shipment coordination.",
  content: `
    ${pageIntro("ABOUT OUR COMPANY", "About ALEM TEFF LLC", "Transportation and logistics, with communication at the center.")}
    <section class="section"><div class="container about-grid">
      <div class="about-statement"><span class="icon-tile">${icon("coordination")}</span><h2>Business needs.<br>Practical support.<br><span>Clear priorities.</span></h2><p>U.S.-based transportation &amp; logistics</p></div>
      <div class="prose about-copy"><h2>Focused on the details that move business.</h2><p>ALEM TEFF LLC is a transportation and logistics company focused on helping businesses coordinate the movement of freight and shipments. Our approach emphasizes dependable communication, organized scheduling, and practical transportation support.</p><p>We work with business customers and transportation partners to coordinate pickups, deliveries, shipment information, and related logistics needs.</p><p>Every conversation starts with understanding the specific shipment and the customer's requirements, so transportation support can be discussed in the right context.</p></div>
    </div></section>
    <section class="section section-tinted"><div class="container">
      <div class="section-heading"><div><p class="eyebrow">HOW WE APPROACH THE WORK</p><h2>Simple principles.<br>Meaningful coordination.</h2></div><p>Our focus is on practical business support throughout the transportation conversation.</p></div>
      <div class="values-grid">
        <article><span class="step-number">01</span><h3>Communicate clearly</h3><p>Keep shipment information, appointment details, and transportation requirements part of an organized conversation.</p></article>
        <article><span class="step-number">02</span><h3>Coordinate thoughtfully</h3><p>Bring business customers and transportation partners together around pickup and delivery scheduling.</p></article>
        <article><span class="step-number">03</span><h3>Focus on the need</h3><p>Discuss the practical details of each shipment and the logistics support appropriate to the request.</p></article>
      </div>
    </div></section>
    ${callToAction()}`,
};

const servicePage = {
  path: "/services",
  title: "Transportation & Logistics Services | ALEM TEFF LLC",
  description: "Explore freight transportation, pickup and delivery coordination, shipment coordination, and business-to-business logistics support from ALEM TEFF LLC.",
  content: `
    ${pageIntro("WHAT WE DO", "Support for the journey.<br>Attention to the details.", "Transportation and logistics services designed around the practical needs of business shipments.")}
    <section class="section services-section"><div class="container">
      <h2 class="sr-only">Our transportation and logistics services</h2>
      <div class="services-grid">${services.map((service, index) => `
        <article class="service-card"><div class="service-card-top"><span class="icon-tile">${icon(service.icon)}</span><span class="service-number">0${index + 1}</span></div>
          <h3>${service.title}</h3><p>${service.text}</p><p class="service-detail">${service.detail}</p>
          <a class="text-link" href="/contact">Discuss your shipment ${icon("arrow")}<span class="sr-only">: ${service.title}</span></a>
        </article>`).join("")}</div>
      <p class="service-disclaimer">${icon("info")}<span>Actual services and availability depend on the specific shipment and customer requirements. Contact us to discuss your needs.</span></p>
    </div></section>
    <section class="section section-tinted"><div class="container">
      <div class="section-heading"><div><p class="eyebrow">START WITH THE RIGHT DETAILS</p><h2>A clear starting point.</h2></div><p>When you get in touch, these details can help guide the conversation. Share only what is relevant to your request.</p></div>
      <div class="values-grid"><article><span class="step-number">01</span><h3>Your shipment</h3><p>The type of freight and any handling or transportation requirements.</p></article><article><span class="step-number">02</span><h3>Your schedule</h3><p>Proposed pickup and delivery timing, including any appointment needs.</p></article><article><span class="step-number">03</span><h3>Your coordination needs</h3><p>The shipment information and business contacts involved in the process.</p></article></div>
    </div></section>
    ${callToAction()}`,
};

const contact = {
  path: "/contact",
  title: "Contact ALEM TEFF LLC | Transportation & Logistics",
  description: "Contact ALEM TEFF LLC by phone or email to discuss business transportation, freight shipments, pickup and delivery scheduling, and logistics coordination.",
  content: `
    ${pageIntro("LET'S CONNECT", "Your next shipment<br>starts with a conversation.", "Contact ALEM TEFF LLC to discuss your transportation requirements, shipment details, or logistics questions.")}
    <section class="section contact-section"><div class="container contact-grid">
      <div class="contact-methods">
        <div class="contact-method"><span class="icon-tile">${icon("phone")}</span><div><h2>Give us a call</h2><p>Discuss your business transportation needs.</p><a class="contact-value" href="tel:${escapeHtml(business.phoneHref)}">${escapeHtml(business.phone)} ${icon("arrow-up")}</a></div></div>
        <div class="contact-method"><span class="icon-tile">${icon("mail")}</span><div><h2>Send us an email</h2><p>Share shipment details or ask a question.</p><a class="contact-value" href="mailto:${escapeHtml(business.email)}">${escapeHtml(business.email)} ${icon("arrow-up")}</a></div></div>
        <div class="contact-method"><span class="icon-tile">${icon("pin")}</span><div><h2>Business address</h2><p class="address-placeholder">${escapeHtml(business.address)}</p></div></div>
      </div>
      <aside class="contact-aside" aria-labelledby="contact-guide"><p class="eyebrow">A HELPFUL START</p><h2 id="contact-guide">Bring the details.<br>We'll talk logistics.</h2><p>To help us understand your request, you can include:</p><ul class="check-list"><li>${icon("check")}Your name and business</li><li>${icon("check")}The type of shipment or freight</li><li>${icon("check")}Pickup and delivery requirements</li><li>${icon("check")}Scheduling or appointment needs</li></ul><p class="contact-aside-note">Service availability depends on your specific shipment and requirements.</p></aside>
    </div></section>
    <section class="communications-section"><div class="container"><div class="communications-note">
      <span class="icon-tile">${icon("message")}</span><div><h2>A note about SMS communications</h2><p>For SMS communications, consent is obtained directly through business phone conversations. The website is not used to collect SMS opt-in consent for this campaign.</p><p>SMS consent is not a condition of purchasing goods or services. See our <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms-and-conditions">Terms &amp; Conditions</a> for messaging details, including STOP and HELP instructions.</p></div>
    </div></div></section>`,
};

const privacySections = [
  ["information-we-may-collect", "Information We May Collect", `<p>Depending on how you interact with us, we may collect information such as your name, business contact information, email address, telephone number, and information you voluntarily provide when communicating with us about transportation, logistics, shipments, scheduling, or related business services.</p>`],
  ["how-we-use-information", "How We Use Information", `<p>We may use information we receive to:</p><ul><li>Respond to inquiries</li><li>Communicate with customers, suppliers, vendors, drivers, carriers, and other business contacts</li><li>Coordinate transportation and logistics services</li><li>Schedule pickups and deliveries</li><li>Communicate about shipments and appointments</li><li>Provide requested services</li><li>Maintain business records</li><li>Respond to customer-service requests</li><li>Operate and improve our website and services</li></ul>`],
  ["sms-text-messaging-privacy", "SMS/Text Messaging Privacy", `<p>ALEM TEFF LLC may use SMS/MMS messaging through its business telephone system to communicate with customers, suppliers, vendors, drivers, carriers, and other business contacts regarding business operations.</p><p>SMS communications may include transportation coordination, pickup and delivery scheduling, shipment information, appointment confirmations, service inquiries, and other business-related communications.</p><p>SMS consent is obtained through direct business communications, including verbal consent when applicable.</p><div class="policy-highlight"><p><strong>ALEM TEFF LLC does not sell or rent mobile telephone numbers or SMS opt-in information. Mobile phone numbers and SMS consent information will not be shared with third parties or affiliates for their own marketing or promotional purposes.</strong></p><p><strong>Text messaging originator opt-in data and consent will not be shared with third parties for their own marketing purposes.</strong></p></div><p>We do not use SMS consent obtained for ALEM TEFF LLC to authorize another company to send messages to the individual.</p>`],
  ["sms-opt-out", "SMS Opt-Out", `<p>If you receive SMS messages from ALEM TEFF LLC, you may reply <strong>STOP</strong> to request that no further SMS messages be sent to you.</p><p>You may reply <strong>HELP</strong> for assistance.</p><p>Message frequency varies depending on business activity and communications.</p><p>Message and data rates may apply.</p>`],
  ["information-sharing", "Information Sharing", `<p>We may disclose information when reasonably necessary to operate our business, provide requested services, comply with applicable law, respond to legal processes, or protect our rights.</p><p>However, <strong>mobile telephone numbers and SMS opt-in information will not be sold, rented, or shared with third parties or affiliates for their own marketing or promotional purposes.</strong></p>`],
  ["data-security", "Data Security", `<p>We take reasonable measures designed to protect information against unauthorized access, use, alteration, or disclosure. However, no method of electronic storage or transmission can be guaranteed to be completely secure.</p>`],
  ["third-party-services", "Third-Party Services", `<p>Our website may use third-party services for hosting, analytics, security, or other technical functions. Such providers may process information as necessary to provide their services.</p><p>Mobile phone numbers and SMS opt-in/consent information will not be provided to third parties for their own marketing or promotional purposes.</p>`],
  ["privacy-policy-changes", "Changes to This Privacy Policy", `<p>We may update this Privacy Policy from time to time. Any updated version will be posted on this page with a revised effective date.</p>`],
  ["privacy-contact", "Contact", `<p>If you have questions about this Privacy Policy, please contact:</p><address class="legal-contact"><strong>${escapeHtml(business.name)}</strong>${contactLinks()}</address>`],
];

const termsSections = [
  ["use-of-this-website", "Use of This Website", `<p>This website provides general information about ALEM TEFF LLC and its transportation and logistics services.</p><p>Information on this website is provided for general informational purposes and does not constitute a guarantee that any particular transportation service, capacity, rate, pickup time, delivery time, or other service will be available.</p>`],
  ["business-communications", "Business Communications", `<p>By communicating with ALEM TEFF LLC, customers and business contacts may communicate with us regarding transportation, logistics, shipments, pickups, deliveries, appointments, scheduling, and related business matters.</p>`],
  ["sms-communications", "SMS Communications", `<p>ALEM TEFF LLC may use SMS/MMS messaging for business-related communications with customers, suppliers, vendors, drivers, carriers, and other business contacts.</p><p>SMS messages may include information about:</p><ul><li>Transportation arrangements</li><li>Pickup and delivery appointments</li><li>Shipment coordination</li><li>Load information</li><li>Scheduling</li><li>Service inquiries</li><li>Business confirmations</li><li>Other operational communications</li></ul><p>SMS consent is obtained through direct business communications, including verbal consent when applicable.</p><p>Message frequency varies based on business activity and customer interactions.</p><p>Message and data rates may apply.</p><div class="policy-highlight"><p>You may reply <strong>STOP</strong> to opt out of SMS messages from ALEM TEFF LLC.</p><p>You may reply <strong>HELP</strong> for assistance.</p><p>SMS consent is not a condition of purchasing goods or services.</p></div>`],
  ["no-website-opt-in", "No Marketing Consent Through Website Contact Form", `<p>The ALEM TEFF LLC website is not used as the SMS opt-in mechanism for this campaign. SMS consent is obtained through direct business communications.</p>`],
  ["privacy", "Privacy", `<p>Use of this website and our communications is also subject to our Privacy Policy.</p><p><a href="/privacy-policy">Privacy Policy</a></p>`],
  ["terms-changes", "Changes", `<p>ALEM TEFF LLC may update these Terms &amp; Conditions from time to time. Updated terms will be posted on this website.</p>`],
  ["terms-contact", "Contact", `<p>Questions regarding these Terms &amp; Conditions may be directed to:</p><address class="legal-contact"><strong>${escapeHtml(business.name)}</strong>${contactLinks()}</address>`],
];

function legalPage(path, title, description, introduction, sections) {
  return {
    path,
    title: `${title} | ALEM TEFF LLC`,
    description,
    content: `
      <section class="page-intro legal-intro"><div class="container"><p class="eyebrow">BUSINESS POLICIES</p><h1>${escapeHtml(title)}</h1><p class="effective-date"><strong>Effective Date:</strong> ${escapeHtml(business.effectiveDate)}</p></div></section>
      <div class="container legal-layout">
        <aside class="legal-sidebar"><nav aria-label="On this page"><h2>On this page</h2>${sections.map(([id, heading]) => `<a href="#${id}">${escapeHtml(heading)}</a>`).join("")}</nav><a class="text-link" href="/contact">Contact us ${icon("arrow")}</a></aside>
        <article class="prose legal-content" aria-label="${escapeHtml(title)}"><p class="legal-lead">${introduction}</p>${sections.map(([id, heading, content]) => `<section id="${id}"><h2>${escapeHtml(heading)}</h2>${content}</section>`).join("")}</article>
      </div>`,
  };
}

export const pages = [
  home, about, servicePage, contact,
  legalPage(
    "/privacy-policy",
    "Privacy Policy",
    "Read how ALEM TEFF LLC handles business contact information, protects mobile numbers and SMS consent, and supports SMS opt-out requests.",
    "ALEM TEFF LLC respects your privacy and is committed to protecting information that we collect through our website and in connection with our business communications.",
    privacySections,
  ),
  legalPage(
    "/terms-and-conditions",
    "Terms & Conditions",
    "Review the ALEM TEFF LLC website and business communication terms, including verbal SMS consent, message frequency, STOP, and HELP instructions.",
    "These Terms &amp; Conditions govern the use of the ALEM TEFF LLC website and related business communications.",
    termsSections,
  ),
];

export const notFoundPage = {
  path: "/404",
  noindex: true,
  title: "Page Not Found | ALEM TEFF LLC",
  description: "This page could not be found. Explore ALEM TEFF LLC transportation and logistics services or contact us.",
  content: `<section class="page-intro not-found"><div class="container"><p class="eyebrow">404 / PAGE NOT FOUND</p><h1>A different route<br>from here.</h1><p class="page-lead">The page you are looking for isn't available. You can return home or contact us for help.</p><div class="button-row">${button("Back to home", "/")}${button("Contact Us", "/contact", true)}</div></div></section>`,
};
