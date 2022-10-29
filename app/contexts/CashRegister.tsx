import React, { createContext, useContext, useState } from "react"

interface ICashRegisterContext {
  cashRegisterId: number | undefined
  cashRegisterOpenHour: string
  isOpen: boolean
  updatecashRegisterId(cashRegisterIdParam: number): void
  updateCashRegisterOpenHour(cashRegisterOpenHourParam: string): void
  updateIsOpen(isOpenParam: boolean): void
}

export const CashRegisterContext = createContext<ICashRegisterContext>({} as ICashRegisterContext)

export const CashRegisterProvider: React.FC = ({ children }: any) => {
  const [cashRegisterId, setCashRegisterId] = useState<number>()
  const [cashRegisterOpenHour, setCashRegisterOpenHour] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const updatecashRegisterId = (cashRegisterIdParam: number) => {
    setCashRegisterId(cashRegisterIdParam)
  }

  const updateCashRegisterOpenHour = (cashRegisterOpenHourParam: string) => {
    setCashRegisterOpenHour(cashRegisterOpenHourParam)
  }
  const updateIsOpen = (isOpenParam: boolean) => {
    setIsOpen(isOpenParam)
  }

  return (
    <CashRegisterContext.Provider
      value={{
        cashRegisterId,
        cashRegisterOpenHour,
        isOpen,
        updatecashRegisterId,
        updateCashRegisterOpenHour,
        updateIsOpen,
      }}
    >
      {children}
    </CashRegisterContext.Provider>
  )
}

export const useCashRegister = () => useContext(CashRegisterContext) //eslint-disable-line
