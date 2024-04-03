import { ReactElement, useState } from 'react'

import {
  Lightbulb,
  BookA,
  CircleHelp,
  Keyboard,
  Moon,
  ChevronLeft,
} from 'lucide-react'

import Tippy, { TippyProps } from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'

const items = [
  {
    title: 'Live Creator Hub',
    Icon: Lightbulb,
  },
  {
    title: 'English',
    Icon: BookA,
    children: [
      {
        id: 'en',
        title: 'English',
      },
      {
        id: 'vi',
        title: 'Tiếng Việt (Việt Nam)',
      },
    ],
  },
  {
    title: 'Feedback and help',
    Icon: CircleHelp,
  },
  {
    title: 'Keyboard shortcuts',
    Icon: Keyboard,
  },
  {
    title: 'Dark mode',
    Icon: Moon,
  },
]

const tippyConfig: TippyProps = {
  interactive: true,
  theme: 'light',
  animation: 'fade',
  duration: [0, 700],
  delay: [0, 400],
  offset: [-100, 15],
  hideOnClick: false,
}

type DropdownProps = {
  children: ReactElement
}

export function Dropdown({ children }: DropdownProps) {
  const [selected, setSelected] = useState<number>(-1)

  const handleClose = () => {
    setSelected(-1)
  }

  return (
    <>
      {selected < 0 || items[selected].children === undefined ? (
        <Tippy
          className="overflow-hidden rounded-lg"
          content={
            <ul
              className="-mx-[9px] -my-[5px] flex min-w-[223px] flex-col
                bg-white py-2 text-[16px] font-semibold leading-[21px] shadow-[0_4px_16px_0_rgba(0,0,0,0.02)] "
            >
              {items.map((item, index) => (
                <li
                  key={item.title}
                  onClick={() => setSelected(index)}
                  className="flex h-[41px] w-full shrink-0 items-center gap-2 whitespace-nowrap py-[10px] pl-4 pr-2 hover:bg-ghost"
                >
                  <item.Icon />
                  <span>{item.title}</span>
                  {items.length - 1 === index && <Switch />}
                </li>
              ))}
            </ul>
          }
          // Tippy config
          {...tippyConfig}
          onHidden={() => setSelected(-1)}
        >
          {children}
        </Tippy>
      ) : (
        <Tippy
          className=" overflow-hidden rounded-lg"
          content={
            <div className="m-0 -mx-[9px] -my-[5px] min-w-[223px] bg-white">
              <header className="relative flex h-[50px] items-center">
                <ChevronLeft className=" ml-5" onClick={() => handleClose()} />
                <p className="absolute left-1/2 -translate-x-1/2 text-[16px] font-semibold leading-[21px]">
                  Language
                </p>
              </header>
              <ul>
                {items[selected]?.children?.map((item) => (
                  <li
                    key={item.id}
                    className="px-[24px] py-[10px] text-[14px] font-semibold leading-[14px] hover:bg-ghost"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          }
          {...tippyConfig}
          onHidden={() => setSelected(-1)}
        >
          {children}
        </Tippy>
      )}
    </>
  )
}

function Switch() {
  return (
    <label className="relative ml-8 cursor-pointer">
      <input className="peer sr-only" value="" type="checkbox" />
      <div
        className="peer h-[24px] w-[44px] rounded-full bg-[#1618231f] 
        outline-none duration-100 after:absolute after:left-[2px] after:top-[2px] after:flex after:h-[20px] 
        after:w-[20px] after:items-center after:justify-center after:rounded-full after:bg-white  after:font-bold
      after:text-sky-800 after:outline-none after:duration-500 hover:bg-[#16182329] peer-checked:bg-[#0be09b]
        peer-checked:after:translate-x-[20px] peer-checked:after:border-white peer-focus:outline-none"
      ></div>
    </label>
  )
}
