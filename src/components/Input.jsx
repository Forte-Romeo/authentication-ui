function Input({ label, type="text", placeholder, id, value, onChange, showPassword, onTogglePassword }) {
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
        </div>
    );
}

export default Input;