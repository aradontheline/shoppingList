import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';

declare const Parse : any;

@Injectable()
export class ParseService {


  ShoppingList;
  ShoppingListItem;

  constructor() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
    this.ShoppingList = new Parse.Object.extend('ShoppingList');
    this.ShoppingListItem = new Parse.Object.extend('ShoppingListItem');
   }

  signUp(newUser){
    return new Promise((resolve,reject)=>{
      let user = new Parse.User();
      user.set('username',newUser.email);
      user.set('email',newUser.email);
      user.set('password',newUser.pass);
      user.set('phone',newUser.phone);

      user.signUp(null).then(user=>{
        resolve(user);
      });
    });    
  }

  login(user){
    return new Promise((resolve,reject)=>{
      Parse.User.logIn(user.email,user.pass)
      .then((user)=>{
          resolve(user)
      });
    })
  }

  logout(){
    return Parse.User.logOut();
  }

  currentUser(){
    return Parse.User.current();
  }

  resetPass(email){
    return new Promise ((resolve,reject)=>{
      Parse.User.requestPasswordReset(email)
      .then(()=>{
          resolve();
      })
      .catch(error=>{
        reject(error);
      })
    })
  }



  createShoppingList(name){
    return new Promise((resolve,reject)=>{
      let user = Parse.User.current();
      let shoppingList = new this.ShoppingList;

      shoppingList.set('name',name);
      shoppingList.set('owner',user);
      shoppingList.set('members',[user])
      shoppingList.save().then((list)=>{
        console.log('list name ' , list.get('name'))
        resolve(list);
      })
    })
  }

  fetchShoppingLists(){
    return new Promise((resolve,reject)=>{
      let user = Parse.User.current();
      let query = new Parse.Query(this.ShoppingList);
      query.equalTo('members',user);
      query.find().then(results=>{
        resolve(results);
      })
    })
  }

  fetchShoppingListDetails(id){
    return new Promise((resolve,reject)=>{
      let query = new Parse.Query(this.ShoppingList);
      query.include('members');
      query.include('shoppingItems');
      query.get(id).then(list=>{
        //console.log('list of members: ',list.get('members')[1].get('username'))
        resolve(list);
      })
    })
  }

  findUser(email){
    return new Promise((resolve,reject)=>{
      let query = new Parse.Query(Parse.User);
      query.equalTo('email',email);
      query.find().then(users=>{
        resolve(users);
      })
    })
  }

  addMemberToShoppingList(memberId,shoppingListId){
    console.log('memberId: ',memberId,' shoppingListId: ',shoppingListId);
    return new Promise((resolve,reject)=>{
      let queryUsers = new Parse.Query(Parse.User);
      let queryShoppingLists = new Parse.Query(this.ShoppingList);

      queryShoppingLists.get(shoppingListId).then(shoppingList=>{
        console.log('Shopping list: ',shoppingList.get('name'));
        queryUsers.get(memberId).then(user=>{
          console.log('Shopping list :',shoppingList.get('name'),' user: ', user.get('username'));
          shoppingList.addUnique('members',user);
          shoppingList.save().then(result=>{
            console.log('done adding members');
            resolve(result);
          })
        })
      })
    })
  }

  addShoppingItem(item,listId){
    //console.log(item,listId);
    return new Promise((resolve,reject)=>{
      let queryShoppingLists = new Parse.Query(this.ShoppingList);
      let shoppingListItem = new this.ShoppingListItem;
      shoppingListItem.set('title',item);
      shoppingListItem.set('done',false);
      shoppingListItem.save().then(item=>{
        queryShoppingLists.get(listId).then(list=>{
          console.log('list id : ', list.id);
          list.add('shoppingItems',item);
          list.save().then(list=>{
            console.log(list.get('shoppingItems'));
            resolve();
          })
        })
      })

    })
  }

  updateShoppingItemState(shoppingItemId,shoppingItemDoneState,shoppingItemPrice){
    //console.log(shoppingItemId,shoppingItemDoneState,shoppingItemPrice);
    return new Promise((resolve,reject)=>{
      let user = Parse.User.current();
      let queryShoppingListItems = new Parse.Query(this.ShoppingListItem);
      queryShoppingListItems.get(shoppingItemId).then(item=>{
        item.set('done',shoppingItemDoneState);
        item.set('price',shoppingItemPrice);
        item.set('doneBy',user);
        item.save().then(()=>{
          resolve();
        })
      })
    })
  }

  deleteShoppingItem(shoppingItemId){
    //console.log(shoppingItemId)
    return new Promise((resolve,reject)=>{
      let queryShoppingListItems = new Parse.Query(this.ShoppingListItem);
      queryShoppingListItems.get(shoppingItemId).then(item=>{
        item.destroy().then(()=>{
          resolve();
        })
      })
    })
  }



  saveFile(file){
    return new Promise((res,rej)=>{
      let parseFile = new Parse.File(file.name,file);
      parseFile.save().then(()=>{
        console.log('File uploaded');
        let user = Parse.User.current();
        user.set('pic',parseFile);
        user.save().then((user)=>{
          console.log('file associated with user: ', user.get('username'));
          let imgSource = user.get('pic').url();
          res(imgSource);
        })
      })
    })
  }


}
