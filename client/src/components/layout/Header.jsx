import { Link } from 'react-router-dom'

function Header(){
    return (
    <header style={headerStyle}>
        <div style={containerStyle}>
            <h1 style={logoStyle}><Link to='/' style={linkStyle}>OntheWay</Link></h1>
            <nav style={navLinkStyle}>
                <Link to='/' style={navLinkStyle}>Home</Link>
                <Link to='/login' style={navLinkStyle}>Login</Link>
                <Link to='/register' style={navLinkStyle}>Register</Link>
            </nav>
        </div>
    </header> 
    )
}

const headerStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '1rem 0',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoStyle = {
  margin: 0,
  fontSize: '1.5rem',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
};

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  marginLeft: '2rem',
};


export default Header
