import React, {forwardRef, useImperativeHandle} from "react";
import './Modals.css';

import ReactDOM from "react-dom";

const Modal2 = forwardRef((props2, ref2) => {
    const [display2, setDisplay2] = React.useState(false);

    useImperativeHandle(ref2, () => {
        return {
            openModal2: () => open2(),
            close2: () => close2()
        }
    });

    const open2 = () => {
        setDisplay2(true);
    }

    const close2 = () => {
        setDisplay2(false);
    }

    if (display2) {

        return ReactDOM.createPortal(
        <div className={"modal-wrapper"}>
            <div className={"modal-backdrop"}></div>
            <div className={"modal-box"}>
                {props2.children}
            </div>
        </div>, document.getElementById("modal-root"))
    }

    return null;

});

export default Modal2