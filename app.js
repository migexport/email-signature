// Locked company branding (STATIC)
const BRAND = {
  company: "Meridian Intl Sourcing Group",
  websiteText: "www.migexport.com",
  websiteUrl: "https://www.migexport.com/",
  address: "90 Broad Street, 2nd FL, New York, NY 10038",
  logoUrl:
    "https://48430198.fs1.hubspotusercontent-na1.net/hubfs/48430198/Meridian-International-Sourcing-Group-logo-final-file-2.jpg",
  linkedinUrl:
    "https://www.linkedin.com/company/meridian-international-sourcing-group/",
  instagramUrl: "https://www.instagram.com/migexport/",
  accentBlue: "#1136A5",
  accentTeal: "#70D2DB",
};

// Editable defaults
const DEFAULTS = {
  fullName: "John Doe",
  title: "Account Manager",
  phone: "1234-567-890",
  email: "employee@migexport.com",
  whatsappUrl: "https://wa.me/1234567890",
  meetingUrl: "",
};

const ids = [
  "fullName",
  "title",
  "phone",
  "email",
  "whatsappUrl",
  "meetingUrl",
];
const els = Object.fromEntries(
  ids.map((id) => [id, document.getElementById(id)])
);

const previewEl = document.getElementById("preview");
const htmlCodeViewerEl = document.getElementById("htmlCodeViewer");
const toastEl = document.getElementById("toast");

const copyMiniBtn = document.getElementById("copyMiniBtn");
const downloadHtmlBtn = document.getElementById("downloadHtmlBtn");

function escapeHtml(input) {
  return String(input ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function ensureMailto(email) {
  const e = String(email || "").trim();
  if (!e) return "";
  return e.toLowerCase().startsWith("mailto:") ? e : `mailto:${e}`;
}

function ensureTel(phone) {
  const p = String(phone || "").trim();
  if (!p) return "";
  const normalized = p.replace(/[\s-]/g, "");
  return normalized.toLowerCase().startsWith("tel:")
    ? normalized
    : `tel:${normalized}`;
}

function safeUrl(url) {
  const u = String(url || "").trim();
  if (!u) return "";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(u)) return u;
  return `https://${u}`;
}

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.remove("hidden");
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toastEl.classList.add("hidden"), 2000);
}

function getValuesFromForm() {
  const out = {};
  for (const id of ids) out[id] = els[id].value;
  return out;
}

function setFormValues(values) {
  for (const id of ids) els[id].value = values[id] ?? "";
}

function buildSignatureHtml(user) {
  const values = { ...BRAND, ...user };

  const v = {
    ...values,
    fullName: escapeHtml(values.fullName),
    title: escapeHtml(values.title),
    company: escapeHtml(values.company),
    phone: escapeHtml(values.phone),
    email: escapeHtml(values.email),
    websiteText: escapeHtml(values.websiteText),
    address: escapeHtml(values.address),
    logoUrl: escapeHtml(values.logoUrl),
    linkedinUrl: escapeHtml(values.linkedinUrl),
    instagramUrl: escapeHtml(values.instagramUrl),
    whatsappUrl: escapeHtml(values.whatsappUrl),
    meetingUrl: escapeHtml(values.meetingUrl),
    accentBlue: escapeHtml(values.accentBlue),
    accentTeal: escapeHtml(values.accentTeal),
  };

  const emailHref = escapeHtml(ensureMailto(values.email));
  const telHref = escapeHtml(ensureTel(values.phone));
  const websiteHref = escapeHtml(
    safeUrl(values.websiteUrl || values.websiteText)
  );
  const linkedinHref = escapeHtml(safeUrl(values.linkedinUrl));
  const instagramHref = escapeHtml(safeUrl(values.instagramUrl));
  const whatsappHref = escapeHtml(safeUrl(values.whatsappUrl));
  const meetingHref = escapeHtml(safeUrl(values.meetingUrl));

  // Hide WhatsApp icon if empty
  const whatsappIconCell = values.whatsappUrl
    ? `
    <td style="width:5px;height:28.8px;"></td>
    <td style="text-align:center;width:24px;height:28.8px;">
      <a style="display:inline-block;background-color:${v.accentTeal};"
         target="_blank"
         rel="noopener noreferrer"
         href="${whatsappHref}"
         title="WhatsApp">
        <img style="width:24px;display:block;"
             width="24"
             alt="whatsapp"
             src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/whatsapp-icon-2x.png" />
      </a>
    </td>
  `
    : "";

  // Hide Meeting link if empty
  const meetingRow = values.meetingUrl
    ? `
      <div style="font-family:Garamond,Georgia,serif;font-size:11pt;color:#000;">
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a target="_blank" rel="noopener noreferrer" href="${meetingHref}" title="Book a meeting">Book A Meeting</a>
      </div>
    `
    : `<div style="font-family:'Lucida Sans Unicode';font-size:12px;color:#000;"><br /></div>`;

  return `<!-- MIGExport Email Signature (generated) -->
<table style="box-sizing:border-box;border-collapse:collapse;border-spacing:0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td style="width:470.719px;">
        <table style="box-sizing:border-box;border-collapse:collapse;border-spacing:0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <!-- LEFT: Logo + Social -->
              <td style="vertical-align:top;width:130px;">
                <table style="box-sizing:border-box;border-collapse:collapse;border-spacing:0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td style="text-align:center;width:130px;padding-top:16px;">
                        <img style="width:130px;max-width:130px;display:block;" width="130" src="${v.logoUrl}" alt="Company logo" />
                      </td>
                    </tr>
                    <tr><td style="height:6px;"></td></tr>
                    <tr>
                      <td style="text-align:center;width:130px;height:32.4px;">
                        <table style="text-align:center;display:inline-block;margin:0;box-sizing:border-box;border-collapse:collapse;border-spacing:0" cellspacing="0" cellpadding="0">
                          <tbody>
                            <tr>
                              <td style="text-align:center;width:24px;height:28.8px;">
                                <a style="display:inline-block;background-color:${v.accentTeal};" target="_blank" rel="noopener noreferrer" href="${linkedinHref}" title="LinkedIn">
                                  <img style="width:24px;display:block;" width="24" alt="linkedin" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/linkedin-icon-2x.png" />
                                </a>
                              </td>
                              <td style="width:5px;height:28.8px;"></td>
                              <td style="text-align:center;width:24px;height:28.8px;">
                                <a style="display:inline-block;background-color:${v.accentTeal};" target="_blank" rel="noopener noreferrer" href="${instagramHref}" title="Instagram">
                                  <img style="width:24px;display:block;" width="24" alt="instagram" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/instagram-icon-2x.png" />
                                </a>
                              </td>
                              ${whatsappIconCell}
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>

              <td style="width:46px;"></td>

              <!-- RIGHT: Details -->
              <td style="vertical-align:top;width:294.719px;padding-top:16px;">
                <h2 style="margin:0;font-family:'Lucida Sans Unicode';font-size:18px;font-weight:600;color:#000;">${v.fullName}</h2>
                <p style="line-height:22px;margin:0;font-size:14px;color:#000;"><span style="font-family:'Lucida Sans Unicode';">${v.title}</span></p>
                <div style="line-height:22px;margin:0;font-family:'Lucida Sans Unicode';font-size:14px;font-weight:500;color:rgb(23,78,134);"><b>${v.company}</b></div>

                <table style="width:100%;box-sizing:border-box;border-collapse:collapse;border-spacing:0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr><td style="height:30px;"></td></tr>
                    <tr><td style="border-bottom:1px solid ${v.accentBlue};height:1px;"></td></tr>
                    <tr><td style="height:30px;"></td></tr>
                  </tbody>
                </table>

                <table style="box-sizing:border-box;border-collapse:collapse;border-spacing:0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <!-- Phone -->
                    <tr>
                      <td style="vertical-align:middle;width:30px;height:20px;">
                        <div style="background-color:${v.accentBlue};display:inline-block;">
                          <img style="width:13px;display:block;" width="13" alt="phone" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/phone-icon-2x.png" />
                        </div>
                      </td>
                      <td style="color:#000;width:264.719px;height:20px;">
                        <div style="font-family:'Lucida Sans Unicode';font-size:14px;color:#000;">
                          <a style="color:#000;text-decoration:none;" href="${telHref}" title="Call">${v.phone}</a>
                        </div>
                      </td>
                    </tr>

                    <!-- Email -->
                    <tr>
                      <td style="vertical-align:middle;width:30px;height:20px;">
                        <div style="background-color:${v.accentBlue};display:inline-block;">
                          <img style="width:13px;display:block;" width="13" alt="email" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/email-icon-2x.png" />
                        </div>
                      </td>
                      <td style="color:#000;width:264.719px;height:20px;">
                        <div style="font-family:'Lucida Sans Unicode';font-size:14px;color:#000;">
                          <a style="color:#000;text-decoration:none;" href="${emailHref}" title="Email">${v.email}</a>
                        </div>
                      </td>
                    </tr>

                    <!-- Website -->
                    <tr>
                      <td style="vertical-align:middle;width:30px;height:20px;">
                        <div style="background-color:${v.accentBlue};display:inline-block;">
                          <img style="width:13px;display:block;" width="13" alt="website" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/link-icon-2x.png" />
                        </div>
                      </td>
                      <td style="color:#000;width:264.719px;height:20px;">
                        <div style="font-family:'Lucida Sans Unicode';font-size:14px;color:#000;">
                          <a style="color:#000;text-decoration:none;" target="_blank" rel="noopener noreferrer" href="${websiteHref}" title="Website">${v.websiteText}</a>
                        </div>
                      </td>
                    </tr>

                    <!-- Address -->
                    <tr>
                      <td style="vertical-align:middle;width:30px;height:20px;">
                        <div style="background-color:${v.accentBlue};display:inline-block;">
                          <img style="width:13px;display:block;" width="13" alt="address" src="https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/address-icon-2x.png" />
                        </div>
                      </td>
                      <td style="color:#000;width:264.719px;height:20px;">
                        <div style="font-family:'Lucida Sans Unicode';font-size:14px;color:#000;">${v.address}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                ${meetingRow}

                <div style="font-family:'Lucida Sans Unicode';font-size:12px;color:#000;"><br /></div>
              </td>

              <td style="padding-top:1rem;max-width:300px" colspan="3"></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>`;
}

function render() {
  const user = getValuesFromForm();
  const html = buildSignatureHtml(user);
  previewEl.innerHTML = html; // safe: user content is escaped
  htmlCodeViewerEl.textContent = html;
}

async function copyHtml() {
  const user = getValuesFromForm();
  const html = buildSignatureHtml(user);
  try {
    await navigator.clipboard.writeText(html);
    showToast("✓ Copied HTML to clipboard.");
  } catch {
    showToast("❌ Copy failed — browser blocked clipboard access.");
  }
}

async function copyOutlook() {
  const user = getValuesFromForm();

  // Build plain text signature for Outlook
  const plainText = `${BRAND.logo}
linkedin\t\tinstagram\t\twhatsapp
${user.fullName}
${user.title}

${BRAND.company}
phone\t
${user.phone}
email\t
${user.email}
website\t
${BRAND.website}
address\t
${BRAND.address}`;

  try {
    await navigator.clipboard.writeText(plainText);
    showToast("✓ Copied for Outlook (paste as text).");
  } catch {
    showToast("❌ Copy failed — browser blocked clipboard access.");
  }
}

function downloadHtml() {
  const user = getValuesFromForm();
  const name = (user.fullName || "signature")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const html = buildSignatureHtml(user);
  const blob = new Blob([html], {
    type: "text/html;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `email-signature-${name}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
  showToast("✓ HTML file downloaded.");
}

function wireEvents() {
  for (const id of ids) {
    els[id].addEventListener("input", render);
  }
  copyMiniBtn.addEventListener("click", copyHtml);
  downloadHtmlBtn.addEventListener("click", downloadHtml);
}

(function init() {
  setFormValues(DEFAULTS);
  wireEvents();
  render();
})();