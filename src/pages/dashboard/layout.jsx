import { Outlet } from 'react-router-dom';
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function Layout() {
    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    );
}
