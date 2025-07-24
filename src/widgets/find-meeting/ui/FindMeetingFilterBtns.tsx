'use client';

import { Button } from '@/shared';
import { FindFilterBtn } from '../model/types';
import useFilterBtnStore from '../model/hooks/useFilterBtnStore';

export default function FindMeetingFilters() {
  const selectedFilterId = useFilterBtnStore((state) => state.selectedFileterBtnId);
  const setSelectedFilterId = useFilterBtnStore((state) => state.setSelectedFilterBtnId);

  const filterBtnProps: FindFilterBtn[] = [
    { id: 'filterBtn0', name: '전체', filter: 'all' },
    { id: 'filterBtn1', name: '커피', filter: 'coffee' },
    { id: 'filterBtn2', name: '와인', filter: 'wine' },
    { id: 'filterBtn3', name: '위스키', filter: 'whisky' },
    { id: 'filterBtn4', name: '마감된 모임', filter: 'ending' },
  ];

  const handleBtnClick = (id: string) => {
    setSelectedFilterId(id);
  };

  return (
    <div className="flex mb-1">
      {filterBtnProps.map((prop) => (
        <Button
          key={prop.id}
          id={prop.id}
          variant={selectedFilterId === prop.id ? 'findFilterClicked' : 'outline'}
          className={selectedFilterId === prop.id ? 'text-white' : 'text-gray-090 outline-gray-010'}
          size="findFilterSize"
          onClick={() => handleBtnClick(prop.id)}
        >
          {prop.name}
        </Button>
      ))}
    </div>
  );
}
