
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from "lucide-react";

interface RequireAuthProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function RequireAuth({ children, requireAdmin = false }: RequireAuthProps) {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth', { state: { from: location } });
      } else if (requireAdmin && profile?.role !== 'admin') {
        navigate('/');
      }
    }
  }, [user, profile, loading, navigate, location, requireAdmin]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user || (requireAdmin && profile?.role !== 'admin')) {
    return null;
  }

  return <>{children}</>;
}
