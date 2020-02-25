import React, {Component} from 'react';
import '../style.css';
import Navigation from './Nav';
import { Card, Icon, Tooltip, Modal, message } from 'antd';
import { connect } from 'react-redux';

const { Meta } = Card;

class ThemeArticles extends Component {

  state = {
    articlesList: [],
    visible: false,
    title: '',
    content: '',
    articleUrl: ''
  };

  showModal = (title, content, link) => {
    this.setState({
      visible: true,
      title: title,
      content: content,
      articleUrl: link
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

  onLikeClick = article => {
    this.props.articlesLiked(article);
    message.success('Article added to My articles')
  }

  componentDidMount() {

    var ctx = this;

    fetch(`/articles-by-sources/${this.props.match.params.id}`)
    .then((response) => {
      return response.json()
    })
    .then((data)=>{
        ctx.setState({articlesList: data.articles})
    })
    .catch((err)=>{
      console.log('fetch error...', err)
    })
  };

  render() {

    return (
      <div>
        <Navigation />
        <div className="banner"></div>
        <div className="cards">
          {this.state.articlesList.map((article, x) =>
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
                    <Icon type="read" key="read" onClick={() => this.showModal(article.title, article.content, article.url)}/>
                  </Tooltip>,
                  <Tooltip title="add this to my articles">
                    <Icon type="like" key="like" onClick={() => this.onLikeClick(article)} />
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
                  <a href={this.state.articleUrl} target="_blank" rel="noopener noreferrer">Lire la suite</a>
                </Modal>
              </div>
            )}
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return {
    articlesLiked: function(article) {
      dispatch({type: 'like', article: article});
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ThemeArticles);
