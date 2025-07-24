'use client';

import { Button } from '@/shared';
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/Popover';
import { Calendar } from '@/shared/ui/Calendar';
import { enUS } from 'date-fns/locale';
import { format } from 'date-fns';
import useFilterCalendarStore from '../model/hooks/useFilterCalendarStore';

export default function FindMeetingFilterCalendar() {
  const selectedCalendar = useFilterCalendarStore((state) => state.selectedCalendar);
  const toggleCalendarSelection = useFilterCalendarStore((state) => state.toggleCalendarSelection);
  const { date } = useFilterCalendarStore();

  return (
    <div className="flex">
      <Popover open={selectedCalendar} onOpenChange={toggleCalendarSelection}>
        <PopoverTrigger asChild>
          <Button
            id="filterCalendar"
            variant={selectedCalendar ? 'findFilterClicked' : 'outline'}
            className={selectedCalendar ? 'text-white' : 'text-gray-090 outline-gray-010'}
            size="findFilterSize"
          >
            날짜 전체
            <div className="flex w-6 h-6 items-center justify-center ml-2.5">
              <Image
                src={
                  selectedCalendar ? '/assets/icons/polygon-2.svg' : '/assets/icons/polygon-1.svg'
                }
                alt="dropdown Icon"
                width={15.7}
                height={7.42}
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="flex flex-col w-[336px] h-[326px] overflow-hidden p-0 justify-between items-center"
          align="start"
        >
          <div className="flex w-[250px] h-[226px] justify-center">
            <Calendar
              mode="single"
              defaultMonth={date}
              selected={date}
              today={date}
              formatters={{
                formatWeekdayName: (day: Date) => {
                  return format(day, 'eee', { locale: enUS });
                },
              }}
              classNames={{
                week: 'flex w-full rdp-week',
                months: 'mt-4 relative',
                weekday: 'flex-1 text-gray-090 font-bold text-sm',
                today: 'text-primary text-sm font-bold',
                day: 'mx-px text-gray-080 text-sm font-medium select-none rdp-day',
              }}
              className="rdp-week"
            />
          </div>
          <div className="flex mt-3 mb-6 items-center">
            <Button variant="calendarBtn1" className="mr-3">
              초기화
            </Button>
            <Button variant="calendarBtn2">적용</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
