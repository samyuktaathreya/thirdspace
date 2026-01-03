import { useNavigate, useOutletContext } from "react-router-dom";
import AddPinForm from "../Components/AddPinForm";

export default function SidebarAdd() {
  const navigate = useNavigate();
  const { endpointUrl, fetchPins, refreshPins } = useOutletContext();

  return (
    <>
      <div className="sidebarHeader">
        <h1>Add a place</h1>
        <button className="primaryBtn" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>

      <AddPinForm
        endpointUrl={`${endpointUrl}/pins`}
        onCreated={async () => {
          await refreshPins();
          navigate("/");
        }}
      />
    </>
  );
}