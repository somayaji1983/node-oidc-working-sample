const low = require('lowdb');
const Memory = require('lowdb/adapters/Memory');

const db = low(new Memory());

const assert = require('assert');

db.defaults({
  users: [
    {
      id: '23121d3c-84df-44ac-b458-3d63a9a05497',
      email: 'foo@example.com',
      email_verified: true,
      identifier: process.env.USER1_PASS ? process.env.USER1_PASS : 'foo@123',
    },
    {
      id: 'c2ac2b4a-2262-4e2f-847a-a40dd3c4dcd5',
      email: 'bar@example.com',
      email_verified: false,
      identifier: process.env.USER2_PASS ? process.env.USER2_PASS : 'foo@123',
    },
  ],
}).write();

class Account {
  // This interface is required by oidc-provider
  static async findAccount(ctx, id, token) {
    // This would ideally be just a check whether the account is still in your storage
    const account = db.get('users').find({ id }).value();
    if (!account) {
      return undefined;
    }

    return {
      accountId: id,
      // and this claims() method would actually query to retrieve the account claims
      async claims(use,scope,claims,rejected) {
        return {
          sub: id,
          email: account.email,
          email_verified: account.email_verified
        };
      },
    };
  }

  // This can be anything you need to authenticate a user
  static async authenticate(email, password) {
    try {
      assert(password, 'password must be provided');
      assert(email, 'email must be provided');
      const lowercased = String(email).toLowerCase();
      const account = db.get('users').find({ email: lowercased }).value();
      assert(account, 'invalid credentials provided');

      if(account.identifier!=password){
        return undefined;
      }

      console.log('account ',account);
      console.log('password received', password);
      return account.id;
    } catch (err) {
      return undefined;
    }
  }
}

module.exports = Account;
