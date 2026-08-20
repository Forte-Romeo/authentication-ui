function PasswordRequirements({ password }) {
    const requirements = [
        {
        label: "At least 8 characters",
        valid: password.length >= 8,
        },
        {
        label: "Contains a number",
        valid: /\d/.test(password),
        },
        {
        label: "Contains an uppercase letter",
        valid: /[A-Z]/.test(password),
        },
    ];

    return (
        <div className="password-requirements">
        <p>Password requirements:</p>

        <ul>
            {requirements.map((requirement) => (
            <li
                key={requirement.label}
                className={
                requirement.valid ? "requirement-valid" : ""
                }
            >
                <span>
                {requirement.valid ? "✓" : "○"}
                </span>

                {requirement.label}
            </li>
            ))}
        </ul>
        </div>
    );
}

export default PasswordRequirements;