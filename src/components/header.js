export const Header = ({userName, logout}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light mb-4 mb-md-3">
            <div className="container-fluid">
                <p className="navbar-brand mb-0">{userName}</p>
                <button className="btn btn-outline-danger" onClick={() => logout()}>Выйти</button>
            </div>
        </nav>
    )
}