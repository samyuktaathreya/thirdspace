import { useNavigate, useOutletContext } from "react-router-dom";
import AddPinForm from "../Components/AddPinForm";

export default function SidebarAdd() {
  const navigate = useNavigate();
  const { endpointUrl, fetchPins } = useOutletContext();

  return (
    <>
      <div className="sidebarHeader">
        <h1>Add a place</h1>
        <button className="primaryBtn" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>

      <AddPinForm
        endpointUrl={endpointUrl}
        onCreated={async () => {
          await fetchPins();     // refresh pins so the map updates
          navigate("/");         // go back to list
        }}
      />
    </>
  );
}
