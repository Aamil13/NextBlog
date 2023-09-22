"use client"

const { Provider } = require("react-redux")
const { default: store } = require("./store")


export function Providers ({children}){
    return (
        <Provider store={store}>{children}</Provider>
    )
}
