import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  CardImg,
  Card,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { UserLogin } from "../types/UserLogin";
import * as Icons from '../assets/Icons';

interface Props {
  loggedInUser: UserLogin | undefined;
  setLoggedInUser: React.Dispatch<React.SetStateAction<UserLogin | undefined>>;
}

/**
 * Originally from 
 * https://github.com/ChrisChrisLoLo/CoursePlusPlus/blob/master/frontend/src/components/NavbarComp.js
 * by ChrisChrisLoLo
 * 
 * App Navbar renders the navbar at the top of the page
 * Buttons to pages accessible to a registered author are displayed if logged in
 * Otherwise, only a log in button is displayed
 * @param props
 */
export default function AppNavBar(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const logOut = () => {
    props.setLoggedInUser(undefined);
  }

  // display pages accessible to a logged in author
  function loggedIn() {
    return (
      <>
        <NavItem onClick={close}>
          <NavLink to="/" className="nav-link">
            {Icons.homeIcon} Feed
          </NavLink>
        </NavItem>
        <NavItem onClick={close}>
          <NavLink to="/inbox" className="nav-link">
            {Icons.inboxIcon} Inbox
          </NavLink>
        </NavItem>
        <NavItem onClick={close}>
          <NavLink
            to={{
              pathname: `/author/${props.loggedInUser?.authorId}`,
              state: {
                host: props.loggedInUser?.host,
                id: props.loggedInUser?.authorId
              }
            }}
            className="nav-link"
          >
            {Icons.profileIcon} Profile
          </NavLink>
        </NavItem>
        <NavItem onClick={close}>
          <NavLink to="/settings" className="nav-link">
          {Icons.settingsIcon} Settings
          </NavLink>
        </NavItem>
        <NavItem onClick={close}>
          <NavLink to="/login" className="nav-link" onClick={() => logOut()}>
          {Icons.logoutIcon} Log Out
          </NavLink>
        </NavItem>
      </>
    );
  }

  return (
    <div>
      {props.loggedInUser ?
      
      <Navbar light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav vertical className="ml-auto" navbar>
          <NavLink to="/" className="navbar-brand font-title text-center">
                {Icons.tamagoEgg("45", "45")}
              </NavLink>
            {loggedIn()}
          </Nav>
        </Collapse>
      </Navbar>
      :
      <NavLink style={{padding: '4rem'}} to="/" className="navbar-brand font-title text-center">
        {Icons.tamagoEgg("150", "150")}
      </NavLink>
      }
    </div>
  );
}