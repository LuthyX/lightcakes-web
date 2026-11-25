// Site-wide settings. Change them here, not in the pages.

// WhatsApp number in international format, digits only (no +, no spaces):
// +44 7523 857318 → 447523857318
export const WHATSAPP_NUMBER = "447523857318";
// The same number, formatted for people to read
export const PHONE_DISPLAY = "+44 7523 857318";

export const INSTAGRAM_URL = "https://www.instagram.com/lightcakes_/";
export const X_URL = "https://x.com/Lightcakes_";
// Empty until she sends it: an empty link isn't shown (see SocialLinks.astro)
export const FACEBOOK_URL = "";

// Where Abimbola delivers (her list, Nov 2026)
export const DELIVERY_AREA = "Leeds, Wakefield, Sheffield, Manchester, York, Middlesbrough, Huddersfield and Bradford";

// Business email: placeholder until the domain (and its mailbox) exists.
// Shown in the footer, enquire page, corporate quote section and privacy notice.
export const EMAIL = "[email address]";

// From the Web3Forms dashboard. It's designed to be public (it ends up in the
// page's HTML), so it's fine to commit. Submissions go to the email it was
// created with.
export const WEB3FORMS_ACCESS_KEY = "[WEB3FORMS ACCESS KEY]";

// Builds a wa.me link that opens WhatsApp with the message already typed.
// encodeURIComponent escapes spaces, apostrophes etc. so the URL stays valid.
export function whatsappLink(message: string): string {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
