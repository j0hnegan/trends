export default function Button() {
  return (
    <div className="bg-[#343434] relative rounded-[8px] size-full" data-name="button">
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex gap-1 items-center justify-center px-2 py-1 relative size-full">
          <div className="font-['Mona_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-nowrap tracking-[-0.25px]">
            <p className="leading-[1.43] whitespace-pre">Customize</p>
          </div>
        </div>
      </div>
    </div>
  );
}