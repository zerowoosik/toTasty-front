import FindMeetingPanel from './ui/FindMeetingPanel';
import FindMeetingFilters from './ui/FindMeetingFilterBtns';
// import FindMeetingFilterCalendar from './ui/FindMeetingFilterCalendar';
import FindMeetingRegionSelector from './ui/FindMeetingRegionSelector';
import FindMeetingSorter from './ui/FindMeetingSorter';

export default function FindMeetingHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[1000px] mx-auto px-0.5">
      <div className="flex mt-6">
        <FindMeetingPanel />
      </div>
      <div className="flex mt-8 py-4 border-b-1">
        <FindMeetingFilters />
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex">
          <FindMeetingRegionSelector />
          {/* <FindMeetingFilterCalendar /> */}
        </div>
        <FindMeetingSorter />
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
