function getUploadFileExt(name) {
  let ext = name.split('.');
  return [ext.slice(0, -1).join(''),ext[ext.length - 1]];
}

module.exports = getUploadFileExt;