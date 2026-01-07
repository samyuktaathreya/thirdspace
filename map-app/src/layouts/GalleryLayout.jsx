import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import "../App.css";
import SearchCards from "../Components/SearchCards";
import {useState, useEffect} from "react";
import fetchPins from "../helpers/fetchPins"
import GalleryCards from "../Components/GalleryCards";


const endpointUrl = import.meta.env.VITE_API_URL;

export default function Gallery({}) {
    const [pins, setPins] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const isGallery = location.pathname === "/gallery";
    const [filteredPins, setFilteredPins] = useState(pins);
    const [hasSearched, setHasSearched] = useState(false);
    const shownPins = hasSearched ? filteredPins : pins;
    const [selectedPin, setSelectedPin] = useState(null);

    const refreshPins = () => fetchPins(endpointUrl, setPins);

    useEffect(() => {
        refreshPins();
    }, []);

    function goToMap() {
        navigate("/");
    }
    function goToGallery() {
        navigate("/gallery");
    }
    return (
    <div className="GalleryPage">
        <h1 className="GalleryTitle">My Places</h1>
        <SearchCards 
            pins={pins}
            onResults={setFilteredPins}
            onSearch={setHasSearched}
        />
        <div className="GalleryBody">
        {hasSearched && shownPins.length === 0 ? (
            <div className="emptyState">No places found.</div>
        ) : (
            <GalleryCards pins={shownPins} onSelectPin={setSelectedPin} />
        )}
        </div>
                <div className="MapGalleryBtns">
                    <button
                        type="button"
                        onClick={goToMap}
                        className={`mapToggleBtn ${!isGallery ? "active" : ""}`}
                    >
                        Map
                    </button>
                    <button
                        type="button"
                        onClick={goToGallery}
                        className={`galleryToggleBtn ${isGallery ? "active" : ""}`}
                    >
                        Gallery
                    </button>
                </div>
    </div>
    );
}