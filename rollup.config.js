// rollup.config.js
import typescript from '@rollup/plugin-typescript'

const config = {
  input: 'src/components/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    }
  ],
  external: ['@use-gesture/react', 'react', 'react-dom', 'react-use-measure'],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.pack.json'
    })
  ]
}

export default config