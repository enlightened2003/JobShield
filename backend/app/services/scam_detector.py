def analyze_job(job_description: str):

    score = 0
    red_flags = []

    text = job_description.lower()

    # Unrealistic salary
    suspicious_salary = [
        "earn ₹50,000 daily",
        "earn $1000 per day",
        "easy money",
        "quick income"
    ]

    if any(keyword in text for keyword in suspicious_salary):
        score += 25
        red_flags.append(
            "Unrealistic salary claims"
        )

    # Registration fee
    payment_keywords = [
        "registration fee",
        "pay fee",
        "processing fee",
        "security deposit"
    ]

    if any(keyword in text for keyword in payment_keywords):
        score += 30
        red_flags.append(
            "Requests upfront payment"
        )

    # Messaging apps
    messaging_keywords = [
        "telegram",
        "whatsapp"
    ]

    if any(keyword in text for keyword in messaging_keywords):
        score += 20
        red_flags.append(
            "Uses Telegram/WhatsApp communication"
        )

    # No experience
    no_experience_keywords = [
        "no experience required",
        "work from home"
    ]

    if any(keyword in text for keyword in no_experience_keywords):
        score += 15
        red_flags.append(
            "Suspicious hiring language"
        )

    # Determine level
    if score >= 70:
        level = "HIGH"

    elif score >= 40:
        level = "MEDIUM"

    else:
        level = "LOW"

    return {
        "risk_score": score,
        "risk_level": level,
        "red_flags": red_flags
    }