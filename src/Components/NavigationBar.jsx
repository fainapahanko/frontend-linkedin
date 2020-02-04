import React from 'react';
import {Nav, Collapse, NavbarToggler, NavItem,InputGroupAddon, Input, NavLink,InputGroupText, Navbar, NavbarBrand, InputGroup, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {Link} from 'react-router-dom'
import Api from "../API"
import { faBriefcase, faSearch, faHome, faUsers, faComments, faBell, faTh } from '@fortawesome/free-solid-svg-icons'
import '../main.css'
import ProfilesDropDown from './ProfilesDropDown';
import { connect } from 'react-redux';

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
   loggout: () => dispatch({
      type: "REMOVE_CURRENT_USER"
   })
})

class NavigationBar extends React.Component {
   state = {
      dropdownOpen: false,
      setDropdownOpen: false,
      srch: '',
      isOpen: false
   }

   handleCollapse = () => {
      this.setState({
         isOpen: !this.state.isOpen
      })
   }

   toggleDropdown = () => {
      if(this.state.setDropdownOpen === false){
         this.setState({
            setDropdownOpen: true,
            dropdownOpen: true,
         })
      }else if(this.state.setDropdownOpen === true){
         this.setState({
            setDropdownOpen: false,
            dropdownOpen: false,
         })
      }
   }

   handleSearch = async(ev) => {
      let usersData = await Api.fetch(`/profile?name=${ev.target.value}`,'GET')
      this.setState({
         srch: usersData
      })
   }
    render() {
      return (
         <Navbar className="nav-top" expand="lg">
            <Nav style={{margin: "0 auto"}}> 
               <NavbarBrand href="/">
                  <FontAwesomeIcon className="linkedin-icon" onClick={this.props.loggout} icon={faLinkedin}/>
               </NavbarBrand>
               <NavItem>
                  <div className="search-div">
                     <InputGroup className="search-input">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                           <DropdownToggle
                           tag="span"
                           data-toggle="dropdown"
                           aria-expanded={this.dropdownOpen}
                           >
                              <InputGroupAddon  addonType="prepend">
                                 <InputGroupText>                    
                                    <FontAwesomeIcon className="icon-search" icon={faSearch}/>
                                    <Input onChange={this.handleSearch} className="main-input" id="main-search-unput" placeholder="Search" />
                                 </InputGroupText>
                              </InputGroupAddon>
                           </DropdownToggle>
                           <DropdownMenu>
                              <ProfilesDropDown searchQuery={this.state.srch} toggleProfileDropdown={this.toggleDropdown}/>
                           </DropdownMenu>
                        </Dropdown>
                     </InputGroup>
                  </div>
               </NavItem>
               <NavbarToggler onClick={this.handleCollapse} />
               <Collapse isOpen={this.state.isOpen} navbar>
               <NavItem>
                  <div className="nav-item-div">
                     <FontAwesomeIcon className="nav-icon" icon={faHome}/>
                     <NavLink>Home</NavLink>
                  </div>
               </NavItem>
               <NavItem>
                  <div className="nav-item-div">
                  <Link to="/Newsfeed" style={{ textDecoration: 'none',color: 'white'}}>  
                     <FontAwesomeIcon className="nav-icon" icon={faUsers}/>
                     <NavLink>My Network</NavLink>
                     </Link>
                  </div>
               </NavItem>
               <NavItem>
                  <div className="nav-item-div">
                     <FontAwesomeIcon className="nav-icon" icon={faBriefcase}/>
                     <NavLink>Jobs</NavLink>
                  </div>
               </NavItem>
               <NavItem>
                  <div className="nav-item-div">
                     <Link to="/Newsfeed" style={{ textDecoration: 'none',color: 'white'}}>  
                     <FontAwesomeIcon className="nav-icon" icon={faComments}/>
                     <NavLink>Messaging</NavLink>
                     </Link>
                  </div>
               </NavItem>
               <NavItem>
                  <div className="nav-item-div">
                     <FontAwesomeIcon className="nav-icon" icon={faBell}/>
                     <NavLink>Notifications</NavLink>
                  </div>
               </NavItem>
               <NavItem>
                  <div className="nav-item-div">
                     <Link to="/Profile" style={{ textDecoration: 'none', color: 'white'}} >
                     <div className="profile-image-div">
                        {this.props.currentUser.image ? <img src={this.props.currentUser.image} className="nav-profile-pic" alt="profile-img"/> :                         <img src="https://www.legalniewsieci.pl/!data/newsy/news_1982.jpg" className="nav-profile-pic" alt="profile-img"/>}
                     </div>
                     <NavLink>Me</NavLink>
                     </Link>
                  </div>
               </NavItem>
               <div className="vl d-lg-inline-block d-none"></div>
               <NavItem>
                  <div className="nav-item-div">
                     <FontAwesomeIcon className="nav-icon" icon={faTh}/>
                     <NavLink>Work</NavLink>
                  </div>
               </NavItem>
               <NavItem>
                  <div className="nav-item-div">
                     <FontAwesomeIcon className="nav-icon" icon={faHome}/>
                     <NavLink>Learning</NavLink>
                  </div>
               </NavItem>
               </Collapse>
            </Nav>
         </Navbar>
      ); 
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);