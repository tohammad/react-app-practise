import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      Dashboard{" "}
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </>
  );
};

export default Dashboard;
