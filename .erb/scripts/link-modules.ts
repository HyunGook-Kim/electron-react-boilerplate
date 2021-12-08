import fs from 'fs';
import path from 'path';
import webpackPaths from '../configs/webpack.paths';

const srcNodeModulesPath = webpackPaths.srcNodeModulesPath;
const appNodeModulesPath = webpackPaths.appNodeModulesPath;

fs.readdirSync(appNodeModulesPath).forEach(nativeModuleDependency => {
  const srcCheckPath = path.join(srcNodeModulesPath, nativeModuleDependency)
  const appCheckPath = path.join(appNodeModulesPath, nativeModuleDependency)

  if (checkModuleValid(srcCheckPath, appCheckPath)) {
    fs.symlinkSync(appCheckPath, srcCheckPath, 'junction')
  }
});

function checkModuleValid(srcCheckPath: any, appCheckPath: any) {
  return !fs.existsSync(srcCheckPath) && fs.existsSync(appCheckPath) && isDirectory(appCheckPath)
}

function isDirectory(path:string) {
  return fs.statSync(path).isDirectory()
}
