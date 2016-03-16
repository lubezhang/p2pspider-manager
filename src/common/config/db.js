'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  log_sql: true,
  log_connect: true,
  adapter: {
    mysql: {
      host: '10.16.93.35',
      port: '3306',
      database: 'torrent',
      user: 'root',
      password: 'qwe123',
      prefix: '',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};