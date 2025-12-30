import svgPaths from "./svg-numca8js0o";
import imgContainer from "figma:asset/5551f2ffc84c48cc9a5dff421ac5238fa2a0fa42.png";
import { imgVector } from "./svg-00wab";

function Container() {
  return (
    <div className="absolute h-[378.797px] left-0 rounded-[16px] top-0 w-[424px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute h-[28.797px] left-0 top-0 w-[220.633px]" data-name="Frame2608474">
      <p className="absolute font-['Mona_Sans:SemiBold',sans-serif] font-semibold leading-[28.8px] left-0 not-italic text-[24px] text-nowrap text-white top-[-2.5px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Resting Heart Rate
      </p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[7.875px] relative shrink-0 w-full" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgContainer} />
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute bg-black box-border content-stretch flex flex-col items-start left-[225.88px] pb-0 pt-[6.563px] px-[3.5px] rounded-[32px] size-[21px] top-[3.9px]" data-name="Frame2608721">
      <Container1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[28.797px] left-0 top-0 w-[246.883px]" data-name="Container">
      <Frame7 />
      <Frame12 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[17.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p26892900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.09375" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex h-[24.5px] items-center justify-center left-px top-px w-[28px]" data-name="Container">
      <Icon />
    </div>
  );
}

function CompareButton() {
  return (
    <div className="absolute bg-[#343434] h-[26.5px] left-[352px] rounded-[8px] top-[0.9px] w-[30px]" data-name="CompareButton">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container3 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute h-[28.797px] left-0 top-0 w-[382px]" data-name="Frame2608473">
      <Container2 />
      <CompareButton />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[20.695px] left-0 rounded-[15px] top-0 w-[68.703px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[15px]" />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute contents inset-[3.13%_9.93%_3.12%_9.93%]">
      <div className="absolute inset-[3.13%_9.93%_3.12%_9.93%]" data-name="Vector">
        <div className="absolute inset-[-2.22%_-2.6%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
            <path d={svgPaths.pa8a9df1} fill="var(--fill-0, #E6FAEB)" id="Vector" stroke="var(--stroke-0, #E6FAEB)" strokeWidth="0.4375" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[10.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Frame10 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[5.25px] size-[10.5px] top-[4.84px]" data-name="Frame2608677">
      <Icon1 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[18.195px] left-[19.25px] top-px w-[42.453px]" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Bold',sans-serif] font-bold leading-[18.2px] left-0 not-italic text-[14px] text-nowrap text-white top-[-1px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        2 bpm
      </p>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.05)] h-[20.695px] left-[82.21px] rounded-[15px] top-0 w-[68.703px]" data-name="Component4">
      <Container4 />
      <Frame11 />
      <Paragraph />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[73.461px]" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[20px] text-white top-[-2.5px] w-[74px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        60 bpm
      </p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[150.914px]" data-name="Frame2608674">
      <Component />
      <Paragraph1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[16.797px] left-0 top-[23.5px] w-[39.945px]" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.7)] text-nowrap top-[-2px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Today
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute h-[42px] left-[14px] top-[14px] w-[150.914px]" data-name="Frame2608427">
      <Frame9 />
      <Paragraph2 />
    </div>
  );
}

function ChartLegend() {
  return <div className="absolute left-[368px] size-0 top-[14px]" data-name="ChartLegend" />;
}

function Paragraph3() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.5px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        APRIL
      </p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.97px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        14
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[24px] items-start left-[10.64px] overflow-clip top-[5.25px] w-[28.781px]" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Tab() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[34.5px] left-[5.25px] overflow-clip rounded-[360px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)] top-[1.75px] w-[50.07px]" data-name="Tab2">
      <Container5 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.5px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        APRIL
      </p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.64px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        15
      </p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[24px] items-start left-[10.64px] overflow-clip top-[5.25px] w-[28.781px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Tab1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[34.5px] left-[58.82px] overflow-clip rounded-[360px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)] top-[1.75px] w-[50.07px]" data-name="Tab4">
      <Container6 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.5px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        APRIL
      </p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.52px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        16
      </p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col h-[24px] items-start left-[10.64px] overflow-clip top-[5.25px] w-[28.781px]" data-name="Container">
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Tab2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[34.5px] left-[112.39px] overflow-clip rounded-[360px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)] top-[1.75px] w-[50.07px]" data-name="Tab5">
      <Container7 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.5px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        APRIL
      </p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.8px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        17
      </p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[24px] items-start left-[10.64px] overflow-clip top-[5.25px] w-[28.781px]" data-name="Container">
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function Tab3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[34.5px] left-[165.96px] overflow-clip rounded-[360px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)] top-[1.75px] w-[50.07px]" data-name="Tab6">
      <Container8 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.5px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        APRIL
      </p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.6px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        18
      </p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col h-[24px] items-start left-[10.64px] overflow-clip top-[5.25px] w-[28.781px]" data-name="Container">
      <Paragraph11 />
      <Paragraph12 />
    </div>
  );
}

function Tab4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[34.5px] left-[219.53px] overflow-clip rounded-[360px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)] top-[1.75px] w-[50.07px]" data-name="Tab7">
      <Container9 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.5px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        APRIL
      </p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.52px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        19
      </p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col h-[24px] items-start left-[10.64px] overflow-clip top-[5.25px] w-[28.781px]" data-name="Container">
      <Paragraph13 />
      <Paragraph14 />
    </div>
  );
}

function Tab5() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[34.5px] left-[273.1px] overflow-clip rounded-[360px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)] top-[1.75px] w-[50.07px]" data-name="Tab8">
      <Container10 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.5px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        APRIL
      </p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Mona_Sans:Regular',sans-serif] font-normal leading-[12px] left-[14.52px] not-italic text-[10px] text-[rgba(255,255,255,0.6)] text-center text-nowrap top-[-1px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        20
      </p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col h-[24px] items-start left-[10.64px] overflow-clip top-[5.25px] w-[28.781px]" data-name="Container">
      <Paragraph15 />
      <Paragraph16 />
    </div>
  );
}

function Tab6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[34.5px] left-[326.67px] overflow-clip rounded-[360px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)] top-[1.75px] w-[50.07px]" data-name="Tab9">
      <Container11 />
    </div>
  );
}

function TabsSmall() {
  return (
    <div className="absolute h-[38px] left-0 overflow-clip rounded-[360px] top-[256px] w-[382px]" data-name="TabsSmall">
      <Tab />
      <Tab1 />
      <Tab2 />
      <Tab3 />
      <Tab4 />
      <Tab5 />
      <Tab6 />
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute bottom-[20.86%] contents left-0 right-0 top-0" data-name="Mask group">
      <div className="absolute inset-[12.23%_0.29%_20.86%_-0.57%] mask-intersect mask-luminance mask-no-clip mask-no-repeat mask-position-[2px_-17px] mask-size-[350px_110px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 351 93">
          <path d={svgPaths.p12586380} fill="url(#paint0_linear_285_634)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_285_634" x1="0" x2="0" y1="0" y2="93">
              <stop stopColor="#B9E3F4" stopOpacity="0.3" />
              <stop offset="0.6" stopColor="#B9E3F4" stopOpacity="0.3" />
              <stop offset="1" stopColor="#B9E3F4" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[139px] relative shrink-0 w-full" data-name="Icon">
      <MaskGroup />
    </div>
  );
}

function LineGradientFill() {
  return (
    <div className="absolute content-stretch flex flex-col h-[139px] items-start left-[14.5px] top-[102.6px] w-[350px]" data-name="LineGradientFill">
      <Icon2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute contents inset-[77.73%_92.57%_0.46%_0.57%]">
      <div className="absolute inset-[77.73%_92.57%_0.46%_0.57%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector"></g>
        </svg>
      </div>
      <div className="absolute inset-[81.82%_94%_5.46%_2%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
          <path d={svgPaths.p7098980} fill="var(--fill-0, #B9E3F4)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute contents inset-[40%_76.86%_38.18%_16.29%]" data-name="Frame 2608411_2">
      <div className="absolute inset-[40%_76.86%_38.18%_16.29%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector"></g>
        </svg>
      </div>
      <div className="absolute inset-[44.09%_78.29%_43.18%_17.71%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
          <path d={svgPaths.p7098980} fill="var(--fill-0, #B9E3F4)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute contents inset-[60%_61.43%_18.18%_31.71%]">
      <div className="absolute inset-[60%_61.43%_18.18%_31.71%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector"></g>
        </svg>
      </div>
      <div className="absolute inset-[64.09%_62.86%_23.18%_33.14%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
          <path d={svgPaths.p7098980} fill="var(--fill-0, #B9E3F4)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute contents inset-[40.91%_46.38%_37.27%_46.76%]" data-name="Frame 2608412_2">
      <div className="absolute inset-[40.91%_46.38%_37.27%_46.76%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector"></g>
        </svg>
      </div>
      <div className="absolute inset-[45%_47.81%_42.27%_48.19%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
          <path d={svgPaths.p7098980} fill="var(--fill-0, #B9E3F4)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute contents inset-[6.36%_31.14%_71.82%_62%]">
      <div className="absolute inset-[6.36%_31.14%_71.82%_62%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector"></g>
        </svg>
      </div>
      <div className="absolute inset-[10.46%_32.57%_76.82%_63.43%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
          <path d={svgPaths.p7098980} fill="var(--fill-0, #B9E3F4)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute contents inset-[60%_16%_18.18%_77.14%]" data-name="Frame 2608414_2">
      <div className="absolute inset-[60%_16%_18.18%_77.14%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector"></g>
        </svg>
      </div>
      <div className="absolute inset-[64.09%_17.43%_23.18%_78.57%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
          <path d={svgPaths.p7098980} fill="var(--fill-0, #B9E3F4)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute contents inset-[47.27%_1.43%_30.91%_91.71%]">
      <div className="absolute inset-[47.27%_1.43%_30.91%_91.71%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector"></g>
        </svg>
      </div>
      <div className="absolute bottom-[34.55%] left-[92.71%] right-[2.43%] top-1/2" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 18">
          <path d={svgPaths.p234e1200} fill="var(--fill-0, #B9E3F4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[34.55%] left-[92.71%] right-[2.43%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-8.81%_-8.84%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 21">
            <path d={svgPaths.p1124600} id="Vector" stroke="var(--stroke-0, #E5F4FB)" strokeWidth="3.00489" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute contents inset-[6.36%_1.43%_0.46%_0.57%]">
      <div className="absolute inset-[15.46%_5.43%_11.82%_3.14%]">
        <div className="absolute inset-[-2.58%_-0.47%_-1.87%_-0.47%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 323 84">
            <path d={svgPaths.p3b4c2ae0} id="Vector 97" stroke="var(--stroke-0, #B9E3F4)" strokeLinecap="round" strokeWidth="3.00489" />
          </svg>
        </div>
      </div>
      <Frame />
      <Frame13 />
      <Frame1 />
      <Frame14 />
      <Frame3 />
      <Frame15 />
      <Frame2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[110.359px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Frame5 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[110.359px] items-start left-[14px] top-[103px] w-[350px]" data-name="Frame2608472">
      <Icon3 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[294px] left-0 overflow-clip top-0 w-[382px]" data-name="Container">
      <Frame4 />
      <ChartLegend />
      <TabsSmall />
      <LineGradientFill />
      <Frame8 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute h-[294px] left-0 rounded-[10px] top-0 w-[382px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.05)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Rhr() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.04)] h-[294px] left-0 rounded-[10px] top-[42.8px] w-[382px]" data-name="Rhr">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[336.797px] left-[21px] top-[21px] w-[382px]" data-name="Container">
      <Frame6 />
      <Rhr />
    </div>
  );
}

function HeartRateCard() {
  return (
    <div className="absolute bg-[#232325] h-[378.797px] left-[359.5px] rounded-[16px] top-[196.6px] w-[424px]" data-name="HeartRateCard">
      <Container />
      <Container14 />
    </div>
  );
}

export default function HeartRateComponentRecreation() {
  return (
    <div className="bg-[#171719] relative size-full" data-name="Heart Rate Component Recreation">
      <HeartRateCard />
    </div>
  );
}