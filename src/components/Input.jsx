function Input({ label, type="text", placeholder, id, value, onChange, showPassword, onTogglePassword, error }) {
    const inputType =
        type === "password" && showPassword
            ? "text"
            : type;
    
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>

            <div className="input-wrapper">
                <input 
                type={inputType}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={error ? "input-error" : ""}
            />

            {type === "password" && (
                <button
                    type="button"
                    className="password-toggle"
                    onClick={onTogglePassword}
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            )}
            </div>

            {error && (
                <span className="error-message">
                    {error}
                </span>
            )}
        </div>
    );
}

export default Input;