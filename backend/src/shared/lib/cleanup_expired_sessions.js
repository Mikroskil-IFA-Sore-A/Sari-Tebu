import cron from "node-cron";
import { prisma } from "../database/index.js";

export default function cleanupExpiredSessions() {
    cron.schedule("0 * * * *", async function() {
        const expired = { lt: new Date() };
        const [auth, signup, passwordReset, accountDeletion, emailUpdate, passwordUpdate]
            = await Promise.all([
                prisma.authSession.deleteMany({ where: expired }),
                prisma.signupSession.deleteMany({ where: expired }),
                prisma.passwordResetSession.deleteMany({ where: { expires_at: expired } }),
                prisma.accountDeletionSession.deleteMany({ where: { expires_at: expired } }),
                prisma.emailAddresssUpdateSession.deleteMany({ where: { expires_at: expired } }),
                prisma.passwordUpdateSession.deleteMany({ where: { expires_at: expired } }),
            ]);

        console.log({
            auth_sessions: auth.count,
            signup_sessions: signup.count,
            password_reset_session: passwordReset.count, 
            account_deletion_sessions: accountDeletion.count, 
            email_update_sessions: emailUpdate.count, 
            password_update_sessions: passwordUpdate.count
        })
    });
}