import React, { Component } from "react";
import "./Question.css";
import Modal from "react-modal";
import questionblue from "../../assets/questioning.svg";

class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state={
          open: false,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    componentDidMount() {
    }
    handleOpenModal () {
        this.setState({ showModal: true });
      }
      handleCloseModal () {
        this.setState({ showModal: false });
      }

      render() {
        return (
          <>
        <img src={questionblue} className="question" onClick={this.handleOpenModal}/>  
          <Modal isOpen={this.state.showModal} className="Modal" overlayClassName="Overlay"> 
            <button className="modal-close-button" onClick={this.handleCloseModal}>X</button>
            <p className="about-content">
              <p className="about-title">welcome to the write pet !</p>
              <p className= "abouttext list">✩ adopt and take care of a virtual pet by journaling consistently </p>
              <p className= "abouttext list">✩ take care of yourself by taking care of your pet :)</p>
              <p className= "abouttext">happy journaling!</p>
              <p className="names">♡ jess + sarah ♡</p>
          </p>
          </Modal>
            </>
        );
      }
    }
export default Navbar;
