import { useNavigate } from "react-router-dom";
import AddPinForm from "./AddPinForm";

export default function AddPinFormWrapper() {
  const navigate = useNavigate();

  return (
    <AddPinForm
      endpointUrl="https://supreme-cod-67jqgqvgjvj34qqw-8000.app.github.dev/pins"
      onCreated={() => navigate("/")}
    />
  );
}
