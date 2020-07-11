import React from 'react';
import { Link } from 'react-router-dom';

const PostButton = (props) => {
  return (
    <button onClick={() => props.handleClick()}>{props.label}</button>
  );
}

const PostText = (props) => {
  return (
    <span className={props.class}>{props.text}</span>
  );
}

const Post = (props) => {
  return (
    <div className="item">
      <Link to={'/detail/' + props.id}>
        <PostText text={props.vote} class='vote' />
        <div className="info">
          <PostText text={props.title} class='name' />
          <PostText text={props.link} class='url' />
        </div>
      </Link>
      <div className="buttons">
        <PostButton label='Up Vote' handleClick={props.increment} />
        <PostButton label='Down Vote' handleClick={props.decrement} />
        <PostButton label='Remove' handleClick={props.removeItem} />
      </div>
    </div>
  );
}

const PostList = (props) => {
  return (
    <div className="items">
      {
        props.postList.map((item, index) => (
          <Post key={index}
            title={item.name}
            link={item.url}
            vote={item.vote}
            id={item.id}
            increment={() => props.updateVote(item.id, 1)}
            decrement={() => props.updateVote(item.id, -1)}
            removeItem={() => props.removeItem(item.id)}
          />
        ))
      }
    </div>
  )
}

const List = ({ list, removeItem, updateVote }) => {
  const List = list.length ? (
    <PostList postList={list}
      updateVote={updateVote.bind(this)}
      removeItem={removeItem.bind(this)} />
  ) : (
      <p className="empty">EMPTY</p>
    );
  return (
    <div className="list">
      {List}
    </div>
  );
}

export default List;