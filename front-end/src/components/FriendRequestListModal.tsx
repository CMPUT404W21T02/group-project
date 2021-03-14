import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Follow } from '../types/Follow';
import FriendRequestItem from './FriendRequestItem';

const FriendRequestListModal = (props: any) => {
  const [friendReqEntries, setFriendReqEntries] = useState<Follow[] | undefined>(undefined);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/api/author/" + props.loggedInUser.authorId + "/inbox").then(res => {
      const friendReqs: Follow[] = res.data.items.filter((fr: Follow) => { return fr.type === 'follow' });
      setFriendReqEntries(friendReqs);
    })
  }, []);

  let requestsToDisplay;
  if (friendReqEntries === undefined) {
    requestsToDisplay = <Card body className="text-center"><CardBody><CardTitle tag="h5" >Loading Friend Requests...</CardTitle></CardBody></Card>
  } else if (friendReqEntries.length === 0) {
    requestsToDisplay = <Card body className="text-center"><CardBody><CardTitle tag="h5" >No Friend Requests :(</CardTitle></CardBody></Card>
  } else {
    requestsToDisplay = friendReqEntries.map((fr: Follow) => {
      return <FriendRequestItem {...props} friendRequest={fr} />
    })
  }

  return (
    <>
      <Modal isOpen={props.isFriendRequestOpen} size="lg" toggle={() => props.setIsFriendRequestOpen(!props.isFriendRequestOpen)}>
        <ModalHeader toggle={() => props.setIsFriendRequestOpen(!props.isFriendRequestOpen)}>
          Friend Requests
                </ModalHeader>
        <ModalBody>
          {requestsToDisplay}
        </ModalBody>
      </Modal>
    </>
  );
}

export default FriendRequestListModal;