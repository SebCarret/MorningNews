import React, {Component} from 'react';
import '../style.css';
import Navigation from './Nav';
import { Link } from 'react-router-dom';
import { List, Avatar } from 'antd';
import { connect } from 'react-redux';

class Homepage extends Component {

  state = {
    themeList: []
  };

  onFrClick = () => {

    var ctx = this;

    fetch('/sources-fr')
    .then((response) => {
      return response.json()
    })
    .then((data)=>{
      ctx.setState({themeList: data.sources})
    })
    .catch((err)=>{
      console.log('fetch error...', err)
    })
  };

  onEnClick = () => {

    var ctx = this;

    fetch('/sources-en')
    .then((response) => {
      return response.json()
    })
    .then((data)=>{
      ctx.setState({themeList: data.sources})
    })
    .catch((err)=>{
      console.log('fetch error...', err)
    })
  };

  componentDidMount() {

    var ctx = this;

    fetch('/sources-fr')
    .then((response) => {
      return response.json()
    })
    .then((data)=>{
      ctx.setState({themeList: data.sources})
    })
    .catch((err)=>{
      console.log('fetch error...', err)
    })
  };

  render() {

    return (

      <div>
        <Navigation />
        <div className="banner">
          <img className="langage" src="/france.png" onClick={this.onFrClick} alt=""/>
          <img className="langage" src="/uk.png" onClick={this.onEnClick} alt=""/>
        </div>
        <List
          style={{padding: '25px'}}
          itemLayout="horizontal"
          dataSource={this.state.themeList}
          renderItem={source => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`/${source.category}.png`} />}
                title={<Link to={`/themes/${source.id}`}>{source.name}</Link>}
                description={source.description}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {user: state.User}
}

export default connect(
  mapStateToProps,
  null
)(Homepage);
