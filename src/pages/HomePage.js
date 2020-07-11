import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DataManager from '../components/DataManager';
import Filter from '../components/Filter';
import List from '../components/List';
import Pagination from '../components/Pagination';


class HomePage extends Component {
  state = {
    list: JSON.parse(DataManager.get("appStorage")) || [],
    currentPage: 1,
    postsPerPage: 5,
    sortState: "most"
  };


  updateVote = (id, val) => {
    let items = this.state.list.map((item, index) => {
      if (item.id === id) {
        item.vote += val;
        item.time = new Date();
      }
      return item;
    });
    items = this.sort(items);
    this.setState({ list: items });
    DataManager.set("appStorage", JSON.stringify(items));
  }

  removeItem = (id) => {
    let item = this.state.list.filter(x => { return x.id === id; });
    let removeSet = window.confirm("Do you want to remove: " + item[0].name);
    if (removeSet) {
      let items = this.state.list.filter(x => {
        return x.id !== id;
      });

      this.setState({ list: items });
      DataManager.set("appStorage", JSON.stringify(items));
    }
  }

  sort = (items) => {
    let value = this.state.sortState;
    if (value === "most") {
      items = this.state.list.sort((a, b) => {
        return b.vote - a.vote;
      })
    } else {
      items = this.state.list.sort((a, b) => {
        return b.vote - a.vote;
      }).reverse()
    }
    return items;
  }

  filter = (event) => {
    var value = event.target.value;
    let items = "";
    if (value === "most") {
      items = this.state.list.sort((a, b) => {
        return b.vote - a.vote;
      })
    } else {
      items = this.state.list.sort((a, b) => {
        return b.vote - a.vote;
      }).reverse()
    }

    this.setState({ list: items, sortState: value });
    DataManager.set("appStorage", JSON.stringify(items));
  }


  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.list.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => this.setState({ currentPage: pageNumber });

    return (
      <div className="container">
        <div className="submit-link">
          <Link to={'/create'}>SUBMIT A LINK</Link>
        </div>
        <Filter filter={this.filter} />
        <List list={currentPosts}
          removeItem={this.removeItem}
          updateVote={this.updateVote} />
        <Pagination currentPage={this.state.currentPage} postsPerPage={this.state.postsPerPage}
          TotalPosts={this.state.list.length}
          paginate={paginate} />
      </div>
    );
  }
}

export default HomePage;
