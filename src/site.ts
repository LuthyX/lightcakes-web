// Site-wide settings. Change them here, not in the pages.

// WhatsApp number in international format, digits only (no +, no spaces):
// +44 7523 857318 → 447523857318
export const WHATSAPP_NUMBER = "447523857318";
// The same number, formatted for people to read
export const PHONE_DISPLAY = "+44 7523 857318";

// From the Web3Forms dashboard. It's designed to be public (it ends up in the
// page's HTML), so it's fine to commit. Submissions go to the email it was
// created with.
export const WEB3FORMS_ACCESS_KEY = "[WEB3FORMS ACCESS KEY]";

// Builds a wa.me link that opens WhatsApp with the message already typed.
// encodeURIComponent escapes spaces, apostrophes etc. so the URL stays valid.
export function whatsappLink(message: string): string {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
