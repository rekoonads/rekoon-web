import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from 'lucide-react';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

interface DropdownMenuDemoProps {
  
  name?: string
  email?: string
}

export function DropdownMenuDemo({name, email}:DropdownMenuDemoProps) {
  return (
    <div className='transition duration-700'> 
      <DropdownMenu >
    <DropdownMenuTrigger asChild >
      <div className='transition duration-700'>
      <Button variant="outline" className="text-black transition duration-700">
        Settings
      </Button>
      </div>
      
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 transition duration-600">
      <DropdownMenuLabel>
        <div className="flex justify-between w-full items-center">
          <div className='flex flex-col items-start'>
            <p className='text-sm text-black'>{name}</p>
            <h2 className='text-md text-black font-[400]'>{email}</h2>
          </div>
          <div className='w-[20px] h-[20px] mb-3 '>
            <UserButton />
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
        <User className="mr-2 h-4 w-4 transition duration-600" />
          <Link to={'/settings/general'}>
          <span>General</span>
          </Link>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4 transition duration-600" />
          <Link to={'/settings/members'}><span>Members</span></Link>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <Link to={'/settings/advertisers'}><span>Advertisers</span></Link>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Keyboard className="mr-2 h-4 w-4" />
          <Link to={'/settings/web-tracking'}><span>Web tracking</span></Link>
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Users className="mr-2 h-4 w-4" />
          <Link to={'/settings/app-tracking'}><span>App tracking</span></Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <UserPlus className="mr-2 h-4 w-4" />
            <Link to={'/settings/balance-transaction'}> <span>Balance & Transactions</span></Link>
        </DropdownMenuItem>
         {/* <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            
          </DropdownMenuSubTrigger>
           <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                <span></span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span></span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal> 
        </DropdownMenuSub>  */}
        <DropdownMenuItem>
          <Plus className="mr-2 h-4 w-4" />
          <Link to={'/settings/payment-method'}><span>Payment Methods</span></Link>
          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link to={'/settings/invoices'}><span>Invoices</span></Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LifeBuoy className="mr-2 h-4 w-4" />
        <Link to={'/settings/recipes'}><span>Recipes</span></Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LifeBuoy className="mr-2 h-4 w-4" />
       <Link to={'/settings/coupons'}> <span>Coupons</span></Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4 text-red-500" />
       <Link to={'/logout'}><span className='text-red-500'>Logout</span></Link>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu></div>
   
  );
}
