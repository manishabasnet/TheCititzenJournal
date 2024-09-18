import { useNavigate } from "react-router-dom";
import style from "./Header.module.css";

function Header() {
    const navigate = useNavigate();

    const handleAddArtifact = async (e) => {
      navigate('/addartifact'); 
    }
    return(
        <>
        <div className = {style.header}>
            <div> Your own Journal </div>
            <button onClick = {handleAddArtifact}> Add artifact</button>
        </div>
        </>
    );
}

export default Header;
