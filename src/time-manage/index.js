import React from "react"

import BabyTimeManage from "./baby"
//import PapaTimeManage from "./papa"

export const TimeManage=(props)=>(
    <div>
        <BabyTimeManage {...props}/>

    </div>
)

export default Object.assign(TimeManage,{reducer:BabyTimeManage.reducer})
