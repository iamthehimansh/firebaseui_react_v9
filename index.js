import FirebaseUi from "./dist"
import React from 'react'
export default FirebaseUi4ReactJs
function FirebaseUi4ReactJs(){
    React.useState(()=>{
        require("./dist/ui.css")
    })
    return <FirebaseUi/>
}
export {FirebaseUi4ReactJs as FirebaseUi4ReactJs, FirebaseUi}