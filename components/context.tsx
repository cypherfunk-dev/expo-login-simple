import { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

interface AuthContextProps {
  user: { id: string; email: string; name: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const EXPECTED_USERS = [
  { id: '1', email: 'user1@example.com', name: 'Administrador Mañozo', password: '1234' },
  { id: '2', email: 'user2@example.com', name: 'Elba Lazo', password: '1234' },
  { id: '3', email: 'user3@example.com', name: 'Luz Rojas', password: '1234' },
];

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextProps['user']>(null);

  const login = async (userEmail: string, password: string): Promise<boolean> => {
    const foundUser = EXPECTED_USERS.find(
      (u) => u.email === userEmail && u.password === password
    );

    if (foundUser) {
      setUser({ id: foundUser.id, email: foundUser.email, name: foundUser.name });
      return true;
    } else {
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
