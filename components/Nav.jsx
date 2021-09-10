import { NavLink } from '.';

export { Nav };

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/customers" className="nav-item nav-link">Clientes</NavLink>
                <NavLink href="/cities" className="nav-item nav-link">Cidades</NavLink>
            </div>
        </nav>
    );
}