import {
    SESv2Client,
    SendEmailCommand,
    CreateEmailTemplateCommand,
} from "@aws-sdk/client-sesv2";

class SESClient {
    constructor({ address, region, accessKeyId, secretAccessKey }) {
        this.client = new SESv2Client({
            region: region,
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            },
        });
        this.address = address;
    }

    /**
     * @typedef {Object} SendVerificationCodeData
     * @property {string} subject
     * @property {string} username
     * @property {string} code
     */

    /**
     * @param {string} destination
     * @param {SendVerificationCodeData} data
     */
    async sendVerificationCode(destination, data) {
        await this.client.send(
            new SendEmailCommand({
                FromEmailAddress: this.address,
                Destination: { ToAddresses: [destination] },
                Content: {
                    Template: {
                        TemplateName: "VerificationCode",
                        TemplateData: JSON.stringify(data),
                    },
                },
            }),
        );
    }

    /**
     * @typedef {Object} SendPasswordResetData
     * @property {string} subject
     * @property {string} username
     * @property {string} code
     */

    /**
     * @param {string} destination
     * @param {SendPasswordResetData} data
     */
    async sendPasswordReset(destination, data) {
        await this.client.send(
            new SendEmailCommand({
                FromEmailAddress: this.address,
                Destination: { ToAddresses: [destination] },
                Content: {
                    Template: {
                        TemplateName: "PasswordReset",
                        TemplateData: JSON.stringify(data),
                    },
                },
            }),
        );
    }

    /**
     * @typedef {Object} SendAddressUpdateData
     * @property {string} subject
     * @property {string} username
     * @property {string} code
     */

    /**
     * @param {string} destination
     * @param {SendAddressUpdateData} data
     */
    async sendAddressUpdate(destination, data) {
        await this.client.send(
            new SendEmailCommand({
                FromEmailAddress: this.address,
                Destination: { ToAddresses: [destination] },
                Content: {
                    Template: {
                        TemplateName: "AddressUpdate",
                        TemplateData: JSON.stringify(data),
                    },
                },
            }),
        );
    }
}

export default async function ({
    address,
    region,
    accessKeyId,
    secretAccessKey,
}) {
    const sesClient = new SESClient({
        address,
        region,
        accessKeyId,
        secretAccessKey,
    });
    await Promise.all([
        sesClient.client.send(
            new CreateEmailTemplateCommand({
                TemplateName: "VerificationCode",
                TemplateContent: {
                    Subject: `{{ subject }}`,
                    Html: `
                        <div>
                            <h2>Hi {{ username }},</h2>
                            <b>DO NOT SHARE</b> this code with anyone. If you didn't request this, you can safely ignore this email.
                        </div>
                    `,
                    Text: "Your email address verification code is: {{ code }}",
                },
            }),
        ),
        sesClient.client.send(
            new CreateEmailTemplateCommand({
                TemplateName: "PasswordReset",
                TemplateContent: {
                    Subject: `{{ subject }}`,
                    Html: `
                        <div>
                            <h2>Hi {{ username }},</h2>
                            <b>DO NOT SHARE</b> this code with anyone. If you didn't request this, you can safely ignore this email.
                        </div>
                    `,
                    Text: "Your password reset code is: {{code}}",
                },
            }),
        ),
        sesClient.client.send(
            new CreateEmailTemplateCommand({
                TemplateName: "AddressUpdate",
                TemplateContent: {
                    Subject: `{{ subject }}`,
                    Html: `
                        <div>
                            <h2>Hi {{ username }},</h2>
                            <b>DO NOT SHARE</b> this code with anyone. If you didn't request this, you can safely ignore this email.
                        </div>
                    `,
                    Text: "Your address update code is: {{code}}.",
                },
            }),
        ),
    ]).catch((err) => console.log(err));

    return sesClient;
}
