import { ArrowUp, Dot, LucideIcon, TrendingUp } from 'lucide-react'
import { ReactElement } from 'react'
import Tippy, { TippyProps } from '@tippyjs/react/headless'
import 'tippy.js/themes/light.css'

const searchItems = [
  {
    Icon: ArrowUp,
    result: 'asmr',
  },
  {
    Icon: TrendingUp,
    result: 'Bộ sưu tập mới của Gucci gây sốc',
  },
  {
    Icon: TrendingUp,
    result: 'Festival phở Nam Định',
  },
  {
    Icon: Dot,
    result: 'Virusssssssss vs Zack',
  },
  {
    Icon: Dot,
    result: 'car cleaning',
  },
]

const tippyConfig: TippyProps = {
  arrow: false,
  interactive: true,
  offset: [0, 8],
  maxWidth: 516,
}

type SearchResultProps = {
  children: ReactElement
  visible: boolean
  close: () => void
}

export function SearchResult({ visible, close, children }: SearchResultProps) {
  return (
    <Tippy
      render={(attrs) => (
        <div {...attrs} className="tippy-box flex w-full bg-white lg:w-[516px]">
          <ul className="w-full rounded-lg bg-white pt-[8px] shadow-[0_2px_12px_0_rgba(0,0,0,0.12)]">
            <div className=" text-text-fade px-[12px] pb-[3px] pt-[5px] text-[14px] font-bold leading-[22px] opacity-95">
              You may like
            </div>
            {searchItems.map((item, index) => (
              <SearchItem key={index} Icon={item.Icon} itemText={item.result} />
            ))}
          </ul>
        </div>
      )}
      {...tippyConfig}
      visible={visible}
      onClickOutside={close}
    >
      {children}
    </Tippy>
  )
}

type SearchItemProps = {
  Icon: LucideIcon
  itemText: string
}

function SearchItem({ Icon, itemText }: SearchItemProps) {
  return (
    <li className="flex h-[42px] cursor-pointer items-center px-[16px] py-[9px] hover:bg-ghost">
      <Icon
        className={`${Icon === Dot ? 'text-[#16182357]' : 'text-primary'}`}
        size={20}
        strokeWidth={Icon === Dot ? 6 : 2}
      />
      <h4 className="text-text pl-[8px] pr-[12px] text-[16px] font-semibold">
        {itemText}
      </h4>
    </li>
  )
}
