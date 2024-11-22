import { RESEND_API_KEY } from 'astro:env/server';

type Message = {
	sender: string;
	recipient: string;
	subject: string;
	body: string;
};

export async function sendEmail({ sender, recipient, subject, body }: Message) {
	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${RESEND_API_KEY}`,
		},
		body: JSON.stringify({
			from: 'notes@indieweb.community',
			to: [recipient],
			subject: sender + ' sent a note: ' + subject,
			text: body,
		}),
	});

	if (!res.ok) {
		console.log(res);
		throw new Error(res.statusText);
	}

	const data = await res.json();

	return data;
}
