import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/shared';
import { SortType } from '@/entities/meetings';
import { SorterState } from '../model/types';
import useSorterStore from '../model/hooks/useSorterStore';
import useFilterStore from '../model/hooks/useFilterStore';

export default function FindSorterDropdown() {
  const setSelectedSorter = useSorterStore((state) => state.setSelectedSorter);

  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const sorterList: SorterState[] = [
    { sorterCode: 1, sorter: '최신순', sortType: SortType.latest },
    { sorterCode: 2, sorter: '마감임박', sortType: SortType.closingSoon },
    { sorterCode: 3, sorter: '인기순', sortType: SortType.popularity },
    { sorterCode: 4, sorter: '금액 낮은 순', sortType: SortType.costLow },
    { sorterCode: 5, sorter: '금액 높은 순', sortType: SortType.costHigh },
  ];

  function selectSorter(item: SorterState) {
    setSelectedSorter(item.sorter);

    setFilters({ ...filters, page: 1, sort: item.sortType });
  }

  return (
    <DropdownMenuContent>
      <DropdownMenuGroup>
        {sorterList.map((items) => {
          return (
            <DropdownMenuItem
              key={`sido${items.sorterCode}`}
              className="font-sm font-medium"
              onSelect={() => selectSorter(items)}
            >
              {items.sorter}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
