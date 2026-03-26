import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
    user : string | null,
    setUser : (user : string | null) => void
}
const Header = ({user, setUser} : HeaderProps) => {
    
    const nav = useNavigate();
    const Logout = () => {
        localStorage.removeItem("mb_level");
        setUser(null);
        nav('/');
    }
    return(
        <header>
            <div id="header-wrap">
                <div className="logo">
                    <Link to="/">SAMPLE</Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/land/search">매물검색</Link></li>
                        <li><Link to="/consult/write">방문예약 신청</Link></li>
                        {user && user === '10' && (
                        <li><Link to="/quick/list">상담신청 목록</Link></li>
                        )}
                    </ul>
                </nav>
                <ul className="member">
                    {!user && (
                        <>
                            <li><Link to="/login">로그인</Link></li>
                            <li><Link to="/register">회원가입</Link></li>
                        </>
                    )}
                    {user && (<li className="logout"><button onClick={Logout}>로그아웃</button></li>)}
                </ul>
            </div>
        </header>
    )
}

export default Header;