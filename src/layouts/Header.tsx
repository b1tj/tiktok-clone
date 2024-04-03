import logo from '@/assets/imgs/tiktok-logo.png'

import { FormEvent, useState } from 'react'
import { Button } from '@/components/Button'
import { Dropdown } from '@/components/Dropdown'
import { SearchResult } from '@/components/SearchResult'

import { config } from '@/config'

import { Search, EllipsisVertical, Plus } from 'lucide-react'
import { useLoginModalContext } from '@/contexts/Consumers/useLoginModalContext'
import { useUserContext } from '@/contexts/Consumers/useUserContext'

export function Header() {
  const [isShowResult, setIsShowResult] = useState(false)
  const { open } = useLoginModalContext()
  const { user } = useUserContext()

  const openResult = () => setIsShowResult(true)
  const closeResult = () => setIsShowResult(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="sticky top-0 z-[999] flex h-[60px] w-full items-center justify-between bg-white pl-4 pr-6 shadow-[0px_1px_1px_#0000001f]">
      <div className="flex min-w-[300px] items-center">
        <a href={config.websiteURL} className="block w-fit">
          <img src={logo} alt="TopTop" className="h-10 flex-shrink-0" />
        </a>
      </div>

      <div className="relative flex w-[516px] min-w-[200px] px-[8px]">
        <SearchResult visible={isShowResult} close={closeResult}>
          <form
            className="group flex w-[500px] min-w-[200px] items-center overflow-hidden
                  rounded-full border border-transparent bg-input px-4 py-2 focus-within:border 
                  focus-within:border-[#1618231f] hover:border hover:border-[#1618231f]"
            onSubmit={handleSubmit}
          >
            <input
              onClick={openResult}
              type="text"
              placeholder="Search"
              className=" w-full flex-grow bg-transparent text-[16px] font-semibold caret-primary outline-none"
            />
            <span className="h-[28px] w-[1px] bg-[#1618231f]"></span>
            <Button
              className="-my-3 -mr-4 flex shrink-0 cursor-pointer items-center border-none py-6 pl-3 pr-4 outline-none group-hover:bg-input"
              intent="icon"
            >
              <Search
                className="opacity-40 group-hover:opacity-100"
                strokeWidth={2.5}
                size={20}
              />
            </Button>
          </form>
        </SearchResult>
      </div>

      <div className="ml-4 flex items-center gap-4">
        <a href="#">
          <Button intent="ghost">
            <Plus size={20} strokeWidth={2} />
            Upload
          </Button>
        </a>
        {!user && (
          <Button intent="fill" className="min-w-[100px]" onClick={open}>
            Log in
          </Button>
        )}
        <div className="cursor-pointer">
          <Dropdown>
            <i>
              <EllipsisVertical />
            </i>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
