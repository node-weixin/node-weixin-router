import {Generator} from 'errorable';
import common from 'errorable-common';

var errors = new Generator(common, 'zh-CN').errors;
module.exports = errors;
