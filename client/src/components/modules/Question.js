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
          <Modal isOpen={this.state.showModal} className="Modalq" overlayClassName="Overlay"> 
            <button className="modal-close-button" onClick={this.handleCloseModal}>X</button>
            <p className="questions-content">
              <p className="about-title">instructions</p>
              <p className= "questiontext">✩ click reflect to start/update today's entry </p>
              <p className= "questiontext">✩ hearts show your pet's mood</p>
              <p className= "questiontext">✩ journal for at least 2 days in a row to maximize happiness</p>
              <p className= "questiontext">✩ check pet profile to learn more about your pet</p>
              <p className= "questiontext">✩ view past entries in timeline</p>
              <p className= "questiontext">✩ click switch pet to adopt a new pet</p>
          </p>
          </Modal>
            </>
        );
      }
    }
export default Navbar;
