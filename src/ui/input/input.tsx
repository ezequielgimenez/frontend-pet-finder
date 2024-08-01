import React from "react"
import * as style from "./input.module.css"

type myProp = {
    type:string,
    name:string,
    color?:string
}

export function MyInput(p:myProp) {
    return <div className={style.mainInput}>
            <input className={`${style.input} ${style[p.color]}`} type={p.type} name={p.name}/>
    </div>
}