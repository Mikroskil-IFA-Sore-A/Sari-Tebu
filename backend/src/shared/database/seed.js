import * as AuthSessionService from "#/modules/auth_sessions/service.js";
import * as CartService from "#/modules/carts/service.js";
import * as ProductService from "#/modules/products/service.js";
import * as TransactionService from "#/modules/transactions/service.js";
import * as UserService from "#/modules/users/service.js";

AuthSessionService.login();
CartService.deleteCart();
ProductService.getProduct();
TransactionService.chjeck();
UserService.asd();
