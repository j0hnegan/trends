function ToggleSwitch() {
  return (
    <div className="h-[19.444px] relative shrink-0 w-[35px]" data-name="Toggle Switch">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 20">
        <g clipPath="url(#clip0_5_30)" id="Toggle Switch">
          <rect fill="var(--fill-0, #E9E9E9)" height="19.2073" id="canvas" rx="9.60366" width="35" />
          <ellipse cx="9.96906" cy="9.4051" fill="var(--fill-0, white)" id="circle" rx="7.68293" ry="7.68293" />
        </g>
        <defs>
          <clipPath id="clip0_5_30">
            <rect fill="white" height="19.4444" width="35" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem() {
  return (
    <div className="relative shrink-0 w-full" data-name="list item">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between px-4 py-1 relative w-full">
          <div className="font-['Mona_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-nowrap tracking-[-0.25px]">
            <p className="leading-[1.43] whitespace-pre">Goals</p>
          </div>
          <ToggleSwitch />
        </div>
      </div>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="box-border content-stretch flex gap-2.5 h-6 items-center justify-start px-4 py-1 relative shrink-0 w-[166px]" data-name="list item">
      <div className="font-['Mona_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] text-nowrap tracking-[1px] uppercase">
        <p className="leading-[1.35] whitespace-pre">Compare</p>
      </div>
    </div>
  );
}

function ToggleSwitch1() {
  return (
    <div className="h-[19.444px] relative shrink-0 w-[35px]" data-name="Toggle Switch">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 20">
        <g clipPath="url(#clip0_5_30)" id="Toggle Switch">
          <rect fill="var(--fill-0, #E9E9E9)" height="19.2073" id="canvas" rx="9.60366" width="35" />
          <ellipse cx="9.96906" cy="9.4051" fill="var(--fill-0, white)" id="circle" rx="7.68293" ry="7.68293" />
        </g>
        <defs>
          <clipPath id="clip0_5_30">
            <rect fill="white" height="19.4444" width="35" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="box-border content-stretch flex h-7 items-center justify-between px-4 py-1 relative shrink-0 w-[166px]" data-name="list item">
      <div className="font-['Mona_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-nowrap tracking-[-0.25px]">
        <p className="leading-[1.43] whitespace-pre">Last week</p>
      </div>
      <ToggleSwitch1 />
    </div>
  );
}

function ToggleSwitch2() {
  return (
    <div className="h-[19.444px] relative shrink-0 w-[35px]" data-name="Toggle Switch">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 20">
        <g clipPath="url(#clip0_5_30)" id="Toggle Switch">
          <rect fill="var(--fill-0, #E9E9E9)" height="19.2073" id="canvas" rx="9.60366" width="35" />
          <ellipse cx="9.96906" cy="9.4051" fill="var(--fill-0, white)" id="circle" rx="7.68293" ry="7.68293" />
        </g>
        <defs>
          <clipPath id="clip0_5_30">
            <rect fill="white" height="19.4444" width="35" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="box-border content-stretch flex h-7 items-center justify-between px-4 py-1 relative shrink-0 w-[166px]" data-name="list item">
      <div className="font-['Mona_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-nowrap tracking-[-0.25px]">
        <p className="leading-[1.43] whitespace-pre">Sleep</p>
      </div>
      <ToggleSwitch2 />
    </div>
  );
}

function Frame2608784() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start relative shrink-0">
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

export default function Tab() {
  return (
    <div className="bg-[#343434] box-border content-stretch flex flex-col gap-3 items-start justify-center px-0 py-3 relative rounded-[8px] size-full" data-name="Tab">
      <ListItem />
      <Frame2608784 />
    </div>
  );
}