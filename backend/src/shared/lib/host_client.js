export default class HostClient {
    async sendVerificationCode(destination, { subject, body, code }) {
        console.log(`
            Subject: ${subject}

            ${body}
            Your verification code: ${code}
        `);
    }
    async sendPasswordReset(destination, {}) {}
    async sendAddressUpdate(destination, {}) {}
}
