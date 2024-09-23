import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Contact from "../pages/Contact"
import Services from "../pages/Services";
import HomeLoan from "../pages/HomeLoan";
import About from "../pages/About";
import BecomeSeller from "../pages/BecomeSeller";
import Home from "../pages/Home";
import SinglePropertyPage from "../pages/SinglePropertyPage";
import PropertyGrid from "../pages/PropertyGrid";
import { useEffect } from "react";
import { Cookie } from "@mui/icons-material";
import Cookies from "../Cookies";
import Disclaimer from "../Disclaimer";
import PrivacyPolicy from "../PrivacyPolicy";
import TermsAndConditions from "../TermsAndConditions";
import BecomeChannelPartner from "../pages/BecomeChannelPartner";
import Developer from "../pages/Developer";
import Developing from "../pages/developing/Developing";
import DeveloperHtml from "../pages/developerHtml";
import AreaWisePropertyDisplay from "./propertyFetchAreaWise/areaWisePropertyDisplay/AreaWisePropertyDisplay";
import AllProjects from "../pages/AllProjects";
import LocalityProperties from "./topLocalities/LocalityProperties";


const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const AllRoutes = ({ setCity }) => {

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home useCity={setCity} />} />
                <Route path="/reachUs" element={<Contact />} />
                <Route path="/solutions" element={<Services />} />
                <Route path="/loan" element={<HomeLoan />} />
                <Route path="/aboutUs" element={<About />} />
                <Route path="/sell" element={<BecomeSeller />} />
                <Route path="/singleProperty/:id" element={<SinglePropertyPage />} />
                <Route path="/propertyGrid/:city" element={<PropertyGrid />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/termsAndConditions" element={<TermsAndConditions />} />
                <Route path="/partnerWithUs" element={<BecomeChannelPartner />} />
                <Route path="/developer/:developerName" element={<Developer />} />
                <Route path="/developing" element={<Developing />} />
                <Route path="/property-in/:propertyLocation" element={<AreaWisePropertyDisplay />} />
                <Route path="/projects/:city/:status?/:bhk?" element={<AllProjects />} />
                <Route path="/locality/:propertyLocation" element={<LocalityProperties />} />
                {/* <Route path="*" element={<NotFound />} /> */}
                {/* <Route path="/developer" element={<DeveloperHtml />} /> */}
            </Routes>
        </>
    )
}
export default AllRoutes;