import React, {forwardRef, useImperativeHandle} from "react";
import './Modals.css';

import ReactDOM from "react-dom";

const Modal3 = forwardRef((props3, ref3) => {
    const [display3, setDisplay3] = React.useState(false);

    useImperativeHandle(ref3, () => {
        return {
            openModal3: () => open3(),
            close3: () => close3()
        }
    });

    const open3 = () => {
        setDisplay3(true);
    }

    const close3 = () => {
        setDisplay3(false);
    }

    if (display3) {

        return ReactDOM.createPortal(
        <div className={"modal-wrapper"}>
            <div className={"modal-backdrop"}></div>
            <div className={"modal-box"}>
                {props3.children}
            </div>
        </div>, document.getElementById("modal-root"))
    }

    return null;

});

export default Modal3