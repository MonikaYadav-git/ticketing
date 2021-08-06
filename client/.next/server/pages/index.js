(function() {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./api/build-client.js":
/*!*****************************!*\
  !*** ./api/build-client.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


const buildClient = ({
  req
}) => {
  if (true) {
    //base url should be
    //http://servicename.namespace.svc.cluster.local
    return axios__WEBPACK_IMPORTED_MODULE_0___default().create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {}
};

/* harmony default export */ __webpack_exports__["default"] = (buildClient);

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_build_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/build-client */ "./api/build-client.js");

var _jsxFileName = "D:\\React Project\\ticketing\\client\\pages\\index.js";


const Index = ({
  currentUser
}) => {
  return currentUser ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h1", {
    children: "You are signed in."
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 26
  }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h1", {
    children: "You are not signed in."
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 56
  }, undefined);
};

Index.getInitialProps = async context => {
  const client = (0,_api_build_client__WEBPACK_IMPORTED_MODULE_1__.default)(context);
  const {
    data
  } = await client.get('/api/users/currentuser').catch(err => {
    console.log("error while fetching", err);
    return {
      data: {}
    };
  });
  return data;
};

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("axios");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9hcGkvYnVpbGQtY2xpZW50LmpzIiwid2VicGFjazovL2NsaWVudC8uL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovL2NsaWVudC9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vY2xpZW50L2V4dGVybmFsIFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIiXSwibmFtZXMiOlsiYnVpbGRDbGllbnQiLCJyZXEiLCJheGlvcyIsImJhc2VVUkwiLCJoZWFkZXJzIiwiSW5kZXgiLCJjdXJyZW50VXNlciIsImdldEluaXRpYWxQcm9wcyIsImNvbnRleHQiLCJjbGllbnQiLCJkYXRhIiwiZ2V0IiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsTUFBTUEsV0FBVyxHQUFHLENBQUM7QUFBRUM7QUFBRixDQUFELEtBQWE7QUFDN0IsWUFBbUM7QUFFL0I7QUFDQTtBQUVBLFdBQU9DLG1EQUFBLENBQWE7QUFDaEJDLGFBQU8sRUFBRSxpRUFETztBQUVoQkMsYUFBTyxFQUFFSCxHQUFHLENBQUNHO0FBRkcsS0FBYixDQUFQO0FBS0gsR0FWRCxNQVdLLEVBTUo7QUFDSixDQW5CRDs7QUFxQkEsK0RBQWVKLFdBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7O0FBRUEsTUFBTUssS0FBSyxHQUFHLENBQUM7QUFBRUM7QUFBRixDQUFELEtBQXFCO0FBRS9CLFNBQU9BLFdBQVcsZ0JBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBSCxnQkFBaUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBbkQ7QUFDSCxDQUhEOztBQUtBRCxLQUFLLENBQUNFLGVBQU4sR0FBd0IsTUFBT0MsT0FBUCxJQUFtQjtBQUV2QyxRQUFNQyxNQUFNLEdBQUdULDBEQUFXLENBQUNRLE9BQUQsQ0FBMUI7QUFFQSxRQUFNO0FBQUVFO0FBQUYsTUFBVyxNQUFNRCxNQUFNLENBQUNFLEdBQVAsQ0FBVyx3QkFBWCxFQUNsQkMsS0FEa0IsQ0FDWEMsR0FBRCxJQUFTO0FBQ1pDLFdBQU8sQ0FBQ0MsR0FBUixDQUFZLHNCQUFaLEVBQW9DRixHQUFwQztBQUNBLFdBQU87QUFBRUgsVUFBSSxFQUFFO0FBQVIsS0FBUDtBQUNILEdBSmtCLENBQXZCO0FBS0EsU0FBT0EsSUFBUDtBQUNILENBVkQ7O0FBWUEsK0RBQWVMLEtBQWYsRTs7Ozs7Ozs7Ozs7QUNuQkEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUQiLCJmaWxlIjoicGFnZXMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcblxyXG5jb25zdCBidWlsZENsaWVudCA9ICh7IHJlcSB9KSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgLy9iYXNlIHVybCBzaG91bGQgYmVcclxuICAgICAgICAvL2h0dHA6Ly9zZXJ2aWNlbmFtZS5uYW1lc3BhY2Uuc3ZjLmNsdXN0ZXIubG9jYWxcclxuXHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGJhc2VVUkw6ICdodHRwOi8vaW5ncmVzcy1uZ2lueC1jb250cm9sbGVyLmluZ3Jlc3Mtbmdpbnguc3ZjLmNsdXN0ZXIubG9jYWwnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiByZXEuaGVhZGVyc1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcblxyXG4gICAgICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xyXG4gICAgICAgICAgICBiYXNlVVJMOiAnLydcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkQ2xpZW50OyIsImltcG9ydCBidWlsZENsaWVudCBmcm9tIFwiLi4vYXBpL2J1aWxkLWNsaWVudFwiO1xyXG5cclxuY29uc3QgSW5kZXggPSAoeyBjdXJyZW50VXNlciB9KSA9PiB7XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnRVc2VyID8gPGgxPllvdSBhcmUgc2lnbmVkIGluLjwvaDE+IDogPGgxPllvdSBhcmUgbm90IHNpZ25lZCBpbi48L2gxPlxyXG59XHJcblxyXG5JbmRleC5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyAoY29udGV4dCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGNsaWVudCA9IGJ1aWxkQ2xpZW50KGNvbnRleHQpO1xyXG5cclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgY2xpZW50LmdldCgnL2FwaS91c2Vycy9jdXJyZW50dXNlcicpXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciB3aGlsZSBmZXRjaGluZ1wiLCBlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7fSB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEluZGV4OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7OyJdLCJzb3VyY2VSb290IjoiIn0=