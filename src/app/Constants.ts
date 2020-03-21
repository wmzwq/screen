/*----------------------------------------后台Api地址----------------------------------------*/
export const APP_SERVE_URL = 'http://122.228.89.215:8897'; 

/*----------------------------------------文件服务器地址----------------------------------------*/
export const FILE_SERVE_URL = 'https://yanxiaojun617.com/fileService/'; 

/*----------------------------------------app版本升级服务地址,查询app最新版本号,更新日志.----------------------------------------*/
export const APP_VERSION_SERVE_URL = 'https://yanxiaojun617.com/version/api/'; 

/*----------------------------------------app下载地址.----------------------------------------*/
export const APP_DOWNLOAD_PAGE_URL = 'https://yanxiaojun617.com/version/admin/#/download?name=ionic2tabs';

export const IS_DEBUG = false; // 是否开发(调试)模式

// code push 部署prod key
export const CODE_PUSH_DEPLOYMENT_KEY = {
  'android': 'i0LgJRugiIfjVYTgmXs9go45Xc7g26690215-d954-4697-a879-90e0c4612b59',
  'ios': 'SRoxClVMoed8SgwIRxeVCPWx26Fk26690215-d954-4697-a879-90e0c4612b59'
};

export const DEFAULT_AVATAR = './assets/imgs/avatar.png'; // 用户默认头像
export const PAGE_SIZE = 5; // 默认分页大小
export const IMAGE_SIZE = 1024; // 拍照/从相册选择照片压缩大小
export const QUALITY_SIZE = 94; // 图像压缩质量，范围为0 - 100
export const REQUEST_TIMEOUT = 20000; // 请求超时时间,单位为毫秒
