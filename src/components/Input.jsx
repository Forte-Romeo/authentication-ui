function Input({ label, type="text", placeholder, id }) {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>

            <input 
                type={type}
                id={id}
                placeholder={placeholder}
            />
        </div>
    );
}

export default Input;