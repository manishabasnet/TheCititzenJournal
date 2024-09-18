import { useNavigate } from "react-router-dom";
import style from "./Home.module.css"
function Home() {
    const navigate = useNavigate();
    const handleLogin = async () => {
        navigate("/login")
    }
    const handleSignup = async () => {
        navigate("/signup")
    }
    return (
        <>
            <div className={style.homepage}>
                    <div className={style.leftside}>
                        <div className={style.buttons}>
                        <button className={style.loginButton} onClick={handleLogin}>Login</button>
                        <button className={style.signupButton} onClick={handleSignup}>Signup</button>
                        </div>
                    </div>
                    <div className = {style.rightside}>
                        <div className={style.tagline}><h2>Uncover the Past, Share the Stories – <span className={style.name}>Citizen Journal</span>. A Community-Driven Archive of Rare Artifacts.</h2></div>
                    </div>
            </div>

        </>
    );
}

export default Home;
