import React, {Component} from "react";
import ReactDOM from 'react-dom'
import AppHeader from "./components/app-header";
import TodoList from "./components/todo-list";
import SearchPanel from "./components/search-panel";
import ItemStatusFilter from "./components/item-status-filter";
import ItemAddForm from "./components/item-add-form";
import "./index.css"




export default class App extends Component {

  maxId = 100;// haord avelacvox itemy sksvelua 100rd id-ic+


  state ={
    todoData : [
      this.createTodoItem("Drink Coffe"),
      this.createTodoItem("Make React App"),
      this.createTodoItem("Have a lunch") ],
      term : "",
      filter : "active" // active, all, done
  }

  
  deleteItem = (id)=> {
    this.setState(({ todoData })=> {

      const idx = todoData.findIndex((el) => el.id === id);
      
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);// ogtagorcum enq slice qani vor chi poxum himnakan array, SPLICE chenq ogtagorcum qani vor ayn himnakany poxum e
      const newArray = [...before, ...after];

      return{
        todoData : newArray
      }
    })

  }

  createTodoItem(label){
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  addItem = ( text ) => {
    //generate id
    const newItem = this.createTodoItem( text )

    //add element in arr

    this.setState(({todoData})=> {
      //todoData.push(newItem) chenq anum qani vor pushy nuynpes naxnakan arr-y poxum e 
      const newArr = [
        ...todoData,
        newItem
      ];
      return{
        todoData: newArr
      };      
    });    

  }

  toggleProperty (arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
      
      // 1 update object
      const oldItem = arr[idx];
      const newItem = {...oldItem, 
                      [propName] : !oldItem[propName]};

      // 2 construct new array
      return[
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
      
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData : this.toggleProperty(todoData, id, "important" )
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({  todoData  })=>{
        return {
          todoData : this.toggleProperty(todoData, id, "done" )
        }

    })

  }

  onSearchChange = (term) => {
    this.setState({ term })
  };

  onFilterChange = (filter) => {
    this.setState({ filter })
  };



  search(items, term) {
    if (term.length === 0){
      return items;
    }
    return items.filter((item) => {
      return item.label
          .toLowerCase()
          .indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch(filter){
      case "all" :
        return items;
      case "active" :
        return items.filter((item) => !item.done);
      case "done" :
        return items.filter((item) => item.done);  
      default  :
        return items
    }

  }



  render(){

    const {todoData, term, filter} = this.state;

    const visibleItems = this.filter(
                  this.search(todoData, term), filter)
    
    const doneCount = todoData.filter((el) => el.done).length;
    
    const todoCount = todoData.length - doneCount;


    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel 
           onSearchChange= {this.onSearchChange} />
          <ItemStatusFilter filter={filter} 
          onFilterChange= {this.onFilterChange}/>
        </div>
        
        <TodoList 
           todos = { visibleItems }
           onDeleted={this.deleteItem}
           onToggleImportant = {this.onToggleImportant}
           onToggleDone= {this.onToggleDone} />
        <ItemAddForm onItemAdded = { this.addItem }/>
      </div>
    )
  }

}


ReactDOM.render(<App/> , document.getElementById("root"))