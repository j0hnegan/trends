function Frame822() {
  return <div className="absolute bg-[#ffffff] left-0.5 rounded-[29px] size-1 top-0" />;
}

function Frame823() {
  return <div className="absolute bg-[#ffffff] left-0.5 rounded-[29px] size-1 top-[7px]" />;
}

function Frame824() {
  return <div className="absolute bg-[#ffffff] left-0.5 rounded-[29px] size-1 top-3.5" />;
}

function Component3() {
  return (
    <div className="absolute h-[18px] left-0 top-0 w-2" data-name="Component 3">
      <Frame822 />
      <Frame823 />
      <Frame824 />
    </div>
  );
}

function ListItem() {
  return (
    <div className="relative shrink-0 w-full" data-name="list item">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-start px-4 py-1 relative w-full">
          <div className="font-['Mona_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-nowrap tracking-[-0.25px]">
            <p className="leading-[1.43] whitespace-pre">{`Show `}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="relative shrink-0 w-full" data-name="list item">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-2.5 items-center justify-start px-4 py-1 relative w-full">
          <div className="font-['Mona_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ff7161] text-[14px] text-nowrap tracking-[-0.25px]">
            <p className="leading-[1.43] whitespace-pre">Delete Intake Form</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tab() {
  return (
    <div className="absolute bg-[#343434] box-border content-stretch flex flex-col items-start justify-center left-0.5 px-0 py-3 rounded-[8px] top-[22px]" data-name="Tab">
      <ListItem />
      <ListItem1 />
    </div>
  );
}

export default function MoreMenu() {
  return (
    <div className="relative size-full" data-name="more-menu">
      <Component3 />
      <Tab />
    </div>
  );
}