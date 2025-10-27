import { useState } from 'react';
import { AuthLayout } from './components/AuthLayout';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { AppLayout } from './components/AppLayout';
import { Dashboard } from './components/Dashboard';
import { CreateCampaign } from './components/CreateCampaign';
import { CampaignsList } from './components/CampaignsList';
import { MediaLibrary } from './components/MediaLibrary';
import { SocialAccounts } from './components/SocialAccounts';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { DesignSystem } from './components/DesignSystem';

type AuthState = 'login' | 'signup' | 'authenticated';
type AppPage = 'dashboard' | 'create-campaign' | 'campaigns' | 'media-library' | 'social-accounts' | 'profile' | 'settings' | 'design-system';

export default function App() {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard');

  const handleLogin = () => {
    setAuthState('authenticated');
    setCurrentPage('dashboard');
  };

  const handleSignup = () => {
    setAuthState('authenticated');
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setAuthState('login');
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as AppPage);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'create-campaign':
        return <CreateCampaign onNavigate={handleNavigate} />;
      case 'campaigns':
        return <CampaignsList onNavigate={handleNavigate} />;
      case 'media-library':
        return <MediaLibrary />;
      case 'social-accounts':
        return <SocialAccounts />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      case 'design-system':
        return <DesignSystem />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  if (authState !== 'authenticated') {
    return (
      <AuthLayout>
        {authState === 'login' ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthState('signup')}
          />
        ) : (
          <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthState('login')}
          />
        )}
      </AuthLayout>
    );
  }

  return (
    <AppLayout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    >
      {renderCurrentPage()}
    </AppLayout>
  );
}