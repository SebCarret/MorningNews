import React, {Component} from 'react';
import '../style.css';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

class Navigation extends Component {

  render() {

    return (
      <Menu mode="horizontal" style={{textAlign: 'center'}} theme="dark">
        <Menu.Item key="home">
          <Link to='/home'>
            <Icon type="home" />
            Themes
          </Link>
        </Menu.Item>
        <Menu.Item key="articles">
          <Link to='/my-articles'>
            <Icon type="read" />
            My articles
          </Link>
        </Menu.Item>
        <Menu.Item key="themes">
          <Link to='/'>
            <Icon type="logout" />
            Logout
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navigation;
