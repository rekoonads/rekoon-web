import {
  ArrowLeftRight,
  Atom,
  Binary,
  Cloud,
  Code,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  NotepadText,
  Plus,
  PlusCircle,
  ScrollText,
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
      <Button variant="outline" className="text-black dark:text-white transition duration-700">
        Settings
      </Button>
      </div>
      </DropdownMenuTrigger>
    <DropdownMenuContent className="w-72 transition duration-600">
      <DropdownMenuLabel>
        <div className="flex justify-between w-[100%] items-center">
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
        {/* <User /> */}
        <Atom className="mr-2 h-5 w-5 transition duration-600 text-blue-950" />
          <Link to={'/settings/general'}>
          <span className='text-md font-semibold text-blue-950'>General</span>
          </Link>
          {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Users className="mr-2 h-4 w-4 transition duration-600 text-blue-950" />
          <Link to={'/settings/members'}><span className='text-md font-semibold text-blue-950'>Members</span></Link>
          {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
        </DropdownMenuItem>
        <DropdownMenuItem>
        <Keyboard className="mr-2 h-5 w-5 transition duration-600 text-blue-950"/>
          {/* <Settings className="mr-2 h-4 w-4" /> */}
          <Link to={'/settings/advertisers'}><span className='text-md font-semibold text-blue-950' >Advertisers</span></Link>
          {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Code  className="mr-2 h-5 w-5 transition duration-600 text-blue-950" />
          <Link to={'/settings/web-tracking'}><span className='text-md font-semibold text-blue-950'>Web tracking</span></Link>
          {/* <DropdownMenuShortcut>⌘K</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Binary  className="mr-2 h-5 w-5 transition duration-600 text-blue-950" />
          <Link to={'/settings/app-tracking'}><span className='text-md font-semibold text-blue-950'>App tracking</span></Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <ArrowLeftRight  className="mr-2 h-5 w-5 transition duration-600 text-blue-950" />
            <Link to={'/settings/balance-transaction'}> <span className='text-md font-semibold text-blue-950'>Balance & Transactions</span></Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Plus className="mr-2 h-5 w-5 transition duration-600 text-blue-950" />
          <Link to={'/settings/payment-method'}><span className='text-md font-semibold text-blue-950'>Payment Methods</span></Link>
          {/* <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuGroup>
      {/* <DropdownMenuSeparator /> */}
      <DropdownMenuItem>
        <NotepadText className="mr-2 h-5 w-5 transition duration-600 text-blue-950" />
        <Link to={'/settings/invoices'}><span className='text-md font-semibold text-blue-950'>Invoices</span></Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <ScrollText  className="mr-2 h-5 w-5 transition duration-600 text-blue-950" />
        <Link to={'/settings/recipes'}><span className='text-md font-semibold text-blue-950'>Receipts</span></Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LifeBuoy className="mr-2 h-5 w-5 transition duration-600 text-blue-950" />
       <Link to={'/settings/coupons'}> <span className='text-md font-semibold text-blue-950'>Coupons</span></Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut className="mr-2 h-5 w-5 transition duration-600 text-red-800" />
       <Link to={'/logout'}><span className='text-red-800 text-md font-semibold'>Logout</span></Link>
        {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu></div>
   
  );
}
