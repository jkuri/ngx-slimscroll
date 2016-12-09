import rollup      from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';

export default {
  context: 'this',
  entry: 'index.js',
  dest: 'dist/ng2-slimscroll.umd.js',
  sourceMap: true,
  format: 'umd',
  moduleName: 'ng.slimscroll',
  plugins: [
    nodeResolve({jsnext: true, module: true}),
    commonjs()
  ]
}
