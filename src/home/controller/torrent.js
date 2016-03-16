'use strict';

import moment from 'moment';

import Base from './base.js';

export default class extends Base {
  init(http){
    super.init(http);
    this.model = this.model("torrent");
  }
  // __before(){
  //   console.log("__before");
  // }

  // __after(){
  //   console.log("__after");
  // }
  /**
   * index action
   * @return {Promise} []
   */
  
  async indexAction(){
    
    return this.display();
  }

  /**
   * 添加文章
   */
  async postAction(){
    let json = this.post("json");

    let articleId = await this.model.add({json: json});
    return this.success(articleId);
  }

  async detailAction(){
    let id = this.get("id");
    let article = await this.model.where({"id": id}).find();
    return this.json(article);
  }

  apiAction(){
    return this.display();
  }

}