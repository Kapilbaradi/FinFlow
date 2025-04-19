import mailSender from "../utils/MailSender.js";

export const sendVerificationEmail = async (email, otp) => {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification email",
            `<h1>Please confirm you OTP</h1>
            <p>Here is your OTP code: ${otp}`
        )
        console.log(mailResponse);
    } catch (error) {
        console.log(error)
    }
}