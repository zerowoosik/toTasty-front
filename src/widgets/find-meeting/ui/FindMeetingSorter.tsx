'use client';

import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

import { Button } from '@/shared';
import Image from 'next/image';
import FindSorterDropdown from './FindSorterDropdown';
import useSorterStore from '../model/hooks/useSorterStore';

export default function FindMeetingSorter() {
  const selectedSorter = useSorterStore((state) => state.selectedSorter);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          id="sorter"
          variant="outline"
          className="text-foreground outline-background"
          size="findFilterSize"
        >
          {selectedSorter}
          <div className="flex items-center justify-center dark:invert">
            <Image src="/assets/icons/sort.svg" alt="dropdown Icon" width={15.7} height={7.42} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <FindSorterDropdown />
    </DropdownMenu>
  );
}
