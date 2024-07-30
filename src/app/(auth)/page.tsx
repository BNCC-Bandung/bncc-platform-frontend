import { UserProfile } from "./components/user-profile";
import { DashboardModule } from "./components/dashboard-module";

export default function Dashboard() {
  return (
    <div className="layout flex flex-col p-5 min-h-[calc(100vh-3.5rem)]">
      <UserProfile />
      <DashboardModule />
    </div>
  );
}
