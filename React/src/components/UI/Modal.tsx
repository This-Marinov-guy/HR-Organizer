import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { removeModal } from "src/redux/modal";
import classes from "./Overlay.module.css";

const Backdrop = (props) => {
  return <div className={classes.overlay_backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return <div className={classes.modal_overlay_panel + classes.modal}>{props.children}</div>;
};

const portalElement: any = document.getElementById("overlays");

const Modal = (props) => {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(removeModal());
  };
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={closeHandler} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;