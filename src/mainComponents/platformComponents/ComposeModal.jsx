import React, {forwardRef, useImperativeHandle} from "react";
import './ComposeModal.css';

import ReactDOM from "react-dom";

const ComposeModal = forwardRef((propsCompose, refCompose) => {
    const [displayCompose, setDisplayCompose] = React.useState(false);

    useImperativeHandle(refCompose, () => {
        return {
            openModalCompose: () => openCompose(),
            closeCompose: () => closeCompose()
        }
    });

    const openCompose = () => {
        setDisplayCompose(true);
    }

    const closeCompose = () => {
        setDisplayCompose(false);
    }

    if (displayCompose) {

        return ReactDOM.createPortal(
        <div className={"modalc-wrapper"}>
            <div className={"modalc-backdrop"}></div>
            <div className={"modalc-box"}>
                {propsCompose.children}
            </div>
        </div>, document.getElementById("modal-root"))
    }

    return null;

});

export default ComposeModal