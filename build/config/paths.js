/**
 * Paths
 *
 * Project related paths.
 */

const path = require("path");
const fs = require("fs");

// Make sure any symlinks in the project folder are resolved:
const buildDir = fs.realpathSync(process.cwd());
const pluginDir = getpluginDir();
const resolveBuild = relativePath => path.resolve(buildDir, relativePath);
const resolvePlugin = relativePath => path.resolve(pluginDir, relativePath);

// Config after eject: we're in ./config/
module.exports = {
	dotenv: resolveBuild(".env"),
	pluginSrc: resolvePlugin("features/src"), // Plugin src folder path.
	pluginBlocksJs: resolvePlugin("features/src/blocks.js"),
	frontendJs: resolvePlugin("features/src/frontend.js"),
	yarnLockFile: resolveBuild("yarn.lock"),
	pluginDist: resolvePlugin(".") // We are in ./dist folder already so the path '.' resolves to ./dist/.
};

function getpluginDir() {
	let arr = process.cwd().split("\\");
	arr.splice(-1);
	return arr.join("\\");
}
