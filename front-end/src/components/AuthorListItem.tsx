import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Card, CardBody, Container, Row, Col, CardImg, CardTitle, Button, CardLink, CardSubtitle } from 'reactstrap';
import { Author } from "../types/Author";
import { UserLogin } from '../types/UserLogin';
import FollowRequestButton from './FriendRequestButton';

interface Props {
  author: Author;
  loggedInUser?: UserLogin;
}

/**
 * Author list item component to show an individual author
 * @param props 
 */
export default function AuthorListItem(props: Props) {
  // TODO: this will eventually change to be using the host from the author when we start connecting with other groups
  const isFollowerUrl = process.env.REACT_APP_API_URL + "/api/author/" + props.author.id + "/followers/" + props.loggedInUser?.authorId;

  const [isFollower, setIsFollower] = useState<boolean>(false);

  useEffect(() => {
    // get whether user is follower of author
    axios.get(isFollowerUrl).then(res => {
      setIsFollower(true);
    }).catch(err => {
      setIsFollower(false);
    })
  }, []);

  const displayFollowButton = () => {
    if (props.loggedInUser && props.author.id !== props.loggedInUser?.authorId) {
      return <FollowRequestButton loggedInUser={props.loggedInUser} currentAuthor={props.author} isFollower={isFollower} setIsFollower={setIsFollower} /> 
    }
  }

  return (
    <Card>
    <CardBody>
      <Container fluid>
        <Row>
          <Col xs="1">
            <CardImg top width="10%" src={props.author.github + ".png"} alt="card image cap" />
            {/* Center the follow button */}
            <CardBody>{displayFollowButton()}</CardBody>
          </Col>
          <Col xs="6">
            <CardTitle tag="h3" >{props.author.displayName}</CardTitle>
            <CardSubtitle tag="h5">
              <Link to={{ pathname: `/author/${props.author.id}` }}>View Profile</Link>
            </CardSubtitle> 
          </Col>
        </Row>
      </Container>
    </CardBody>
  </Card>
  )
}
