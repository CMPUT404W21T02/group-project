import React, { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import CreateEditPostModal from '../components/CreateEditPostModal';
import PostListItem from '../components/PostListItem';
import { Post } from '../types/Post';


export default function PostList(props:any) {

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState<boolean>(false);

  function prependToFeed(post:Post){
    if(props.postEntries !== undefined){
      props.setPostEntries([post, ...props.postEntries])
    }
  }

  function removeFromFeed(postID: string) {
    if(props.postEntries !== undefined){
      props.setPostEntries(props.postEntries.filter((p: Post) => { return postID !== p.id}))
    }
  }

  function CreatePostModal(){
    return(
      <React.Fragment>
        <Button onClick={()=>setIsCreatePostModalOpen(true)}>Create Post</Button>
        <CreateEditPostModal
          toggle={()=>setIsCreatePostModalOpen(!isCreatePostModalOpen)}
          isModalOpen={isCreatePostModalOpen}
          loggedInUser={props.loggedInUser}
          prependToFeed={prependToFeed}
        />
      </React.Fragment>
    )
  }

  let postListElToDisplay;
  if (props.postEntries === undefined){
    postListElToDisplay = <p>Loading...</p>;
  } else if (props.postEntries.length === 0) {
    postListElToDisplay = <p>No Entries Found</p>;
  } else {
    postListElToDisplay = props.postEntries.map((post:Post)=>
      <PostListItem post={post} key={post.id} isEditable={true} isDeletable={true} loggedInUser={props.loggedInUser} removeFromFeed={removeFromFeed}/>
    );
  }
  console.log(postListElToDisplay);

  return (
    <Col>
      <Col>
        <h3>Feed</h3>
        {postListElToDisplay}
      </Col>
      <Col>
        {props.loggedInUser ? CreatePostModal() : null}
      </Col>
    </Col>
    );
}

