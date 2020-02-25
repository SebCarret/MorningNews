import React, {Component} from 'react';
import '../style.css';
import Nav from './Nav';
import { Card, Icon, Tooltip, Modal } from 'antd';
import { connect } from 'react-redux';

const { Meta } = Card;

class MyArticles extends Component {

  state = {
    visible: false,
    title: '',
    content: '',
    url: ''
  };

  showModal = (title, content, link) => {
    this.setState({
      visible: true,
      title: title,
      content: content,
      url: link
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {

    return (
      <div>
        <Nav />
        <div className="banner"></div>
        <div className="cards">
          {this.props.myArticles.length === 0
            ? <h2 style={{marginTop: '15px'}}>No articles added yet to my articles...</h2>
            : this.props.myArticles.map((article, x) =>
            <div key={x} style={{display: 'flex', justifyContent: 'center'}}>
              <Card
                style={{ width: 300, margin: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                cover={
                  <img
                    alt="example"
                    src={article.urlToImage}
                  />
                }
                actions={[
                  <Tooltip title="read the full article">
                    <Icon type="read" key="read" onClick={() => this.showModal(article.title, article.content, article.url)} />
                  </Tooltip>,
                  <Tooltip title="delete this from my articles">
                    <Icon type="delete" key="dislike" onClick={() => this.props.articlesDisliked(x)} />
                  </Tooltip>
                ]}
                >
                  <Meta
                    title={article.title}
                    description={article.description}
                  />
                </Card>
                <Modal
                  title={this.state.title}
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <p>{this.state.content}</p>
                  <a href={this.state.url} target="_blank" rel="noopener noreferrer">Lire la suite</a>
                </Modal>
              </div>
            )}
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {myArticles: state.myArticles}
};

function mapDispatchToProps(dispatch) {
  return {
    articlesDisliked: function(position) {
      dispatch({type: 'dislike', position: position})
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyArticles);
