import re


def analyze_job(job_description: str):

    risk_score = 0
    red_flags = []

    text = job_description.lower()

    # Payment / Registration Fee Detection
    payment_keywords = [
        "registration fee",
        "processing fee",
        "security deposit",
        "pay fee",
        "payment required",
        "advance payment",
        "registration amount",
        "training fee",
        "joining fee"
    ]

    if any(keyword in text for keyword in payment_keywords):
        risk_score += 30
        red_flags.append(
            "Requests upfront payment"
        )

    # Unrealistic Salary Detection
    salary_patterns = [
        r'₹\s?\d{4,}',
        r'rs\.?\s?\d{4,}',
        r'inr\s?\d{4,}',
        r'\$\s?\d{4,}'
    ]

    salary_flagged = False

    for pattern in salary_patterns:

        matches = re.findall(
            pattern,
            text,
            re.IGNORECASE
        )

        for salary in matches:

            amount = int(
                re.sub(
                    r'\D',
                    '',
                    salary
                )
            )

            if amount >= 50000:

                risk_score += 25

                red_flags.append(
                    "Unrealistic salary claims"
                )

                salary_flagged = True
                break

        if salary_flagged:
            break

    # Telegram / WhatsApp Detection
    messaging_keywords = [
        "telegram",
        "whatsapp"
    ]

    if any(keyword in text for keyword in messaging_keywords):

        risk_score += 20

        red_flags.append(
            "Uses Telegram/WhatsApp communication"
        )

    # Suspicious Hiring Language Detection
    suspicious_keywords = [
        "work from home",
        "easy money",
        "guaranteed income",
        "no experience required",
        "earn daily",
        "quick money"
    ]

    if any(keyword in text for keyword in suspicious_keywords):

        risk_score += 15

        red_flags.append(
            "Suspicious hiring language"
        )

    # Urgency Phrase Detection
    urgency_phrases = [
        "urgent hiring",
        "apply immediately",
        "limited slots",
        "immediate joining",
        "act now",
        "hurry up",
        "last chance",
        "only today",
        "join instantly",
        "immediate start"
    ]

    if any(phrase in text for phrase in urgency_phrases):

        risk_score += 15

        red_flags.append(
            "Uses urgency tactics"
        )

    # Recruiter Email Domain Validation
    email_pattern = (
        r'[A-Za-z0-9._%+-]+'
        r'@[A-Za-z0-9.-]+'
        r'\.[A-Za-z]{2,}'
    )

    emails = re.findall(
        email_pattern,
        job_description
    )

    free_email_domains = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "outlook.com",
        "protonmail.com",
        "aol.com"
    ]

    for email in emails:

        domain = email.split("@")[1].lower()

        if domain in free_email_domains:

            risk_score += 20

            red_flags.append(
                "Uses personal email domain"
            )

            break

    # Ensure risk score stays within 0–100
    risk_score = min(risk_score, 100)

    # Risk Level Classification
    if risk_score >= 70:
        risk_level = "HIGH"

    elif risk_score >= 40:
        risk_level = "MEDIUM"

    else:
        risk_level = "LOW"

    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "red_flags": red_flags
    }