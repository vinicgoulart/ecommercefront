import Navbar from "../components/Navbar";
import HomeInfo from "../components/HomeInfo";
import ItemsCard from "../components/ItemsCard";

function LandingPage(){
    return(
        <>
            <Navbar />
            <HomeInfo />
            <ItemsCard />
        </>
    );
}

export default LandingPage;