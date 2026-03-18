export enum EMAIL_TEMPLATES {
    PARTNER_ONBOARD = 'partner_onboard',
    COURSE_REGISTRATION_REQUEST = 'course_registration_request',
    ENROLLMENT_REJECTION = 'enrollment_rejection',
    CERTIFICATE_REQUESTED = 'certificate_requested'
}

export enum EMAIL_SUBJECTS {
    PARTNER_ONBOARD = 'Partner Onboard',
    COURSE_REGISTRATION_REQUEST = 'Course Registration Request',
    ENROLLMENT_REJECTION = 'Enrollment Rejected',
    CERTIFICATE_REQUESTED = 'Certificate Requested'
}

export const COURSE_EMAIL_BYPASSED_MESSAGE = 'Course Registration Email Bypassed.'
export const PARTNER_ONBOARD_EMAIL_BYPASSED = 'Partner Onboarding Email Bypassed.'

export const EMAIL_SENT = 'Email sent successfully.'
export const EMAIL_FAILURE = 'Failed to send Email.'