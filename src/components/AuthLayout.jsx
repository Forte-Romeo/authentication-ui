function AuthLayout({ children }) {
    return(
        <main className="auth-page">
            <div className="auth-card">
                {children}
            </div>
        </main>
    );
}

export default AuthLayout;