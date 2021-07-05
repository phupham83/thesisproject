import React from "react"
import * as reactRedux from "react-redux"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
// import { MemoryRouter } from "react-router"
import Transactions from "./Transaction"
import Accounts from "./Accounts"

const useSelectorMock = jest.spyOn(reactRedux, "useSelector")
const useDispatchMock = jest.spyOn(reactRedux, "useDispatch")
const dummyDispatch = jest.fn()

describe("<Transaction />", () => {
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    })
    test("render transaction and calls dispatch to initiate transactions", () => {
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)
        useSelectorMock.mockReturnValue([{ counterparty:"Tesco", amount:"30", type:"out", id:"60fcde2" }])
        const component = render(
            <Transactions />
        )
        expect(component.container).toHaveTextContent(
            "Tesco"
        )
        expect(dummyDispatch.mock.calls).toHaveLength(1)
    })
})

describe("<Accounts />", () => {
    let component
    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
        useDispatchMock.mockReturnValue(dummyDispatch)
    })
    test("render add accounts when there is no consent", () => {
        useSelectorMock.mockReturnValue({ consent: false })
        component = render(
            <Accounts />
        )
        expect(component.container.querySelector("addAccount")).toBeDefined()
        expect(component.container.querySelector("showAccount")).not
    })
    // test("after clicking button, consent page is shown", () => {
    //     useSelectorMock.mockReturnValue({ consent: false })
    //     component = render(
    //         <MemoryRouter>
    //             <Accounts />
    //         </MemoryRouter>
    //     )
    //     const button = component.getByText("Add account")
    //     fireEvent.click(button)
    //     expect(screen.getByText("Consent confirmation").toBeInTheDocument())

    // })
    test("render show accounts when there is consent",() => {
        useSelectorMock.mockReturnValue({ consent: true, accounts:["Loyds, HSBC"] })
        component = render(
            <Accounts />
        )
        expect(component.container).toHaveTextContent(
            "HSBC"
        )
    })
})

