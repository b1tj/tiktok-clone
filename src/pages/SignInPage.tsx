import {
  AuthAgreement,
  SignInOption,
  SignUpNavigation,
} from '@/components/Auth/SignInOption'
import { Snackbar } from '@/components/Snackbar'
import { useSnackbarContext } from '@/contexts/Consumers/useSnackbarContext'
import { useLoggedInState } from '@/hooks/useLoggedInState'
import { useSelectState } from '@/hooks/useSelectState'
import { Header } from '@/layouts/Header/Header'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Select, { SelectInstance } from 'react-select'

const options = [
  { value: 'vi', label: 'Tiếng Việt (Việt Nam)' },
  { value: 'en', label: 'English' },
]

export function SignInPage() {
  const { isShow, openSnackbar, closeSnackbar } = useSnackbarContext()
  const loginState = useRef(useLoggedInState())
  const navigate = useNavigate()

  const handleOnAnimationEnd = () => {
    if (isShow) closeSnackbar()
    if (loginState.current) navigate('/', { replace: true })
  }

  useEffect(() => {
    if (loginState.current)
      openSnackbar('You are logged in, no need to repeat that')
  }, [openSnackbar])

  return (
    <>
      <div className="relative flex h-screen flex-col items-center overflow-hidden">
        <Header />
        <div className="mt-[60px] flex h-full w-screen flex-1 flex-col items-center overflow-hidden">
          <SignInOption />
        </div>
        <div className="fixed bottom-0 left-0 bg-transparent">
          <AuthAgreement />
          <SignUpNavigation />
          <SignInPageFooter />
        </div>
      </div>

      {isShow && <Snackbar onAnimationEnd={handleOnAnimationEnd} />}
    </>
  )
}

type Options = {
  value: string
  label: string
}

function SignInPageFooter() {
  const selectRef = useRef<SelectInstance<Options> | null>(null)
  const { isMenuOpen, setIsMenuOpen } = useSelectState(selectRef)

  const [, setSelectedOption] = useState<{
    value: string
    label: string
  } | null>(null)

  return (
    <div className="z-50 flex h-[84px] w-svw items-center justify-between overflow-y-hidden bg-[#121212] p-[0_144px]">
      <div
        className="relative h-[36px] w-[172px] cursor-pointer rounded-sm p-[0_16px] text-[14px]"
        onClick={() => setIsMenuOpen((s) => !s)}
      >
        <Select
          ref={selectRef}
          defaultValue={options[1]}
          onChange={setSelectedOption}
          options={options}
          menuPlacement="top"
          menuIsOpen={isMenuOpen}
          getOptionLabel={(option) => option.label}
          isSearchable={false}
          className="absolute left-0 top-0 w-[172px]"
          menuPortalTarget={document.querySelector('body')}
          theme={(theme) => ({
            ...theme,
            borderRadius: 2,
            colors: {
              ...theme.colors,
              primary: 'grey',
            },
          })}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderColor: 'silver',
              borderBlockWidth: 1,
              backgroundColor: 'black',
              color: 'white',
              ':hover': { borderColor: 'silver' },
              height: 34,
              fontSize: 14,
              cursor: 'pointer',
            }),

            singleValue: (base) => ({
              ...base,
              color: 'white',
              padding: '0 16px',
            }),

            valueContainer: (base) => ({
              ...base,
              padding: 0,
            }),

            menu: (baseStyles) => ({
              ...baseStyles,
              padding: 0,
              height: 'fit-content',
              minWidth: 200,
            }),

            option: (base) => ({
              ...base,
              height: 20,
              fontSize: 12,
              fontWeight: '500',
              padding: '0px 8px',
              lineHeight: '20px',
              ':hover': {
                background: 'gray',
                color: 'white',
              },
              ':active': {
                background: 'white',
                color: 'black',
              },
            }),
          }}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
      </div>
      <div className="flex items-center text-[14px] font-semibold leading-[28px] text-[#8a8b91]">
        <span className="mr-1 h-[28px] text-[16px] font-bold leading-[28px]">
          ©
        </span>
        2024 TopTop
      </div>
    </div>
  )
}
