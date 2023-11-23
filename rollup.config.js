// rollup.config.js
import typescript from '@rollup/plugin-typescript'

const packComponent = {
  input: 'src/components/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/index.js',
      format: 'esm',
    },
  ],
  external: ['@use-gesture/react', 'react', 'react-dom', 'react-use-measure'],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.pack.json',
    }),
  ],
}

const packTheme = (name) => ({
  input: `src/theme/${name}/index.tsx`,
  output: [
    {
      file: `dist/theme/${name}/index.cjs`,
      format: 'cjs',
    },
    {
      file: `dist/theme/${name}/index.js`,
      format: 'esm',
    },
  ],
  external: [
    '@use-gesture/react',
    'react',
    'react-dom',
    'react-use-measure',
    'components',
  ],
  plugins: [typescript()],
})

// eslint-disable-next-line import/no-anonymous-default-export
export default [packComponent, packTheme('left-tab')]
