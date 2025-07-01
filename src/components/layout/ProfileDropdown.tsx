
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Settings, Wallet, Package, LogOut, ChevronDown } from 'lucide-react';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex items-center space-x-3">
        <Button variant="outline" onClick={() => navigate('/login')}>
          Sign In
        </Button>
        <Button onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || undefined} />
            <AvatarFallback>
              {profile?.first_name?.[0] || user.email?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block text-sm font-medium">
            {profile?.first_name || user.email?.split('@')[0]}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile?.first_name && profile?.last_name 
                ? `${profile.first_name} ${profile.last_name}`
                : 'My Account'
              }
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => navigate('/account-settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Account Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/wallet')}>
          <Wallet className="mr-2 h-4 w-4" />
          <span>My Wallet</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/order-history')}>
          <Package className="mr-2 h-4 w-4" />
          <span>My Orders</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
