import { useNavigate, useOutletContext } from "react-router-dom";
import "../App.css";
import SearchCards from "../Components/SearchCards";
import {useState, useEffect} from "react";
import fetchPins from "../helpers/fetchPins"
import GalleryCards from "../Components/GalleryCards";

const isGallery = location.pathname === "/gallery";

const endpointUrl =
"https://supreme-cod-67jqgqvgjvj34qqw-8000.app.github.dev";

export default function Gallery({}) {
    const [pins, setPins] = useState([]);
    const navigate = useNavigate();
    const [filteredPins, setFilteredPins] = useState(pins);
    const [hasSearched, setHasSearched] = useState(false);
    const shownPins = hasSearched ? filteredPins : pins;
    const [selectedPin, setSelectedPin] = useState(null);

    const refreshPins = () => fetchPins(endpointUrl, setPins);

    useEffect(() => {
        refreshPins();
    }, []);

    function handleToggleView() {
        navigate(isGallery ? "/" : "/gallery");
    }
    return (
    <div className="GalleryPage">
        <h1 className="GalleryTitle">My Places</h1>
        <SearchCards 
            pins={pins}
            onResults={setFilteredPins}
            onSearch={setHasSearched}
        />
        <div className="GalleryPage">
        {hasSearched && shownPins.length === 0 ? (
            <div className="emptyState">No places found.</div>
        ) : (
            <GalleryCards pins={shownPins} onSelectPin={setSelectedPin} />
        )}
        </div>
        <button
        type="button"
        onClick={handleToggleView}
        className="MapGalleryBtn"
        >
        {isGallery ? "Map" : "Gallery"}
        </button>
    </div>
    );
}