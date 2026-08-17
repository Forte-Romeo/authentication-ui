function Button({ children, type = "button" }) {
    return (
        <button type={type} className="auth-button">
            {children}
        </button>
    );
}

export default Button;