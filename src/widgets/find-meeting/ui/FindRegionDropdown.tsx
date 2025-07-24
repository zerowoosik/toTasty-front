import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/shared';
import { Region } from '../model/types';

export default function FindRegionDropdown() {
  const sidoList: Region[] = [
    { regionCode: 0, sido: '서울' },
    { regionCode: 1, sido: '경기' },
    { regionCode: 2, sido: '인천' },
    { regionCode: 3, sido: '강원' },
    { regionCode: 4, sido: '대전' },
    { regionCode: 5, sido: '충청' },
    { regionCode: 6, sido: '경상' },
  ];

  return (
    <DropdownMenuContent>
      <DropdownMenuGroup>
        {sidoList.map((items) => {
          return (
            <DropdownMenuItem key={`sido${items.regionCode}`} className="font-sm font-medium">
              {items.sido}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
