import { AppProviders } from './core/providers/app-providers';
import { AppRoutes } from './core/router/routes';

export function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}
