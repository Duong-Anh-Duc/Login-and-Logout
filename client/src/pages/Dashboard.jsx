import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Dashboard</h1>
      {!!user && (
        <div>
          <h2> Hi {user.name}!</h2>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
