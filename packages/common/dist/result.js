"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.toResult = exports.mapResponseToResult = exports.failure = exports.success = exports.Failure = exports.Success = exports.Result = void 0;
var Result = /** @class */ (function () {
    function Result(isSuccess, error, value) {
        this.success = isSuccess;
        this.value = value;
        this.error = error;
    }
    Result.prototype.isSuccess = function () {
        return this.success;
    };
    Result.prototype.isFailure = function () {
        return !this.success;
    };
    Result.prototype.getValue = function () {
        return this.value;
    };
    Result.prototype.getError = function () {
        return this.error;
    };
    return Result;
}());
exports.Result = Result;
var Success = /** @class */ (function (_super) {
    __extends(Success, _super);
    function Success(value) {
        return _super.call(this, true, null, value) || this;
    }
    return Success;
}(Result));
exports.Success = Success;
var Failure = /** @class */ (function (_super) {
    __extends(Failure, _super);
    function Failure(error) {
        return _super.call(this, false, error) || this;
    }
    return Failure;
}(Result));
exports.Failure = Failure;
function success(value) {
    return new Success(value);
}
exports.success = success;
function failure(error) {
    return new Failure(error);
}
exports.failure = failure;
function mapResponseToResult(response) {
    if (response.status_code === 200) {
        return new Success(response.result);
    }
    else {
        return new Failure(new Error(response.error));
    }
}
exports.mapResponseToResult = mapResponseToResult;
function toResult(block) {
    return new Promise(function (resolve) {
        block().then(function (response) {
            if (response.status_code === 200) {
                resolve(new Success(response.result));
            }
            else {
                resolve(new Failure(new Error(response.error)));
            }
        });
    });
}
exports.toResult = toResult;
