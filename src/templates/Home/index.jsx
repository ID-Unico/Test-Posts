import { Component } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/loadpost'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    counter: 0,
    posts: [],
    allPosts:[],
    page: 0,
    postsPerPage: 20,
    searchValue: ''
  };

async componentDidMount() {
  await this.loadPosts();
}

loadPosts = async() => {

  const { page, postsPerPage } = this.state;
  const postsAndPhotos = await loadPosts();

  this.setState({
    posts: postsAndPhotos.slice(page,postsPerPage),
    allPosts: postsAndPhotos,
  });
}

loadMorePosts = () => {
    const {
        page,
        postsPerPage,
        allPosts,
        posts } = this.state;

        const nextpage = page + postsPerPage;

        const nextPosts = allPosts.slice(nextpage, nextpage + postsPerPage);

        posts.push(...nextPosts);

        this.setState({
          ...this.state,
          posts, 
          page: nextpage
        });
}

handleChange = (e) => {
  const { value } = e.target;
  this.setState({searchValue: value});
}

render() {

  const {posts, page, postsPerPage, allPosts, searchValue} = this.state;
  const  noMorePosts  = page + postsPerPage >= allPosts.length

  const filteredPosts = !!searchValue ? 
  posts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    : posts;

  return (
    <section className="container">

      <div className='searchcontainer'>
        {/* Avaliação de curto circuito */}
        {!!searchValue && (
          <h1>Search value: {searchValue}</h1>  
        )}
      
        <TextInput inputValue={searchValue} actionFn={this.handleChange} />
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}
      {filteredPosts.length === 0 && (
        <p>Não existem posts</p>
      )}
      <div className="buttoncontainer">
        {!searchValue && (
            <Button 
            text="Load more posts"
            onClick={this.loadMorePosts} 
            disabled={noMorePosts}
            />
        )}
        
      </div>
    </section>
  );
}
}

