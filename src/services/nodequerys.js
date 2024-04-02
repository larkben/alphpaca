"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageUri = exports.getAssets = void 0;
var config = require('../../config.json');
var _a = require('@alephium/web3'), NodeProvider = _a.NodeProvider, hexToString = _a.hexToString, binToHex = _a.binToHex, contractIdFromAddress = _a.contractIdFromAddress, fetchContractState = _a.fetchContractState, addressFromContractId = _a.addressFromContractId;
// Node , NodeAPI , DjangoServer
// Now you can use config properties
//console.log(config.Node);                 // test command
// https://ipfs.filebase.io/ipfs/QmX6hKNuK9eua8e91Nu2jbzKBM9ucczKp2p5DizphXGiKk/16
// https://ipfs.filebase.io/ipfs/QmPeqHaNjsm3U9Uk1qnEgH9iCFWMoGx1o6UsJr8p8h4wHx/16.svg
var nodeProvider = new NodeProvider("".concat(config.Node), "".concat(config.NodeAPI));
function getAssets(walletAddy) {
    return __awaiter(this, void 0, void 0, function () {
        var walletAssets;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, nodeProvider.addresses.getAddressesAddressBalance(walletAddy)];
                case 1:
                    walletAssets = _a.sent();
                    console.log(walletAssets);
                    return [2 /*return*/, walletAssets];
            }
        });
    });
}
exports.getAssets = getAssets;
function getImageUri(tokenId) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenIdAddress, url, apiKey, response, data, websiteLink, websiteResponse, websiteData, imageUrl, imageName, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tokenIdAddress = addressFromContractId(tokenId);
                    url = "".concat(config.Node, "contracts/").concat(tokenIdAddress, "/state?group=0");
                    apiKey = config.NodeAPI;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch(url, {
                            method: 'GET',
                            headers: {
                                'accept': 'application/json',
                                'X-API-KEY': apiKey
                            }
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    websiteLink = hexToString(data.immFields[0].value);
                    return [4 /*yield*/, fetch(websiteLink)];
                case 4:
                    websiteResponse = _a.sent();
                    if (!websiteResponse.ok) {
                        throw new Error("HTTP error! status: ".concat(websiteResponse.status));
                    }
                    return [4 /*yield*/, websiteResponse.json()];
                case 5:
                    websiteData = _a.sent();
                    imageUrl = websiteData.image;
                    imageName = websiteData.name;
                    return [2 /*return*/, { imageUrl: imageUrl, imageName: imageName }];
                case 6:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    return [2 /*return*/, { imageUrl: "", imageName: "" }]; // Return default values or handle the error case as needed
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getImageUri = getImageUri;
//console.log(addressFromContractId("3426a33ad6041001fe365f41b17b0d50c2417ab54919ea200a5cff24dd7a9300"))
//console.log(hexToString("68747470733a2f2f697066732e66696c65626173652e696f2f697066732f516d5836684b4e754b39657561386539314e75326a627a4b424d397563637a4b7032703544697a70685847694b6b2f3136"))
console.log(getAssets("148n4B7H7CB8wUJHpSoj95ctMcENYjBM5ysbHoTq2Kf9t"));
var value = getImageUri("3426a33ad6041001fe365f41b17b0d50c2417ab54919ea200a5cff24dd7a9300");
console.log(value);
