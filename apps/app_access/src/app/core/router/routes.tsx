import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../../../features/platform-baseline/pages/home.page';
import { LoginPage } from '../../../features/auth/pages/login.page';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
