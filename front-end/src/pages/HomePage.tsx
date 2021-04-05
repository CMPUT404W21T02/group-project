import { AxiosWrapper } from '../helpers/AxiosWrapper';
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Nav, NavItem, NavLink, TabContent, Card, CardTitle, TabPane, Container, Label, FormGroup } from 'reactstrap';
import PostList from '../components/PostList';
import { Post } from '../types/Post';
import * as Icons from '../assets/Icons';


/**
 * Renders the homepage which will display a stream of public posts
 * @param props 
 */
// https://stackoverflow.com/questions/44118060/react-router-dom-with-typescript/44571743
export default function HomePage(props: any) {

  const [userSearch, setUserSearch] = useState<string>('');
  const [postEntries, setPostEntries] = useState<Post[] | undefined>(undefined);

  // get all public posts
  useEffect(() => {
    AxiosWrapper.get(process.env.REACT_APP_API_URL + "/api/public-posts/", props.loggedInUser).then((res: any) => {
      const posts: Post[] = res.data;
      setPostEntries(posts);
    }).catch((err: any) => {
      console.error(err);
    });
  }, []);

  // update on search
  function onUserSearchChange(e: any) {
    setUserSearch(e.target.value);
  }

  // search for authors with the same displayName
  function searchUsers(e: any) {
    e.preventDefault();
    props.history.push(`/authors/${userSearch}`);
  }

  return (
    <>
      <Row className="justify-content-md-center">
      <Form style={{width: "80%"}} onSubmit={e => searchUsers(e)}>
      <FormGroup row>
      <Label for="Author Search" sm={1}>{Icons.searchIcon}</Label>
        <Col>
        <Input type="text" name="Author Search" placeholder={"Search Authors"} onChange={e => onUserSearchChange(e)} />
        </Col>
      </FormGroup>
      </Form>
      </Row>
        <Row>
          <Col className="justify-content-md-center">
          {<PostList postEntries={postEntries} setPostEntries={setPostEntries} loggedInUser={props.loggedInUser} isResharable={true}/>}
          </Col>
        </Row>
    </>
  );
}