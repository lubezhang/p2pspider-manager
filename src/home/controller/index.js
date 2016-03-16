'use strict';

import Base from './base.js';

export default class extends Base {
  init(http) {
      super.init(http);
      this.model = this.model("torrent_source");
    }
    /**
     * index action
     * @return {Promise} []
     */
  indexAction() {
    //auto render template file index_index.html
    return this.display();
  }


  /**
   * 文章列表
   * @return {[type]} [description]
   */
  async listAction() {
    let list = await this.model.page(this.get("page"), 10).countSelect();

    return this.success(list);
  }
}