// Inline validation for any <form data-validate>.
//
// The browser still does the actual checking, using the HTML attributes
// (required, type="email", min="1"). This script only replaces the browser's
// pop-up bubbles with a message under each field, linked to the field via
// aria-describedby so screen readers read it out.

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function messageFor(field: Field): string {
	if (field.validity.valueMissing) return field.dataset.error ?? "Please fill in this field.";
	if (field.validity.typeMismatch) return "Please enter a valid email address.";
	if (field.validity.rangeUnderflow) return "Please enter a number of 1 or more.";
	return field.validationMessage;
}

// Shows or clears one field's error. Returns true if the field is valid.
function check(field: Field): boolean {
	const error = document.getElementById(`${field.id}-error`);
	if (!error) return true; // e.g. hidden fields: nothing to show

	const valid = field.checkValidity();
	field.setAttribute("aria-invalid", String(!valid));
	error.textContent = valid ? "" : messageFor(field);
	return valid;
}

for (const form of document.querySelectorAll<HTMLFormElement>("form[data-validate]")) {
	// Turn off the browser's bubbles; we show our own messages instead
	form.noValidate = true;
	const fields = Array.from(form.querySelectorAll<Field>("input, select, textarea"));

	form.addEventListener("submit", (event) => {
		// Check every field (not just until the first failure) so all errors show at once
		const invalid = fields.filter((field) => !check(field));
		if (invalid.length > 0) {
			event.preventDefault(); // don't send
			invalid[0].focus(); // screen readers announce its label + error
		}
	});

	// Once a field is showing an error, clear it as soon as it's fixed
	for (const field of fields) {
		const recheck = () => {
			if (field.getAttribute("aria-invalid") === "true") check(field);
		};
		field.addEventListener("input", recheck);
		field.addEventListener("change", recheck);
	}
}
