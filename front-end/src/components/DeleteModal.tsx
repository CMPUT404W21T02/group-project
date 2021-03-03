import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import React, { useState } from "react";
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { UserLogin } from "../types/UserLogin";

interface Props {
  loggedInUser: UserLogin
  isModalOpen: boolean
  toggle: any
  postID: string
  removeFromFeed: Function
}

/**
 * Delete Post modal, confirmation to delete post as well as removing from list on success
 * @param props 
 */
export default function DeletePostModal(props: Props){

  const [showError, setShowError] = useState(false);

  function deletePost(e:any) {
      e.preventDefault();
     
      const config:AxiosRequestConfig = {
        auth:{
          username:props.loggedInUser.username,
          password:props.loggedInUser.password
        }
      }

      // Send DELETE request to delete post
      axios.delete(process.env.REACT_APP_API_URL + "/api/author/" + props.loggedInUser.authorId + "/posts/" + props.postID, config)
        .then(res => {
          handleRes(res)
        }).catch(error => {
          setShowError(true)
        })
  }

  function handleRes(res:AxiosResponse){
    if (res.status === 204) {
      // Successfully deleted post
      if(props.removeFromFeed !== undefined){
        props.removeFromFeed(props.postID)
        props.toggle()
      }
    } else if (res.status >= 400) {
      // Error in deleting post
      setShowError(true)
    }
  }

  return (
    <Modal isOpen={props.isModalOpen} toggle={props.toggle}>
    <ModalHeader toggle={props.toggle}>{"Delete post"}</ModalHeader>
    <ModalBody>
      <div>
          {showError ? <Alert>Error in deleting post</Alert> : null}
          {showError ? null : <Button onClick={(e) => deletePost(e)}>Yes</Button>}
          {showError ? null : <Button onClick={() => {props.toggle()}}>No</Button>}
      </div>
    </ModalBody>
  </Modal>
  )
}