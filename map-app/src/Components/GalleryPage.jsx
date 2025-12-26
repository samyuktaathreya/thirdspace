import { useNavigate } from "react-router-dom";

const isGallery = location.pathname === "/gallery";

export default function GalleryPage({ pins = [] }) {
    const navigate = useNavigate();
    function handleToggleView() {
        navigate(isGallery ? "/" : "/gallery");
    }
    return (
    <div>
        GALLERY IN PROGRESS
        <button type="button" onClick={handleToggleView}>
            {isGallery ? "Map" : "Gallery"}
        </button>
    </div>
    );
}