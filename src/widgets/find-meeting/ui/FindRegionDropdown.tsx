import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/shared';
import { Region } from '../model/types';
import useFilterRegionStore from '../model/hooks/useFilterRegionStore';
import useFilterStore from '../model/hooks/useFilterStore';

export default function FindRegionDropdown() {
  const setSelectedRegion = useFilterRegionStore((state) => state.setSelectedRegion);

  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const sidoList: Region[] = [
    { regionCode: 99, sido: '지역 전체' },
    { regionCode: 0, sido: '서울' },
    { regionCode: 1, sido: '경기' },
    { regionCode: 2, sido: '인천' },
    { regionCode: 3, sido: '대전' },
    { regionCode: 4, sido: '부산' },
    { regionCode: 5, sido: '대구' },
    { regionCode: 6, sido: '울산' },
    { regionCode: 7, sido: '광주' },
    { regionCode: 8, sido: '충북' },
    { regionCode: 9, sido: '충남' },
    { regionCode: 10, sido: '경북' },
    { regionCode: 11, sido: '경남' },
    { regionCode: 12, sido: '전북' },
    { regionCode: 13, sido: '전남' },
    { regionCode: 14, sido: '세종' },
    { regionCode: 15, sido: '제주' },
  ];

  function selectRegion(region: Region) {
    setSelectedRegion(region.sido);

    if (region.regionCode === 99) {
      const { filter, page, ...newFilters } = filters;
      setFilters({ ...newFilters, page: 1 });
    } else {
      setFilters({ ...filters, page: 1, filter: region.sido });
    }
  }

  return (
    <DropdownMenuContent>
      <DropdownMenuGroup>
        {sidoList.map((item) => {
          return (
            <DropdownMenuItem
              key={`sido${item.regionCode}`}
              className="font-sm font-medium"
              onSelect={() => selectRegion(item)}
            >
              {item.sido}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
